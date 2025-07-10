"use client";
import { onAuthStateChanged } from "firebase/auth";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { LoanWithUser, UserData } from "../../data/models";
import { fetchLoansWithUser } from '../../data/fetchLoan';
import { formatNumber } from "../../utils/formatNumber";


export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loans, setLoans] = useState<LoanWithUser[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data() as UserData);
        } else {
          console.warn('No user document found in Firestore');
        }
      } else {
        console.log('No user logged in');
        setUserData(null);
      }

      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    fetchLoansWithUser().then((data) => {
      setLoans(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading user info...</div>;

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-black">Dashboard</h1>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" >
          <Card className="bg-lime-300" title="Total Amount" description={userData?.loanAmount ? formatNumber(userData.loanAmount) : ''} />
          <Card className="bg-green-300" title="TODO" description="TODO" />
          <Card className="bg-blue-500" title="Loan Amount" description={userData?.loanAmount ? formatNumber(userData.loanAmount) : ''} />
          <Card className="bg-red-500" title="Loan Count" description={userData?.loanCount?.toString()} />
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          
          <table className="w-full text-center bg-white border border-gray-200 rounded-lg shadow text-sm md:text-base">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">From Date</th>
                <th className="px-4 py-3">To Date</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  } text-black`}
                >
                  <td className="px-4 py-3 border-t">{row.user.name}</td>
                  <td className="px-4 py-3 border-t">
                    {row.fromDate.toDate().toISOString().split('T')[0]}
                  </td>
                  <td className="px-4 py-3 border-t">
                    {row.toDate.toDate().toISOString().split('T')[0]}
                  </td>
                  <td className="px-4 py-3 border-t">
                   {formatNumber(row.loanAmount)} 
                  </td>
                  <td className="px-4 py-3 border-t">Pending</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}