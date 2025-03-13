import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
interface LabelProp {
  cx: number;
  cy: number;
  percent: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
}
const RADIAN = Math.PI / 180;

const RechartPieChart = () => {
  const data = [
    { name: 'R&D', value: 50, color: '#00d4bd' },
    { name: 'Operational', value: 85, color: '#ffe700' },
    { name: 'Networking', value: 16, color: '#FFA1A1' },
    { name: 'Hiring', value: 50, color: '#826bf8' },
  ];
  const renderCustomizedLabel = (props: LabelProp) => {
    // ** Props
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="h-[500px]">
      <ResponsiveContainer>
        <PieChart height={350} style={{ direction: 'ltr' }}>
          <Pie
            data={data}
            innerRadius={90}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false}
            paddingAngle={2} // Thêm khoảng cách giữa các phần
            cornerRadius={10} // Bo tròn góc
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RechartPieChart;
