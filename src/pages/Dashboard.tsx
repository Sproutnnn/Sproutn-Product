import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, SearchIcon, XIcon, Trash2Icon } from 'lucide-react';
import ProjectCard, { Project } from '../components/ProjectCard';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
const Dashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<Project | null>(null);

  const fetchProjects = useCallback(async (query: string = '') => {
    try {
      setLoading(true);
      let fetchedProjects;

      if (user?.role === 'admin') {
        // Admins see all projects
        fetchedProjects = query
          ? await projectsService.search(query)
          : await projectsService.getAll();
      } else if (user?.id) {
        // Customers see only their projects
        fetchedProjects = query
          ? await projectsService.searchByCustomerId(user.id, query)
          : await projectsService.getByCustomerId(user.id);
      } else {
        fetchedProjects = [];
      }

      setProjects(fetchedProjects.map(p => ({
        ...p,
        createdAt: p.created_at || '',
        updatedAt: p.updated_at || ''
      })));
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  }, [user]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== '') {
        setIsSearching(true);
        fetchProjects(searchQuery);
      } else {
        fetchProjects();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchProjects]);

  const clearSearch = () => {
    setSearchQuery('');
  };
  const handleStatusChange = (project: Project) => {
    setSelectedProject(project);
    setNewStatus(project.status);
    setShowStatusModal(true);
  };
  const saveStatusChange = async () => {
    if (selectedProject && newStatus) {
      try {
        await projectsService.update(selectedProject.id, { status: newStatus });
        setProjects(prev => prev.map(p => p.id === selectedProject.id ? {
          ...p,
          status: newStatus
        } : p));
        setShowStatusModal(false);
      } catch (error) {
        console.error('Error updating project status:', error);
        alert('Failed to update project status');
      }
    }
  };

  const handleDeleteProject = async () => {
    if (!showDeleteConfirm || !user?.id) return;

    try {
      await projectsService.softDelete(showDeleteConfirm.id, user.id);
      setProjects(prev => prev.filter(p => p.id !== showDeleteConfirm.id));
      setShowDeleteConfirm(null);
      alert('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
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

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by project name or code (e.g., SPRTN_123456)"
            className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
          {searchQuery && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={clearSearch}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        {isSearching && (
          <p className="mt-2 text-sm text-gray-500">Searching...</p>
        )}
        {searchQuery && !isSearching && (
          <p className="mt-2 text-sm text-gray-500">
            Found {projects.length} project{projects.length !== 1 ? 's' : ''} matching "{searchQuery}"
          </p>
        )}
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
                  <div className="mt-2 flex justify-between items-center">
                    {user?.role === 'admin' && (
                      <button onClick={() => handleStatusChange(project)} className="text-xs text-primary-600 hover:text-primary-800">
                        Change Status
                      </button>
                    )}
                    <button
                      onClick={() => setShowDeleteConfirm(project)}
                      className="text-xs text-red-500 hover:text-red-700 flex items-center ml-auto"
                    >
                      <Trash2Icon className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                  </div>
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Project</h3>
            <p className="text-sm text-gray-500 mb-2">
              Are you sure you want to delete <span className="font-medium">"{showDeleteConfirm.name}"</span>?
            </p>
            <p className="text-sm text-gray-500 mb-4">
              The project will be hidden from view but records will be kept for administrative purposes.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>;
};
export default Dashboard;