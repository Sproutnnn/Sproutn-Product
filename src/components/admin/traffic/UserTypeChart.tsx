import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface UserTypeChartProps {
  newVisitors: number;
  returningVisitors: number;
  isLoading?: boolean;
}

const COLORS = ['#016E4E', '#6b7280'];

export const UserTypeChart: React.FC<UserTypeChartProps> = ({
  newVisitors,
  returningVisitors,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#434C54] mb-4">New vs Returning</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#016E4E]" />
        </div>
      </div>
    );
  }

  const total = newVisitors + returningVisitors;

  const data = [
    { name: 'New Visitors', value: newVisitors },
    { name: 'Returning Visitors', value: returningVisitors }
  ];

  if (total === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#434C54] mb-4">New vs Returning</h3>
        <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
          No visitor data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-[#434C54] mb-4">New vs Returning</h3>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
                name
              ]}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="text-2xl font-bold text-[#016E4E]">
            {((newVisitors / total) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">New</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-gray-600">
            {((returningVisitors / total) * 100).toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">Returning</div>
        </div>
      </div>
    </div>
  );
};
