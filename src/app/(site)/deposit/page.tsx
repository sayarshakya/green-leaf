'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { format, addMonths, subMonths, isBefore, isAfter, isSameMonth } from 'date-fns';
import { db } from '@/lib/firebase';
import type { Deposit } from '@/app/data/models';
import StatusLabel from '@/app/components/StatusLabel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
//import { useUser } from '@/app/components/UserContext';

const MIN_DATE = new Date(2025, 5); // June 2025 (month is 0-indexed)
const TODAY = new Date(); 

interface Row {
  userId: string;
  status: string;
  name: string;
  month: string;
  updatedAt: Date;
}

export default function Deposit() {
  const [currentMonth, setCurrentMonth] = useState(TODAY);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Row[]>([]);
  //const { userData } = useUser(); // user.role could be 'admin' or 'user'

  const fetchData = async () => {
    setLoading(true);
    try {
      const monthId = format(currentMonth, "yyyy-MM");
      const docRef = doc(db, "deposits", monthId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setData([]);
        setLoading(false);
        return;
      }

      const docData = docSnap.data();
      const rows: Row[] = [];

      for (const [userId, value] of Object.entries(docData)) {
        const [status, , rawTimestamp] = value as [string, string, Timestamp | Date];

        const updatedAt = rawTimestamp instanceof Timestamp
        ? rawTimestamp.toDate()
        : rawTimestamp;
      
        const userDoc = await getDoc(doc(db, "users", userId));
        const name = userDoc.exists() ? userDoc.data()?.name || "Unknown" : "Unknown";

        rows.push({
          userId,
          name,
          status,
          month: monthId,
          updatedAt,
        });
      }

      rows.sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
      setData(rows);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchData();
    }, [currentMonth]);

 const handlePrev = () => {
    const prev = subMonths(currentMonth, 1);
    if (!isBefore(prev, MIN_DATE)) {
      setCurrentMonth(prev);
    }
  };

  const handleNext = () => {
    const next = addMonths(currentMonth, 1);
    if (!isAfter(next, TODAY)) {
      setCurrentMonth(next);
    }
  };

  const isPrevDisabled = isBefore(subMonths(currentMonth, 1), MIN_DATE);
  const isNextDisabled = isSameMonth(currentMonth, TODAY) || isAfter(currentMonth, TODAY);

  const handleToggle = async (userId: string, currentStatus: string) => {
  if (currentStatus === "Done") return;

  setLoading(true);
    try {
      const monthId = format(currentMonth, "yyyy-MM");
      const docRef = doc(db, "deposits", monthId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        console.error("No matching month document found.");
        return;
      }

      const docData = docSnap.data();

      const existing = docData[userId];
      if (!existing || !Array.isArray(existing)) {
        console.error("No data found for userId:", userId);
        return;
      }

      const newStatus = currentStatus === "Pending" ? "Done" : "Pending";
      const updatedArray = [newStatus, monthId, new Date()];

      await updateDoc(docRef, {
        [userId]: updatedArray
      });

      await fetchData(); // refresh UI
    } catch (error) {
      console.error("Error updating deposit status:", error);
    } finally {
      setLoading(false);
    }
  };


  // const getAllUserIds = async (): Promise<string[]> => {
  //   const usersRef = collection(db, "users");
  //   const snapshot = await getDocs(usersRef);

  //   const userIds: string[] = [];
  //   snapshot.forEach(doc => {
  //     userIds.push(doc.id); 
  //   });

  //   return userIds;
  // };
  
//   const insertDepositsForMonth = async (monthId: string) => {
//   const userIds = await getAllUserIds(); // fetch all user document IDs

//   const docRef = doc(db, "deposits", monthId); // one document per month
//   const existingDoc = await getDoc(docRef);
//   const existingData = existingDoc.exists() ? existingDoc.data() : {};

//   const newData: { [key: string]: any } = { ...existingData };

//   for (const userId of userIds) {
//     newData[userId] = ["Pending", monthId, new Date()];
//   }

//   await setDoc(docRef, newData);
// };

//  const handleClick = () => {
//     const now = new Date();
//     const monthId = format(now, "yyyy-MM");
//     insertDepositsForMonth(monthId);
//   };


  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Deposit</h1>
           {/* {userData?.role === "ADMIN" && (
            <button
              disabled={loading}
              onClick={handleClick}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Inserting..." : "Insert Current Month Deposits"}
            </button>
          )} */}
        </div>
        <div className="relative w-full overflow-x-auto">
            <div className="flex items-center justify-between text-black mb-2">
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                onClick={handlePrev}
                disabled={isPrevDisabled}
              >
                <FontAwesomeIcon icon={faSquareCaretLeft} className="w-4 h-4" />
              </button>
              <span className="font-semibold text-center flex-1">
                {format(currentMonth, 'MMMM yyyy')}
              </span>
              <button
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
                onClick={handleNext}
                disabled={isNextDisabled}
              >
                <FontAwesomeIcon icon={faSquareCaretRight} className="w-4 h-4" />
              </button>
          </div>
          <table className="w-full text-center bg-white border border-gray-200 rounded-lg shadow text-sm md:text-base">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Deposit Status</th>
                 <th className="px-4 py-3">Updated At</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : data.length > 0 ? (
                data.map(({userId, name, status, updatedAt}, index) => (
                  <tr key={index} className="text-black border-t">
                    <td className="px-4 py-2">{name}</td>
                    <td className="px-4 py-2 capitalize"> 
                     <StatusLabel status={status}/>
                    </td>
                    <td className="px-4 py-2">
                      {updatedAt ? (
                        format(
                          updatedAt instanceof Timestamp
                            ? updatedAt.toDate()
                            : updatedAt, // already a Date
                          'yyyy/MM/dd'
                        )
                      ) : (
                        ''
                      )}
                    </td>
                   <td className="px-4 py-2">
                    <label className="relative inline-block w-11 h-6">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={status === "Done"}
                        disabled={status === 'Done'}
                        onChange={() => handleToggle(userId, status)}
                      />
                      <div
                        className={`
                          w-full h-full rounded-full transition duration-300
                          ${status === "Done" ? "bg-gray-400" : "bg-green-500"}
                        `}
                      ></div>

                      <div
                        className={`
                          absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition
                          peer-checked:translate-x-full
                        `}
                      ></div>
                    </label>
                  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-3 text-gray-500">
                    No data for this month
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

