'use client';

import { useUser } from '@/app/components/UserContext';
import { redirect } from 'next/navigation';
import Loading from '@/app/components/Loading';

export default function Profile() {
  const { userData, loading } = useUser();

  if (loading) {
    return <Loading />;

  }

  if (!userData) {
    redirect('/login');
    return null;
  }

  return (
    <div className="p-4">
        <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>

        <div className="bg-white shadow rounded-lg p-6 space-y-4 border">
            <div>
            <label className="block text-gray-600 text-sm font-medium">Name</label>
            <div className="text-lg text-black font-semibold">{userData.name}</div>
            </div>

            <div>
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <div className="text-lg text-black">{userData.email}</div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <div>
                <label className="block text-gray-600 text-sm font-medium">Loan Count</label>
                <div className="text-lg text-black">{userData.loanCount}</div>
            </div>
            <div>
                <label className="block text-gray-600 text-sm font-medium">Loan Amount</label>
                <div className="text-lg text-black">{userData.loanAmount.toLocaleString()}</div>
            </div>
            </div>
        </div>
        </div>
    </div>
  );
}
