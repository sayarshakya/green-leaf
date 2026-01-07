"use client";
import { faPiggyBank, faHashtag, faReceipt, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import Card from "@/app/components/Card";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Detail, UserData } from "@/app/data/models";
import { formatNumber } from "@/app/utils/formatNumber";
import Loading from '@/app/components/Loading';
import DateFormatter from '@/app/components/DateFormatter';
import MonthLabel from '@/app/components/MonthLabel';


export default function Home() {
  const [data, setData] = useState<Detail | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserData[]>([]);
  const [sortedUsers, setSortedUsers] = useState<UserData[]>([]);
  const [isDesc, setIsDesc] = useState(true);

useEffect(() => {
    const fetchDetails = async () => {
      const docRef = doc(db, 'details', process.env.NEXT_PUBLIC_DETAIL_ID as string); 
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data() as Detail);
      } else {
        console.warn('No such document!');
      }
      setLoading(false);
    };

    fetchDetails();
  }, []);

const cards = [
  { title: 'Total Amount', value: data?.availableAmount, bg: 'bg-lime-400', bbg: 'bg-lime-600', icon: faPiggyBank },
  { title: 'Loan Amount', value: data?.loanAmount, bg: 'bg-blue-400', bbg: 'bg-blue-600', icon: faReceipt },
  { title: 'Loan Count', value: data?.loanCount, bg: 'bg-red-400', bbg: 'bg-red-600', icon: faHashtag },
  { title: 'Updated At', value: data?.updatedAt, bg: 'bg-green-400', bbg: 'bg-green-600', icon: faCalendarDay },
];

 useEffect(() => {
    const q = query(collection(db, 'users'),
    orderBy('toDate', 'asc'));
    const unsub = onSnapshot(q, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as UserData[];
      setUsers(userList);
      setSortedUsers(userList);
    });
    return () => unsub();
  }, []);

  const handleCountSort = () => {
    const sorted = [...sortedUsers].sort((a, b) =>
      isDesc ? b.loanCount - a.loanCount : a.loanCount - b.loanCount
    );

    setSortedUsers(sorted);
    setIsDesc(!isDesc);
  };

  if (loading) 
  return <Loading />;
  
  return (
  <div className="p-4">
    <div className="max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-black">Dashboard</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map(({ title, value, bg, bbg, icon }, idx) => (
          <Card
            key={idx}
            className={bg}
            title={title}
            bbg={bbg}
            description={
              value === undefined
                ? '...'
                : typeof value === 'number'
                  ? formatNumber(value)
                  : typeof value === 'string'
                    ? value
                    : (value && typeof value.toDate === 'function')
                      ? value.toDate().toLocaleString('en-CA', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false,
                      timeZone: 'Asia/Kathmandu'
                    }).replace(/-/g, '/').replace(',', '')
                      : String(value)
            }
            icon={icon}
          />
        ))}
      </div>

      {/* Responsive Table */}
      <label className="text-2xl md:text-2xl font-bold text-black">Loan Details</label>
      
      {/* Prevent horizontal scroll */}
      <div className="overflow-x-auto w-full">
        <table className="min-w-full text-center bg-white border border-gray-200 rounded-lg shadow text-sm md:text-base">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3">From Date</th>
              <th className="px-4 py-3">To Date</th>
              <th className="px-4 py-3">Amount</th>
              <th
                className="px-4 py-3 cursor-pointer select-none hover:bg-gray-700"
                onClick={handleCountSort}
              >
                Count {isDesc ? '▼' : '▲'}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                } text-black`}
              >
                <td className="px-4 py-3 border-t text-left font-semibold">{row.name}</td>
                <td className="px-4 py-3 border-t">
                  <DateFormatter value={row.fromDate} />
                </td>
                <td className="px-4 py-3 border-t font-semibold rounded">
                   <MonthLabel dateValue={row.toDate.toDate()} />
                </td>
                <td className="px-4 py-3 border-t">
                  {formatNumber(row.loanAmount)} 
                </td>
                  <td className="px-4 py-3 border-t">
                  {row.loanCount} 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  );
}