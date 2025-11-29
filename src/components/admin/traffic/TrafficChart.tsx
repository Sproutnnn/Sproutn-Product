import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import type { DailyTraffic } from '../../../services/analytics.service';

interface TrafficChartProps {
  data: DailyTraffic[];
  isLoading?: boolean;
}

export const TrafficChart: React.FC<TrafficChartProps> = ({ data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#434C54] mb-4">Visitors Over Time</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#016E4E]" />
        </div>
      </div>
    );
  }

  // Format date for display
  const formattedData = data.map(d => ({
    ...d,
    displayDate: new Date(d.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    })
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-[#434C54] mb-4">Visitors Over Time</h3>

      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-gray-500 text-sm">
          No traffic data available for this period
        </div>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="displayDate"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={{ stroke: '#e5e7eb' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickLine={{ stroke: '#e5e7eb' }}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number, name: string) => [
                  value.toLocaleString(),
                  name === 'visits' ? 'Total Visits' : name === 'newVisitors' ? 'New Visitors' : 'Returning'
                ]}
              />
              <Legend
                wrapperStyle={{ paddingTop: '10px' }}
                formatter={(value) =>
                  value === 'visits' ? 'Total Visits' : value === 'newVisitors' ? 'New Visitors' : 'Returning'
                }
              />
              <Line
                type="monotone"
                dataKey="visits"
                stroke="#016E4E"
                strokeWidth={2}
                dot={{ fill: '#016E4E', r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="newVisitors"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="returningVisitors"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
