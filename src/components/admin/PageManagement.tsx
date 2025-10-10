import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, FileTextIcon } from 'lucide-react';
interface Page {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
  status: 'published' | 'draft';
  type: string;
}
const PageManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<Page[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  // Page types for filter
  const pageTypes = ['Home', 'About', 'Services', 'Service Detail', 'Contact', 'Custom'];
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setPages([{
        id: '1',
        title: 'Home',
        slug: '/',
        lastUpdated: '2023-06-15',
        status: 'published',
        type: 'Home'
      }, {
        id: '2',
        title: 'About Us',
        slug: '/about',
        lastUpdated: '2023-05-28',
        status: 'published',
        type: 'About'
      }, {
        id: '3',
        title: 'Services',
        slug: '/services',
        lastUpdated: '2023-05-20',
        status: 'published',
        type: 'Services'
      }, {
        id: '4',
        title: 'Prototyping Service',
        slug: '/services/prototyping',
        lastUpdated: '2023-05-15',
        status: 'published',
        type: 'Service Detail'
      }, {
        id: '5',
        title: 'Sourcing Service',
        slug: '/services/sourcing',
        lastUpdated: '2023-05-10',
        status: 'published',
        type: 'Service Detail'
      }, {
        id: '6',
        title: 'Manufacturing Service',
        slug: '/services/manufacturing',
        lastUpdated: '2023-05-05',
        status: 'published',
        type: 'Service Detail'
      }, {
        id: '7',
        title: 'Photography Service',
        slug: '/services/photography',
        lastUpdated: '2023-04-28',
        status: 'published',
        type: 'Service Detail'
      }, {
        id: '8',
        title: 'Marketing Service',
        slug: '/services/marketing',
        lastUpdated: '2023-04-20',
        status: 'published',
        type: 'Service Detail'
      }, {
        id: '9',
        title: 'Terms of Service',
        slug: '/terms',
        lastUpdated: '2023-03-15',
        status: 'published',
        type: 'Custom'
      }, {
        id: '10',
        title: 'Privacy Policy',
        slug: '/privacy',
        lastUpdated: '2023-03-15',
        status: 'published',
        type: 'Custom'
      }, {
        id: '11',
        title: 'Cookies Policy',
        slug: '/cookies',
        lastUpdated: '2023-03-15',
        status: 'published',
        type: 'Custom'
      }, {
        id: '12',
        title: 'New Service Page',
        slug: '/services/new-service',
        lastUpdated: '2023-06-02',
        status: 'draft',
        type: 'Service Detail'
      }]);
      setLoading(false);
    }, 500);
  }, []);
  const handleDeleteClick = (id: string) => {
    setPageToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (pageToDelete) {
      // In a real app, this would send a delete request to the API
      setPages(prevPages => prevPages.filter(page => page.id !== pageToDelete));
      setShowDeleteModal(false);
      setPageToDelete(null);
    }
  };
  const toggleStatus = (id: string) => {
    setPages(prevPages => prevPages.map(page => page.id === id ? {
      ...page,
      status: page.status === 'published' ? 'draft' : 'published'
    } : page));
  };
  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) || page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === '' || page.type === selectedType;
    return matchesSearch && matchesType;
  });
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016E4E]"></div>
      </div>;
  }
  return <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#434C54]">Page Management</h2>
        <Link to="/admin/pages/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E]">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Page
        </Link>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="w-full md:w-1/3">
            <input type="text" placeholder="Search pages..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" />
          </div>
          <div className="w-full md:w-1/4">
            <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]">
              <option value="">All Page Types</option>
              {pageTypes.map(type => <option key={type} value={type}>
                  {type}
                </option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  URL
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPages.map(page => <tr key={page.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileTextIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {page.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{page.slug}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{page.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {page.lastUpdated}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {page.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link to={page.slug} target="_blank" className="p-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md" title="View">
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <button onClick={() => toggleStatus(page.id)} className={`p-1 rounded-md ${page.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`} title={page.status === 'published' ? 'Unpublish' : 'Publish'}>
                        <span className="text-xs font-bold">
                          {page.status === 'published' ? 'P' : 'D'}
                        </span>
                      </button>
                      <Link to={`/admin/pages/edit/${page.slug.replace(/^\//, '')}`} className="p-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md" title="Edit">
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDeleteClick(page.id)} className="p-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md" title="Delete">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>)}
              {filteredPages.length === 0 && <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No pages found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this page? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default PageManagement;