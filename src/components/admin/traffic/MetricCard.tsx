import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  trend
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-[#016E4E] bg-opacity-10 rounded-lg">
          <div className="text-[#016E4E]">{icon}</div>
        </div>
        {trend && (
          <div
            className={`flex items-center text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            <span>{trend.isPositive ? '+' : ''}{trend.value}%</span>
          </div>
        )}
      </div>
      <div className="text-3xl font-bold text-[#434C54] mb-1">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      <div className="text-sm text-gray-500">{title}</div>
      {subtitle && (
        <div className="text-xs text-gray-400 mt-1">{subtitle}</div>
      )}
    </div>
  );
};
