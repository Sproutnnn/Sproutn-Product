import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PackageIcon, UploadIcon, ServerIcon, GitBranchIcon, GlobeIcon, DownloadIcon } from 'lucide-react';
import ProjectSteps from '../components/ProjectSteps';
import { useAuth } from '../context/AuthContext';
const MVP: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    id: '',
    name: '',
    status: 'mvp' as const,
    mvpStatus: 'development' as 'development' | 'qa' | 'staging' | 'ready' | 'launched',
    createdAt: '',
    updatedAt: ''
  });
  const [deploymentDetails, setDeploymentDetails] = useState({
    environment: 'staging',
    url: 'https://staging-ecommerce-platform.example.com',
    version: 'v0.9.0',
    lastDeployed: '2023-06-20T15:30:00Z',
    notes: ''
  });
  const [features, setFeatures] = useState([{
    id: '1',
    name: 'User Authentication',
    status: 'completed'
  }, {
    id: '2',
    name: 'Product Catalog',
    status: 'completed'
  }, {
    id: '3',
    name: 'Shopping Cart',
    status: 'completed'
  }, {
    id: '4',
    name: 'Checkout Process',
    status: 'in-progress'
  }, {
    id: '5',
    name: 'Payment Integration',
    status: 'pending'
  }, {
    id: '6',
    name: 'Order Management',
    status: 'pending'
  }]);
  const [feedback, setFeedback] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      const mockProject = {
        id: id || '1',
        name: 'E-Commerce Platform',
        status: 'mvp' as const,
        mvpStatus: 'staging' as const,
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-05-20T14:45:00Z'
      };
      setProject(mockProject);
      setLoading(false);
    }, 500);
  }, [id]);
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files));
    }
  };
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the feedback and files to an API
    console.log('Feedback submitted:', {
      feedback,
      files: uploadedFiles
    });
    // Clear the form
    setFeedback('');
    setUploadedFiles([]);
    // Optionally show a success message
    alert('Feedback submitted successfully!');
  };
  const handleDeploymentNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeploymentDetails(prev => ({
      ...prev,
      notes: e.target.value
    }));
  };
  const handleSaveDeploymentNotes = () => {
    // In a real app, this would send the notes to an API
    alert('Deployment notes saved successfully!');
  };
  const handleMoveToMarketing = () => {
    // In a real app, this would update the project status via API
    navigate(`/project/${id}/marketing`);
  };
  const getFeatureStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Completed
          </span>;
      case 'in-progress':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            In Progress
          </span>;
      case 'pending':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Pending
          </span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Unknown
          </span>;
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>;
  }
  return <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <ProjectSteps currentStep={project.status} />
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Minimum Viable Product (MVP)
          </p>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              MVP Status
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Current Status:{' '}
                    <span className="font-medium capitalize">
                      {project.mvpStatus.replace('-', ' ')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* Deployment Information */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Deployment Information
              </h3>
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Environment
                    </h4>
                    <div className="flex items-center mt-1">
                      <ServerIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900 capitalize">
                        {deploymentDetails.environment}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Version
                    </h4>
                    <div className="flex items-center mt-1">
                      <GitBranchIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {deploymentDetails.version}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">URL</h4>
                    <div className="flex items-center mt-1">
                      <GlobeIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <a href={deploymentDetails.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-800">
                        {deploymentDetails.url}
                      </a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Last Deployed
                    </h4>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-900">
                        {formatDate(deploymentDetails.lastDeployed)}
                      </span>
                    </div>
                  </div>
                </div>
                {user?.role === 'admin' && <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Deployment Notes
                    </h4>
                    <textarea rows={3} value={deploymentDetails.notes} onChange={handleDeploymentNotesChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Add notes about this deployment..." />
                    <div className="mt-2 flex justify-end">
                      <button onClick={handleSaveDeploymentNotes} className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600">
                        Save Notes
                      </button>
                    </div>
                  </div>}
              </div>
            </div>
            {/* Feature Status */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-900">
                  MVP Features
                </h3>
                {user?.role === 'admin' && <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600">
                    Add Feature
                  </button>}
              </div>
              <div className="bg-white border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feature
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      {user?.role === 'admin' && <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {features.map(feature => <tr key={feature.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {feature.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getFeatureStatusBadge(feature.status)}
                        </td>
                        {user?.role === 'admin' && <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">
                              Update
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              Remove
                            </button>
                          </td>}
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Documentation Section */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Documentation & Resources
              </h3>
              <div className="bg-white border rounded-md p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-800">
                            PDF
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          User Manual
                        </h4>
                        <p className="text-xs text-gray-500">
                          Updated: June 15, 2023
                        </p>
                      </div>
                    </div>
                    <button className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      <DownloadIcon className="h-3 w-3 mr-1" />
                      Download
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-green-800">
                            DOC
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          API Documentation
                        </h4>
                        <p className="text-xs text-gray-500">
                          Updated: June 18, 2023
                        </p>
                      </div>
                    </div>
                    <button className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      <DownloadIcon className="h-3 w-3 mr-1" />
                      Download
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-purple-800">
                            VID
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">
                          Demo Video
                        </h4>
                        <p className="text-xs text-gray-500">
                          Updated: June 20, 2023
                        </p>
                      </div>
                    </div>
                    <button className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                      <DownloadIcon className="h-3 w-3 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Feedback Section */}
            {user?.role === 'customer' && <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Provide MVP Feedback
                </h3>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Feedback
                    </label>
                    <textarea id="feedback" name="feedback" rows={4} value={feedback} onChange={handleFeedbackChange} placeholder="Share your thoughts on the MVP. What features work well? What needs improvement before launch?" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Screenshots
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input type="file" multiple accept="image/*" className="hidden" id="mvp-files" onChange={handleFileChange} />
                      <label htmlFor="mvp-files" className="cursor-pointer flex flex-col items-center justify-center">
                        <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload files
                        </p>
                      </label>
                    </div>
                    {uploadedFiles.length > 0 && <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Uploaded Files ({uploadedFiles.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {uploadedFiles.map((file, index) => <div key={index} className="border rounded-md p-2 flex items-center">
                              <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                                <span className="text-xs text-gray-500">
                                  IMG
                                </span>
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-gray-900 truncate">
                                  {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {(file.size / 1024).toFixed(1)} KB
                                </p>
                              </div>
                            </div>)}
                        </div>
                      </div>}
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>}
            {/* Move to Marketing Section */}
            {user?.role === 'admin' && <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-md font-medium text-green-800 mb-2">
                    Ready to Move to Marketing?
                  </h3>
                  <p className="text-sm text-green-700 mb-4">
                    Once the MVP is approved, we can begin planning the
                    marketing strategy for launch.
                  </p>
                  <button onClick={handleMoveToMarketing} className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <ArrowRightIcon className="mr-2 h-4 w-4" />
                    Move to Marketing Phase
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default MVP;