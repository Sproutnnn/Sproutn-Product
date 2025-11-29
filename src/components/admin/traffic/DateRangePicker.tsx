import React from 'react';
import { CalendarIcon } from 'lucide-react';

export type DateRangePreset = 'today' | '7days' | '30days' | 'custom';

interface DateRangePickerProps {
  selectedPreset: DateRangePreset;
  customRange: { startDate: string; endDate: string };
  onPresetChange: (preset: DateRangePreset) => void;
  onCustomRangeChange: (range: { startDate: string; endDate: string }) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedPreset,
  customRange,
  onPresetChange,
  onCustomRangeChange
}) => {
  const presets: { key: DateRangePreset; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: '7days', label: '7 Days' },
    { key: '30days', label: '30 Days' },
    { key: 'custom', label: 'Custom' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-5 w-5 text-gray-400" />
        <div className="flex rounded-md shadow-sm">
          {presets.map(preset => (
            <button
              key={preset.key}
              onClick={() => onPresetChange(preset.key)}
              className={`px-4 py-2 text-sm font-medium first:rounded-l-md last:rounded-r-md border ${
                selectedPreset === preset.key
                  ? 'bg-[#016E4E] text-white border-[#016E4E]'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {selectedPreset === 'custom' && (
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={customRange.startDate}
            onChange={e =>
              onCustomRangeChange({ ...customRange, startDate: e.target.value })
            }
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]"
          />
          <span className="text-gray-500">to</span>
          <input
            type="date"
            value={customRange.endDate}
            onChange={e =>
              onCustomRangeChange({ ...customRange, endDate: e.target.value })
            }
            className="border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]"
          />
        </div>
      )}
    </div>
  );
};
