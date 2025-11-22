import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, PencilRulerIcon, UploadIcon, MessageCircleIcon, MonitorIcon, SmartphoneIcon, TabletIcon, ImageIcon, ThumbsUpIcon } from 'lucide-react';
import ProjectSteps from '../components/ProjectSteps';
import ModuleNavigation from '../components/ModuleNavigation';
import { useAuth } from '../context/AuthContext';
const Design: React.FC = () => {
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
    status: 'design' as const,
    designStatus: 'ui-visuals' as 'ui-visuals' | 'feedback' | 'final-ui',
    createdAt: '',
    updatedAt: '',
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });
  const [designFiles, setDesignFiles] = useState<File[]>([]);
  const [feedback, setFeedback] = useState('');
  const [adminData, setAdminData] = useState({
    designStatus: 'ui-visuals' as 'ui-visuals' | 'feedback' | 'final-ui',
    notes: ''
  });
  const [designLinks, setDesignLinks] = useState({
    uiVisuals: '',
    finalUI: ''
  });
  const [activeTab, setActiveTab] = useState('desktop');
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      const mockProject = {
        id: id || '1',
        name: 'E-Commerce Platform',
        status: 'design' as const,
        designStatus: 'ui-visuals' as const,
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-05-20T14:45:00Z',
        customer: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      };
      setProject(mockProject);
      setLoading(false);
    }, 500);
  }, [id]);
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };
  const handleDesignFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDesignFiles(Array.from(e.target.files));
    }
  };
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the feedback and files to an API
    console.log('Feedback submitted:', {
      feedback,
      files: designFiles
    });
    // Clear the form
    setFeedback('');
    setDesignFiles([]);
    // Optionally show a success message
    alert('Feedback submitted successfully!');
    // Update the design status to 'feedback'
    setProject(prev => ({
      ...prev,
      designStatus: 'feedback'
    }));
  };
  const handleAdminChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setAdminData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleDesignLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setDesignLinks(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    // Update the design status
    setProject(prev => ({
      ...prev,
      designStatus: adminData.designStatus
    }));
    // If status is final-ui, show success message
    if (adminData.designStatus === 'final-ui') {
      alert('Design finalized! Ready to move to beta testing.');
    } else {
      alert('Design status updated successfully!');
    }
  };
  const handleMoveToNextPhase = () => {
    navigate(`/project/${id}/beta-testing`);
  };
  // Design process steps
  const designSteps = [{
    id: 'ui-visuals',
    label: 'UI Visuals',
    icon: <ImageIcon className="h-5 w-5" />
  }, {
    id: 'feedback',
    label: 'Feedback',
    icon: <MessageCircleIcon className="h-5 w-5" />
  }, {
    id: 'final-ui',
    label: 'Final UI',
    icon: <ThumbsUpIcon className="h-5 w-5" />
  }];
  const getCurrentStepIndex = () => {
    return designSteps.findIndex(step => step.id === project.designStatus);
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
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Design Phase</p>
        </div>
      </div>
      {/* Module Navigation */}
      <ModuleNavigation project={project} />
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Design</h2>
          <p className="text-sm text-gray-500">
            User interface design for your product
          </p>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Design Status
            </h2>
            {/* Step Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between w-full">
                {designSteps.map((step, index) => {
                const currentStepIndex = getCurrentStepIndex();
                const isActive = index <= currentStepIndex;
                const isCompleted = index < currentStepIndex;
                return <Fragment key={step.id}>
                      {/* Step circle */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full 
                              ${isActive ? 'bg-primary-50' : 'bg-gray-100'}`}>
                            {isCompleted ? <CheckIcon className="h-5 w-5 text-primary-600" /> : <div className={`${isActive ? 'text-primary-600' : 'text-gray-400'}`}>
                                {step.icon}
                              </div>}
                          </div>
                          <span className={`mt-2 text-xs block text-center w-24 -ml-7
                              ${isActive ? index === currentStepIndex ? 'text-primary-600 font-medium' : 'text-charcoal-500' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                        </div>
                      </div>
                      {/* Connector line */}
                      {index < designSteps.length - 1 && <div className="flex-1 h-1 mx-2">
                          <div className={`h-full ${index < currentStepIndex ? 'bg-primary-500' : 'bg-gray-200'}`} />
                        </div>}
                    </Fragment>;
              })}
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Current Status:{' '}
                    <span className="font-medium capitalize">
                      {project.designStatus.replace('-', ' ')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {user?.role === 'admin' && <form onSubmit={handleAdminSubmit} className="border rounded-md p-4 bg-gray-50 mb-8">
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Update Design Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="designStatus" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select id="designStatus" name="designStatus" value={adminData.designStatus} onChange={handleAdminChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                      <option value="ui-visuals">UI Visuals</option>
                      <option value="feedback">Feedback</option>
                      <option value="final-ui">Final UI</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="uiVisuals" className="block text-sm font-medium text-gray-700">
                      UI Visuals Link (Figma, Adobe XD, etc.)
                    </label>
                    <input type="text" name="uiVisuals" id="uiVisuals" value={designLinks.uiVisuals} onChange={handleDesignLinkChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="https://figma.com/..." />
                  </div>
                  <div>
                    <label htmlFor="finalUI" className="block text-sm font-medium text-gray-700">
                      Final UI Link
                    </label>
                    <input type="text" name="finalUI" id="finalUI" value={designLinks.finalUI} onChange={handleDesignLinkChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="https://figma.com/..." />
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes for Client
                    </label>
                    <textarea name="notes" id="notes" rows={3} value={adminData.notes} onChange={handleAdminChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Any additional information about the design" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Update Status
                  </button>
                </div>
              </form>}
          </div>
          {/* Design Preview Section */}
          {(designLinks.uiVisuals || designLinks.finalUI) && <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Design Preview
              </h2>
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button onClick={() => setActiveTab('desktop')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'desktop' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      <MonitorIcon className="h-5 w-5 inline-block mr-2" />
                      Desktop
                    </button>
                    <button onClick={() => setActiveTab('tablet')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'tablet' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      <TabletIcon className="h-5 w-5 inline-block mr-2" />
                      Tablet
                    </button>
                    <button onClick={() => setActiveTab('mobile')} className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${activeTab === 'mobile' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      <SmartphoneIcon className="h-5 w-5 inline-block mr-2" />
                      Mobile
                    </button>
                  </nav>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center min-h-[400px]">
                    {project.designStatus === 'final-ui' ? designLinks.finalUI ? <div className="text-center">
                          <p className="text-sm text-gray-500 mb-2">
                            Final UI designs are available for review
                          </p>
                          <a href={designLinks.finalUI} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600">
                            View Final UI
                          </a>
                        </div> : <p className="text-gray-500">
                          Final UI designs are being prepared
                        </p> : designLinks.uiVisuals ? <div className="text-center">
                        <p className="text-sm text-gray-500 mb-2">
                          UI designs are available for review
                        </p>
                        <a href={designLinks.uiVisuals} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600">
                          View UI Designs
                        </a>
                      </div> : <p className="text-gray-500">
                        UI designs are being prepared
                      </p>}
                  </div>
                  {adminData.notes && <div className="mt-4 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
                      <h4 className="text-sm font-medium text-yellow-800 mb-1">
                        Notes from Designer:
                      </h4>
                      <p className="text-sm text-yellow-700">
                        {adminData.notes}
                      </p>
                    </div>}
                </div>
              </div>
            </div>}
          {/* Feedback Section for Customers */}
          {user?.role === 'customer' && project.designStatus !== 'final-ui' && <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Design Feedback
              </h2>
              <div className="bg-white border rounded-md p-4">
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Feedback
                    </label>
                    <textarea id="feedback" name="feedback" rows={4} value={feedback} onChange={handleFeedbackChange} placeholder="Share your thoughts on the design. What works well? What needs adjustment?" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Annotated Screenshots
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Share screenshots with annotations to better explain your
                      feedback
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input type="file" multiple accept="image/*" className="hidden" id="design-files" onChange={handleDesignFileUpload} />
                      <label htmlFor="design-files" className="cursor-pointer flex flex-col items-center justify-center">
                        <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload files
                        </p>
                      </label>
                    </div>
                    {designFiles.length > 0 && <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Uploaded Files ({designFiles.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {designFiles.map((file, index) => <div key={index} className="border rounded-md p-2 flex items-center">
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
                      <MessageCircleIcon className="mr-2 h-4 w-4" />
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>
            </div>}
          {/* Final UI Approval and Next Steps */}
          {project.designStatus === 'final-ui' && <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-md font-medium text-green-800 mb-2">
                Final UI Designs Approved
              </h3>
              <p className="text-sm text-green-700 mb-4">
                The UI designs have been finalized and approved. We're ready to
                move forward to the beta testing phase.
              </p>
              <button onClick={handleMoveToNextPhase} className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <ArrowRightIcon className="mr-2 h-4 w-4" />
                Proceed to Beta Testing
              </button>
            </div>}
        </div>
      </div>
    </div>;
};
export default Design;