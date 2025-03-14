interface TableChartProps {
  data: {
    name: string;
    unlocked: number;
    locked: number;
    color: string;
  }[];
}
const TableChart = ({ data }: TableChartProps) => {
  return (
    <div className="max-w-[609px] w-full">
      <table className="w-full border-collapse text-white">
        <thead>
          <tr className="text-gray-400 text-left text-sm">
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Total</th>
            <th className="py-3 px-4">Unlocked</th>
            <th className="py-3 px-4">Locked</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-700 last:border-none"
            >
              <td className="py-3 px-4 flex items-center">
                <span
                  style={{
                    background: row.color,
                  }}
                  className={`w-2.5 h-2.5 rounded-full mr-2 `}
                ></span>
                {row.name}
              </td>
              <td className="py-3 px-4">{row.unlocked + row.locked}%</td>
              <td className="py-3 px-4">
                {row.unlocked ? `${row.unlocked}%` : "-"}
              </td>
              <td className="py-3 px-4">
                {row.locked ? `${row.locked}%` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableChart;
