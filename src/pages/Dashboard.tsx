import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import ProjectCard, { Project } from '../components/ProjectCard';
import { useAuth } from '../context/AuthContext';
const Dashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newStatus, setNewStatus] = useState('');
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    const mockProjects: Project[] = [{
      id: '1',
      name: 'Smart Home Controller',
      status: 'prototyping',
      createdAt: '2023-05-15T10:30:00Z',
      updatedAt: '2023-05-20T14:45:00Z',
      customer: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    }, {
      id: '2',
      name: 'Eco-Friendly Water Bottle',
      status: 'sourcing',
      createdAt: '2023-06-02T09:15:00Z',
      updatedAt: '2023-06-10T16:20:00Z',
      customer: {
        name: 'Jane Smith',
        email: 'jane@example.com'
      }
    }, {
      id: '3',
      name: 'Ergonomic Office Chair',
      status: 'payment',
      createdAt: '2023-04-10T11:00:00Z',
      updatedAt: '2023-04-28T13:30:00Z',
      customer: {
        name: 'Robert Johnson',
        email: 'robert@example.com'
      }
    }, {
      id: '4',
      name: 'Portable Solar Charger',
      status: 'completed',
      createdAt: '2023-03-05T08:45:00Z',
      updatedAt: '2023-03-25T15:10:00Z',
      customer: {
        name: 'Sarah Williams',
        email: 'sarah@example.com'
      }
    }];
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 500); // Simulate API delay
  }, []);
  const handleStatusChange = (project: Project) => {
    setSelectedProject(project);
    setNewStatus(project.status);
    setShowStatusModal(true);
  };
  const saveStatusChange = () => {
    if (selectedProject && newStatus) {
      setProjects(prev => prev.map(p => p.id === selectedProject.id ? {
        ...p,
        status: newStatus as Project['status']
      } : p));
      setShowStatusModal(false);
    }
  };
  return <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {user?.role === 'customer' && <Link to="/create-project" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            <PlusIcon className="h-5 w-5 mr-2" />
            Create New Project
          </Link>}
      </div>
      {loading ? <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div> : <>
          {projects.length === 0 ? <div className="bg-white rounded-lg shadow p-6 text-center">
              <h3 className="text-lg font-medium text-gray-900">
                No projects found
              </h3>
              {user?.role === 'customer' ? <p className="mt-2 text-gray-500">
                  Get started by creating your first project
                </p> : <p className="mt-2 text-gray-500">
                  No projects have been created by customers yet
                </p>}
            </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => <div key={project.id}>
                  <ProjectCard project={project} />
                  {user?.role === 'admin' && <div className="mt-2 flex justify-end">
                      <button onClick={() => handleStatusChange(project)} className="text-xs text-primary-600 hover:text-primary-800">
                        Change Status
                      </button>
                    </div>}
                </div>)}
            </div>}
        </>}
      {/* Status Change Modal */}
      {showStatusModal && selectedProject && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Change Project Status
            </h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project
              </label>
              <div className="text-sm bg-gray-50 p-2 rounded border border-gray-200">
                {selectedProject.name}
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                <option value="draft">Draft</option>
                <option value="details">Brief</option>
                <option value="prototyping">Prototyping</option>
                <option value="sourcing">Sourcing</option>
                <option value="payment">To Pay</option>
                <option value="production">Production</option>
                <option value="shipping">Shipped</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowStatusModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={saveStatusChange} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default Dashboard;