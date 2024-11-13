import Link from 'next/link';

export default function DatasetBuilder() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4">Build Your Dataset</h1>

        {/* Column Builder Section */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Column Title</label>
          <input 
            type="text" 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            placeholder="Column 1" 
          />

          <label className="block text-gray-700 font-medium mt-4">Data Type</label>
          <select 
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>People / Full Name</option>
            <option>Email</option>
            <option>Phone Number</option>
            {/* Add other options as needed */}
          </select>
        </div>

        {/* API Preview Section */}
        <div className="border-t border-gray-200 pt-4 mt-4">
          <h2 className="text-xl font-semibold">API Preview</h2>
          <div className="overflow-auto mt-4">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b">ID</th>
                  <th className="px-4 py-2 border-b">Column 1</th>
                </tr>
              </thead>
              <tbody>
                {/* Example data preview */}
                <tr>
                  <td className="px-4 py-2 border-b">1</td>
                  <td className="px-4 py-2 border-b">Errol Rawlingson</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b">2</td>
                  <td className="px-4 py-2 border-b">Caron Archer</td>
                </tr>
                {/* More rows can be added dynamically */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Generate API Button */}
        <div className="mt-6">
          <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Generate API
          </button>
        </div>
      </div>
    </div>
  );
}
