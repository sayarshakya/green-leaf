import StatusLabel from "../../components/StatusLabel";

export default function Loan() {
  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-black">Loan</h1>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-center bg-white border border-gray-200 rounded-lg shadow text-sm md:text-base">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">From Date</th>
                <th className="px-4 py-3">To Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Alice Smith', date: '2025/08/01', status: 'Pending' },
                { name: 'Bob Johnson', date: '2025/08/01', status: 'Done' },
                { name: 'Carol Lee', date: '2025/08/01', status: 'Done' },
                { name: 'Carol Lee', date: '2025/08/01', status: 'Pending' },
              ].map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-100'
                  } text-black`}
                >
                  <td className="px-4 py-3 border-t">{row.name}</td>
                  <td className="px-4 py-3 border-t">{row.date}</td>
                  <td className="px-4 py-3 border-t">
                    <StatusLabel status={row.status} />
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
