'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSave, faCancel } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { UserData } from '@/app/data/models';
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function UserManager() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newRow, setNewRow] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    loanCount: '',
    loanAmount: '',
    role: '',
  });

  // Listen to Firestore updates
  useEffect(() => {
    const q = query(collection(db, 'users'),
    orderBy('name', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
      setUsers(userList);
    });
    return () => unsub();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddRow = () => {
    setNewRow(true);
    setForm({
      name: '',
      email: '',
      loanCount: '',
      loanAmount: '',
      role: '',
    });
  };

  const handleAddUser = async () => {

    const password = 'defaultPassword123';
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email,
      password
    );

    const userId = userCredential.user.uid;

    await setDoc(doc(db, 'users', userId), {
      id: userId,
      name: form.name,
      email: form.email,
      loanCount: Number(form.loanCount),
      loanAmount: Number(form.loanAmount),
      role: form.role || 'user',
      createdAt: Timestamp.now(),
    });

    setForm({ name: '', email: '', loanCount: '', loanAmount: '', role: '' });
    setNewRow(false);
  };

  const handleEditClick = (user: UserData) => {
    setEditingUserId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      loanCount: String(user.loanCount),
      loanAmount: String(user.loanAmount),
      role: user.role || '',
    });
  };

  const handleSaveEdit = async (id: string) => {
    const ref = doc(db, 'users', id);
    await updateDoc(ref, {
      name: form.name,
      email: form.email,
      loanCount: Number(form.loanCount),
      loanAmount: Number(form.loanAmount),
      role: form.role,
    });
    setEditingUserId(null);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setNewRow(false);
  };

  return (
    <div className="p-4">
       <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-black text-2xl font-bold mb-6">User Manager</h1>

      <button
        onClick={handleAddRow}
        className={`mb-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:bg-gray-400`}
        disabled={true || newRow || editingUserId !== null}
      >
      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" /> Add User
      </button>

      <table className="w-full text-center bg-white border border-gray-200 rounded-lg shadow text-sm md:text-base">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Loan Count</th>
            <th className="px-4 py-2">Loan Amount</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {newRow && (
            <tr className="bg-yellow-50">
              {['name', 'email', 'loanCount', 'loanAmount', 'role'].map((field) => (
                <td key={field} className="px-2 py-1 border">
                  <input
                    name={field}
                    value={form[field as keyof typeof form]}
                    onChange={handleChange}
                    className="text-black border p-1 w-full rounded"
                    type={field.includes('loan') ? 'number' : 'text'}
                  />
                </td>
              ))}
              <td className="px-2 py-1 border">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={handleAddUser}
                    className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-teal-800 text-white px-2 py-1 rounded text-sm hover:bg-teal-600"
                  >
                    <FontAwesomeIcon icon={faCancel} className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          )}

          {users.map((user, index) => (
            <tr
              key={index}
               className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  } text-black`}
            >
              {editingUserId === user.id ? (
                <>
                  {['name', 'email', 'loanCount', 'loanAmount', 'role'].map((field) => (
                    <td key={field} className="px-2 py-1 border">
                      <input
                        name={field}
                        value={form[field as keyof typeof form]}
                        onChange={handleChange}
                        className="border p-1 w-full rounded"
                        type={field.includes('loan') ? 'number' : 'text'}
                      />
                    </td>
                  ))}
                  <td className="px-2 py-1 border">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleSaveEdit(user.id)}
                        className="bg-blue-600 text-white px-2 py-1 rounded text-sm hover:bg-blue-700"
                      >
                        <FontAwesomeIcon icon={faSave} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-teal-800 text-white px-2 py-1 rounded text-sm hover:bg-teal-600"
                      >
                        <FontAwesomeIcon icon={faCancel} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-4 py-2 border-t">{user.name}</td>
                  <td className="px-4 py-2 border-t">{user.email}</td>
                  <td className="px-4 py-2 border-t">{user.loanCount}</td>
                  <td className="px-4 py-2 border-t">{user.loanAmount.toLocaleString()}</td>
                  <td className="px-4 py-2 border-t">{user.role}</td>
                  <td className="px-4 py-2 border-t">
                    <button
                      onClick={() => handleEditClick(user)}
                      className={`bg-green-600 text-white px-6 py-1 rounded hover:bg-green-700 disabled:bg-gray-400`}
                      disabled={newRow || editingUserId !== null}
                    >
                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
