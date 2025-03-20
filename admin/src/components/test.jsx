export default function Test() {
    return (
      <div className="overflow-x-auto">
        <div className="table-auto border-collapse border border-gray-300">
          <div>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2 min-w-[50vw]">Cột 1</th>
              <th className="border border-gray-300 px-4 py-2 min-w-[50vw]">Cột 2</th>
              <th className="border border-gray-300 px-4 py-2 min-w-[50vw]">Cột 3</th>
              <th className="border border-gray-300 px-4 py-2 min-w-[50vw]">Cột 4</th>
              <th className="border border-gray-300 px-4 py-2 min-w-[50vw]">Cột 5</th>
              <th className="border border-gray-300 px-4 py-2 min-w-[50vw]">Cột 6</th>
            </tr>
          </div>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Dữ liệu 1</td>
              <td className="border border-gray-300 px-4 py-2">Dữ liệu 2</td>
              <td className="border border-gray-300 px-4 py-2">Dữ liệu 3</td>
              <td className="border border-gray-300 px-4 py-2">Dữ liệu 4</td>
              <td className="border border-gray-300 px-4 py-2">Dữ liệu 5</td>
              <td className="border border-gray-300 px-4 py-2">Dữ liệu 6</td>
            </tr>
          </tbody>
        </div>
      </div>
    );
  }