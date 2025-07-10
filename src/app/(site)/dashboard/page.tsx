import Card from "../components/Card";
import StatusLabel from "../components/StatusLabel";

export default function Home() {

const statusColors = {
  Done: 'text-green-800 bg-green-100',
  Pending: 'text-yellow-800 bg-yellow-100',
  None: 'text-gray-800 bg-gray-200',
  Failed: 'text-red-800 bg-red-100',
};

 return (
    <div className="p-4">
      <div className="overflow-x-auto">
          <div className="p-6 space-y-3">
          <h1 className="text-3xl text-black font-bold mb-6">Dashboard</h1>
          {/* Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="bg-lime-300" title="Total Amount" description="500,000" />
            <Card className="bg-green-300" title="TODO" description="TODO" />
            <Card className="bg-blue-500" title="Loan Amount" description="300,000" />
            <Card className="bg-red-500" title="Loan Count" description="5" />
          </div>

          {/* Table aligned with grid */}
          <div className="w-full">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden text-center">
            <thead className="bg-gray-800">
              <tr className="px-6 py-3 text-sm font-bold text-white">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-100 text-black">
                <td className="px-6 py-4 border-t">Alice Smith</td>
                <td className="px-6 py-4 border-t">2025/08/01</td>
                <td className="px-6 py-4 border-t">
                   <StatusLabel status="Pending" />
                </td>
                <td className="px-6 py-4 border-t"></td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-100 text-black">
                <td className="px-6 py-4 border-t">Bob Johnson</td>
                <td className="px-6 py-4 border-t">2025/08/01</td>
                <td className="px-6 py-4 border-t">
                  <StatusLabel status="Done" />
                </td>
                <td className="px-6 py-4 border-t">Pending</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-100 text-black">
                <td className="px-6 py-4 border-t">Carol Lee</td>
                <td className="px-6 py-4 border-t">2025/08/01</td>
                <td className="px-6 py-4 border-t">
                  <StatusLabel status="Done" />
                </td>
                <td className="px-6 py-4 border-t">Pending</td>
              </tr>
               <tr className="odd:bg-white even:bg-gray-100 text-black">
                <td className="px-6 py-4 border-t">Carol Lee</td>
                <td className="px-6 py-4 border-t">2025/08/01</td>
                <td className="px-6 py-4 border-t">
                  <StatusLabel status="Pending" />
                </td>
                <td className="px-6 py-4 border-t">Pending</td>
              </tr>
            </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
