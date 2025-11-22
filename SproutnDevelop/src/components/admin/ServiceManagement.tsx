import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, EyeIcon, CodeIcon, SearchIcon } from 'lucide-react';
interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
  status: 'published' | 'draft';
  lastUpdated: string;
}
const ServiceManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setServices([{
        id: '1',
        title: 'Web Development',
        slug: 'web-development',
        description: 'Create powerful, responsive web applications using modern frameworks and technologies.',
        icon: 'code',
        features: ['Custom web applications', 'E-commerce websites', 'Progressive web apps'],
        status: 'published',
        lastUpdated: '2023-06-15'
      }, {
        id: '2',
        title: 'Mobile Development',
        slug: 'mobile-development',
        description: 'Build native and cross-platform mobile apps that deliver exceptional user experiences.',
        icon: 'smartphone',
        features: ['iOS apps', 'Android apps', 'Cross-platform development'],
        status: 'published',
        lastUpdated: '2023-05-28'
      }, {
        id: '3',
        title: 'Custom Software',
        slug: 'custom-software',
        description: 'Develop tailor-made software solutions that address your unique business challenges.',
        icon: 'server',
        features: ['Business automation', 'CRM systems', 'Data processing applications'],
        status: 'published',
        lastUpdated: '2023-05-20'
      }, {
        id: '4',
        title: 'UI/UX Design',
        slug: 'ui-ux-design',
        description: 'Create intuitive, engaging user interfaces that delight your customers.',
        icon: 'paintBrush',
        features: ['User research', 'Wireframing', 'Prototyping', 'Usability testing'],
        status: 'published',
        lastUpdated: '2023-05-15'
      }, {
        id: '5',
        title: 'DevOps & Cloud',
        slug: 'devops-cloud',
        description: 'Optimize your development pipeline and cloud infrastructure for performance, security, and scalability.',
        icon: 'cloud',
        features: ['CI/CD implementation', 'Cloud migration', 'Infrastructure as code'],
        status: 'published',
        lastUpdated: '2023-05-10'
      }, {
        id: '6',
        title: 'AI Integration',
        slug: 'ai-integration',
        description: 'Integrate AI capabilities into your existing applications.',
        icon: 'brain',
        features: ['Machine learning models', 'Natural language processing', 'Computer vision'],
        status: 'draft',
        lastUpdated: '2023-06-02'
      }]);
      setLoading(false);
    }, 500);
  }, []);
  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (serviceToDelete) {
      // In a real app, this would send a delete request to the API
      setServices(prevServices => prevServices.filter(service => service.id !== serviceToDelete));
      setShowDeleteModal(false);
      setServiceToDelete(null);
    }
  };
  const toggleStatus = (id: string) => {
    setServices(prevServices => prevServices.map(service => service.id === id ? {
      ...service,
      status: service.status === 'published' ? 'draft' : 'published'
    } : service));
  };
  const filteredServices = services.filter(service => service.title.toLowerCase().includes(searchTerm.toLowerCase()) || service.description.toLowerCase().includes(searchTerm.toLowerCase()));
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016E4E]"></div>
      </div>;
  }
  return <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#434C54]">Service Management</h2>
        <Link to="/admin/services/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E]">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Service
        </Link>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="w-full md:w-1/3">
            <div className="relative">
              <input type="text" placeholder="Search services..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
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
              {filteredServices.map(service => <tr key={service.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CodeIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">
                        {service.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500 line-clamp-2">
                      {service.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {service.lastUpdated}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${service.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {service.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/services/${service.slug}`} target="_blank" className="p-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-md" title="View">
                        <EyeIcon className="h-4 w-4" />
                      </Link>
                      <button onClick={() => toggleStatus(service.id)} className={`p-1 rounded-md ${service.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`} title={service.status === 'published' ? 'Unpublish' : 'Publish'}>
                        <span className="text-xs font-bold">
                          {service.status === 'published' ? 'P' : 'D'}
                        </span>
                      </button>
                      <Link to={`/admin/services/edit/${service.id}`} className="p-1 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-md" title="Edit">
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDeleteClick(service.id)} className="p-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md" title="Delete">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>)}
              {filteredServices.length === 0 && <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No services found
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
              Are you sure you want to delete this service? This action cannot
              be undone.
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
export default ServiceManagement;