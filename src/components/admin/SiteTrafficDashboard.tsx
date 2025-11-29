import React, { useState, useEffect, useMemo } from 'react';
import { UsersIcon, UserPlusIcon, UserCheckIcon, TrendingDownIcon } from 'lucide-react';
import { analyticsService } from '../../services/analytics.service';
import type { OverviewStats, TrafficSource, DailyTraffic } from '../../services/analytics.service';
import {
  MetricCard,
  DateRangePicker,
  DateRangePreset,
  TrafficSourcesTable,
  TrafficChart,
  UserTypeChart
} from './traffic';

function getDateRange(preset: DateRangePreset, customRange: { startDate: string; endDate: string }) {
  const today = new Date();
  const endDate = today.toISOString().split('T')[0];

  switch (preset) {
    case 'today':
      return { startDate: endDate, endDate };
    case '7days': {
      const start = new Date(today);
      start.setDate(start.getDate() - 6);
      return { startDate: start.toISOString().split('T')[0], endDate };
    }
    case '30days': {
      const start = new Date(today);
      start.setDate(start.getDate() - 29);
      return { startDate: start.toISOString().split('T')[0], endDate };
    }
    case 'custom':
      return customRange;
    default:
      return { startDate: endDate, endDate };
  }
}

const SiteTrafficDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Date range state
  const [selectedPreset, setSelectedPreset] = useState<DateRangePreset>('7days');
  const [customRange, setCustomRange] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Data state
  const [overviewStats, setOverviewStats] = useState<OverviewStats | null>(null);
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([]);
  const [dailyTraffic, setDailyTraffic] = useState<DailyTraffic[]>([]);

  const dateRange = useMemo(
    () => getDateRange(selectedPreset, customRange),
    [selectedPreset, customRange]
  );

  // Fetch data when date range changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [stats, sources, daily] = await Promise.all([
          analyticsService.getOverviewStats(dateRange),
          analyticsService.getTrafficSourceBreakdown(dateRange),
          analyticsService.getDailyTraffic(dateRange)
        ]);

        setOverviewStats(stats);
        setTrafficSources(sources);
        setDailyTraffic(daily);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-center text-red-600">
          <p className="text-lg font-semibold">Error loading analytics</p>
          <p className="text-sm mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#016E4E] text-white rounded-md hover:bg-[#015d42]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-md rounded-lg px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-xl font-bold text-[#434C54]">Site Traffic Analytics</h2>
          <DateRangePicker
            selectedPreset={selectedPreset}
            customRange={customRange}
            onPresetChange={setSelectedPreset}
            onCustomRangeChange={setCustomRange}
          />
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Visits"
          value={loading ? '...' : overviewStats?.totalVisits || 0}
          icon={<UsersIcon className="h-6 w-6" />}
          subtitle={`${overviewStats?.uniqueVisitors || 0} unique visitors`}
        />
        <MetricCard
          title="New Visitors"
          value={loading ? '...' : overviewStats?.newVisitors || 0}
          icon={<UserPlusIcon className="h-6 w-6" />}
        />
        <MetricCard
          title="Returning Visitors"
          value={loading ? '...' : overviewStats?.returningVisitors || 0}
          icon={<UserCheckIcon className="h-6 w-6" />}
        />
        <MetricCard
          title="Bounce Rate"
          value={loading ? '...' : `${overviewStats?.bounceRate || 0}%`}
          icon={<TrendingDownIcon className="h-6 w-6" />}
          subtitle={`Avg. ${overviewStats?.avgPagesPerSession || 0} pages/session`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChart data={dailyTraffic} isLoading={loading} />
        </div>
        <div className="lg:col-span-1">
          <UserTypeChart
            newVisitors={overviewStats?.newVisitors || 0}
            returningVisitors={overviewStats?.returningVisitors || 0}
            isLoading={loading}
          />
        </div>
      </div>

      {/* Traffic Sources Table */}
      <TrafficSourcesTable sources={trafficSources} isLoading={loading} />
    </div>
  );
};

export default SiteTrafficDashboard;
