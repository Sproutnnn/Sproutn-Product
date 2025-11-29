import React from 'react';
import { FileTextIcon, HomeIcon, LayoutDashboardIcon, BookOpenIcon, BriefcaseIcon, ShoppingCartIcon, UserIcon, SettingsIcon } from 'lucide-react';

export interface PageViewData {
  page: string;
  views: number;
  percentage?: number;
}

interface PageViewsTableProps {
  pages: PageViewData[];
  isLoading?: boolean;
}

// Map page paths to friendly names and icons
const getPageInfo = (path: string): { name: string; icon: React.ReactNode } => {
  const iconClass = "h-4 w-4";

  // Normalize path
  const normalizedPath = path.toLowerCase();

  if (normalizedPath === '/' || normalizedPath === '') {
    return { name: 'Home / Landing Page', icon: <HomeIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/dashboard')) {
    return { name: 'Dashboard', icon: <LayoutDashboardIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/blog') && normalizedPath !== '/blog') {
    const slug = path.split('/blog/')[1] || 'Article';
    return { name: `Blog: ${slug}`, icon: <BookOpenIcon className={iconClass} /> };
  }
  if (normalizedPath === '/blog') {
    return { name: 'Blog Page', icon: <BookOpenIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/services')) {
    const service = path.split('/services/')[1] || 'Services';
    return { name: `Services: ${service}`, icon: <BriefcaseIcon className={iconClass} /> };
  }
  if (normalizedPath === '/services' || normalizedPath === '/servicespage') {
    return { name: 'Services Page', icon: <BriefcaseIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/chat')) {
    return { name: 'Chat', icon: <FileTextIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/profile')) {
    return { name: 'User Profile', icon: <UserIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/login') || normalizedPath.includes('/signup')) {
    return { name: normalizedPath.includes('/login') ? 'Login' : 'Sign Up', icon: <UserIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/admin')) {
    return { name: 'Admin Panel', icon: <SettingsIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/cart') || normalizedPath.includes('/checkout') || normalizedPath.includes('/payment')) {
    return { name: 'Payment/Checkout', icon: <ShoppingCartIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/about')) {
    return { name: 'About Page', icon: <FileTextIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/privacy') || normalizedPath.includes('/terms') || normalizedPath.includes('/cookies')) {
    return { name: `Legal: ${path.split('/').pop()}`, icon: <FileTextIcon className={iconClass} /> };
  }
  if (normalizedPath.includes('/project')) {
    return { name: 'Project Page', icon: <BriefcaseIcon className={iconClass} /> };
  }

  // Default: use path as name
  return { name: path, icon: <FileTextIcon className={iconClass} /> };
};

export const PageViewsTable: React.FC<PageViewsTableProps> = ({
  pages,
  isLoading
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-[#434C54] mb-4">Page Views</h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-8 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    );
  }

  const totalViews = pages.reduce((sum, p) => sum + p.views, 0);
  const maxViews = Math.max(...pages.map(p => p.views), 1);

  // Calculate percentages if not provided
  const pagesWithPercentage = pages.map(p => ({
    ...p,
    percentage: p.percentage ?? (totalViews > 0 ? (p.views / totalViews) * 100 : 0)
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#434C54]">Page Views</h3>
        <span className="text-sm text-gray-500">
          {totalViews.toLocaleString()} total views
        </span>
      </div>

      {pages.length === 0 ? (
        <p className="text-gray-500 text-sm">No page view data available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Page
                </th>
                <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Views
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
              {pagesWithPercentage.map((pageData) => {
                const pageInfo = getPageInfo(pageData.page);
                return (
                  <tr key={pageData.page} className="hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="text-[#016E4E]">{pageInfo.icon}</span>
                        <div>
                          <span className="text-sm font-medium text-gray-900">
                            {pageInfo.name}
                          </span>
                          <span className="block text-xs text-gray-400">
                            {pageData.page}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm text-gray-600">
                        {pageData.views.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-sm text-gray-600">
                        {pageData.percentage.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#016E4E] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(pageData.views / maxViews) * 100}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
