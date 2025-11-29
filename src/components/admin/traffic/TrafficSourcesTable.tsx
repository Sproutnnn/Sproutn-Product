import React from 'react';
import type { TrafficSource } from '../../../services/analytics.service';

interface TrafficSourcesTableProps {
  sources: TrafficSource[];
  isLoading?: boolean;
}

export const TrafficSourcesTable: React.FC<TrafficSourcesTableProps> = ({
  sources,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#434C54] mb-4">Traffic Sources</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const maxVisits = Math.max(...sources.map(s => s.visits), 1);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-[#434C54] mb-4">Traffic Sources</h3>

      {sources.length === 0 ? (
        <p className="text-gray-500 text-sm">No traffic data available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Visits
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  %
                </th>
                <th className="py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Distribution
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sources.map((source, index) => (
                <tr key={source.source} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className="text-sm font-medium text-gray-900">
                      {source.source}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-gray-600">
                      {source.visits.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="text-sm text-gray-600">
                      {source.percentage.toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-[#016E4E] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(source.visits / maxVisits) * 100}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
