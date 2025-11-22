import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, DownloadIcon, FileTextIcon, GlobeIcon, ExternalLinkIcon, CheckIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProjectSteps from '../components/ProjectSteps';
import ModuleNavigation from '../components/ModuleNavigation';
const Completed: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    id: '',
    name: '',
    status: 'completed' as const,
    createdAt: '',
    updatedAt: '',
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });
  const [deliverables, setDeliverables] = useState([{
    id: '1',
    name: 'Final Source Code',
    type: 'code',
    description: 'Complete source code repository with documentation',
    downloadUrl: '#',
    size: '24.5 MB'
  }, {
    id: '2',
    name: 'User Documentation',
    type: 'document',
    description: 'Comprehensive user guide and documentation',
    downloadUrl: '#',
    size: '3.2 MB'
  }, {
    id: '3',
    name: 'Admin Dashboard Access',
    type: 'access',
    description: 'Login credentials and access to the admin dashboard',
    url: 'https://admin.example.com'
  }, {
    id: '4',
    name: 'API Documentation',
    type: 'document',
    description: 'Complete API reference and integration guide',
    downloadUrl: '#',
    size: '1.8 MB'
  }, {
    id: '5',
    name: 'Database Schema',
    type: 'document',
    description: 'Database structure and relationships documentation',
    downloadUrl: '#',
    size: '1.1 MB'
  }]);
  const [projectSummary, setProjectSummary] = useState({
    startDate: '2023-05-15',
    completionDate: '2023-10-20',
    totalDuration: '5 months',
    keyAchievements: ['Successfully implemented all core features', 'Achieved 99.9% uptime during beta testing', 'Optimized loading speed by 45%', 'Implemented secure payment processing', 'Created responsive design for all device types'],
    nextSteps: 'Consider ongoing maintenance and future feature development to keep your product competitive and secure.'
  });
  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setProject({
        id: id || '1',
        name: 'E-Commerce Platform',
        status: 'completed',
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-10-20T14:45:00Z',
        customer: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      });
      setLoading(false);
    }, 500);
  }, [id]);
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  const handleMoveToMaintenance = () => {
    navigate(`/project/${id}/maintenance`);
  };
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>;
  }
  return <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <ProjectSteps currentStep={project.status} />
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Project Completed</p>
        </div>
      </div>
      {/* Module Navigation */}
      <ModuleNavigation project={project} />
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Project Completion
          </h2>
          <p className="text-sm text-gray-500">
            Congratulations! Your project has been successfully completed.
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {/* Completion Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium text-green-800 mb-2">
                Project Successfully Completed!
              </h3>
              <p className="text-green-700">
                All deliverables have been finalized and are ready for your use.
              </p>
              <div className="mt-4 flex justify-center">
                <div className="inline-flex items-center px-4 py-2 bg-white border border-green-300 rounded-md text-sm font-medium text-green-700">
                  <span className="mr-2">Completed on:</span>
                  <span className="font-bold">
                    {formatDate(project.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
            {/* Project Summary */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Project Summary
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-white rounded-md border border-gray-200">
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-lg font-medium">
                      {formatDate(projectSummary.startDate)}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-md border border-gray-200">
                    <p className="text-sm text-gray-500">Completion Date</p>
                    <p className="text-lg font-medium">
                      {formatDate(projectSummary.completionDate)}
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-md border border-gray-200">
                    <p className="text-sm text-gray-500">Total Duration</p>
                    <p className="text-lg font-medium">
                      {projectSummary.totalDuration}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-900 mb-2">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {projectSummary.keyAchievements.map((achievement, index) => <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{achievement}</span>
                        </li>)}
                  </ul>
                </div>
                {user?.role === 'admin' && <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      Edit Project Summary
                    </button>
                  </div>}
              </div>
            </div>
            {/* Deliverables */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Project Deliverables
              </h3>
              <div className="space-y-3">
                {deliverables.map(deliverable => <div key={deliverable.id} className="bg-white border rounded-md p-4 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1 mb-3 md:mb-0">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-md bg-primary-100 flex items-center justify-center mr-3">
                          <FileTextIcon className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="text-md font-medium text-gray-900">
                            {deliverable.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {deliverable.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {deliverable.type === 'access' ? <a href={deliverable.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                          <GlobeIcon className="h-4 w-4 mr-2 text-gray-500" />
                          Access
                          <ExternalLinkIcon className="h-3 w-3 ml-1 text-gray-400" />
                        </a> : <>
                          <span className="text-sm text-gray-500">
                            {deliverable.size}
                          </span>
                          <a href={deliverable.downloadUrl} className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                            <DownloadIcon className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </>}
                    </div>
                  </div>)}
              </div>
            </div>
            {/* Next Steps */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Next Steps
              </h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-700 mb-4">{projectSummary.nextSteps}</p>
                <button onClick={handleMoveToMaintenance} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                  Explore Maintenance Options
                </button>
              </div>
            </div>
            {/* Final Notes */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Final Notes
              </h3>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <p className="text-gray-700">
                  Thank you for choosing our services for your project. We hope
                  you're satisfied with the final result and look forward to
                  potentially working with you on future projects or maintenance
                  needs.
                </p>
                <p className="text-gray-700 mt-2">
                  If you have any questions about the deliverables or need
                  assistance with anything, please don't hesitate to contact our
                  support team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Completed;