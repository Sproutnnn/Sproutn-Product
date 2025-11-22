import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, BeakerIcon, UploadIcon, UserIcon, BugIcon, ListChecksIcon, MessageCircleIcon } from 'lucide-react';
import ProjectSteps from '../components/ProjectSteps';
import { useAuth } from '../context/AuthContext';
const BetaTesting: React.FC = () => {
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
    status: 'beta-testing' as const,
    testingStatus: 'planning' as 'planning' | 'recruitment' | 'in-progress' | 'analysis' | 'completed',
    createdAt: '',
    updatedAt: ''
  });
  const [testPlan, setTestPlan] = useState({
    objectives: '',
    methodology: '',
    timeline: '',
    successCriteria: ''
  });
  const [testers, setTesters] = useState([{
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    status: 'invited'
  }, {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    status: 'active'
  }, {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    status: 'completed'
  }]);
  const [bugs, setBugs] = useState([{
    id: '1',
    title: 'Login button not working on Safari',
    severity: 'high',
    status: 'open',
    reportedBy: 'Bob Smith',
    reportedAt: '2023-06-15T10:30:00Z'
  }, {
    id: '2',
    title: 'Images not loading on mobile devices',
    severity: 'medium',
    status: 'in-progress',
    reportedBy: 'Alice Johnson',
    reportedAt: '2023-06-16T14:45:00Z'
  }, {
    id: '3',
    title: 'Typo on checkout page',
    severity: 'low',
    status: 'resolved',
    reportedBy: 'Carol Davis',
    reportedAt: '2023-06-17T09:20:00Z'
  }]);
  const [feedback, setFeedback] = useState('');
  const [testingNotes, setTestingNotes] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      const mockProject = {
        id: id || '1',
        name: 'E-Commerce Platform',
        status: 'beta-testing' as const,
        testingStatus: 'in-progress' as const,
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
  const handleTestingNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTestingNotes(e.target.value);
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
  const handleTestPlanChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setTestPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleTestPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the test plan to an API
    alert('Test plan updated successfully!');
  };
  const handleCompleteTestingPhase = () => {
    // In a real app, this would update the project status via API
    navigate(`/project/${id}/mvp`);
  };
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-800">
            High
          </span>;
      case 'medium':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            Medium
          </span>;
      case 'low':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Low
          </span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Unknown
          </span>;
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Open
          </span>;
      case 'in-progress':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            In Progress
          </span>;
      case 'resolved':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Resolved
          </span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Unknown
          </span>;
    }
  };
  const getTesterStatusBadge = (status: string) => {
    switch (status) {
      case 'invited':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            Invited
          </span>;
      case 'active':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Active
          </span>;
      case 'completed':
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
            Completed
          </span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Unknown
          </span>;
    }
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
          <p className="text-sm text-gray-500 mt-1">Beta Testing Phase</p>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Beta Testing Status
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Current Status:{' '}
                    <span className="font-medium capitalize">
                      {project.testingStatus.replace('-', ' ')}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {/* Test Plan Section */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-900 mb-4">
                Test Plan
              </h3>
              {user?.role === 'admin' ? <form onSubmit={handleTestPlanSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="objectives" className="block text-sm font-medium text-gray-700 mb-1">
                      Testing Objectives
                    </label>
                    <textarea id="objectives" name="objectives" rows={3} value={testPlan.objectives} onChange={handleTestPlanChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="What are the goals of this testing phase?" />
                  </div>
                  <div>
                    <label htmlFor="methodology" className="block text-sm font-medium text-gray-700 mb-1">
                      Testing Methodology
                    </label>
                    <textarea id="methodology" name="methodology" rows={3} value={testPlan.methodology} onChange={handleTestPlanChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="How will the testing be conducted?" />
                  </div>
                  <div>
                    <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-1">
                      Timeline
                    </label>
                    <textarea id="timeline" name="timeline" rows={2} value={testPlan.timeline} onChange={handleTestPlanChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="What is the timeline for testing?" />
                  </div>
                  <div>
                    <label htmlFor="successCriteria" className="block text-sm font-medium text-gray-700 mb-1">
                      Success Criteria
                    </label>
                    <textarea id="successCriteria" name="successCriteria" rows={3} value={testPlan.successCriteria} onChange={handleTestPlanChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="What defines a successful beta test?" />
                  </div>
                  <div className="flex justify-end">
                    <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      Save Test Plan
                    </button>
                  </div>
                </form> : <div className="space-y-4 bg-gray-50 p-4 rounded-md">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Testing Objectives
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {testPlan.objectives || 'Identify usability issues, validate core features, and gather user feedback on the interface and functionality.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Testing Methodology
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {testPlan.methodology || 'Closed beta with selected users representing our target audience. Users will be given specific tasks to complete and provide feedback through surveys and interviews.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Timeline
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {testPlan.timeline || '2 weeks (June 15 - June 29, 2023)'}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">
                      Success Criteria
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {testPlan.successCriteria || '90% task completion rate, no critical bugs, and positive user satisfaction scores (>7/10) for core features.'}
                    </p>
                  </div>
                </div>}
            </div>
            {/* Beta Testers Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-900">
                  Beta Testers
                </h3>
                {user?.role === 'admin' && <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600">
                    <UserIcon className="h-4 w-4 mr-1" />
                    Add Tester
                  </button>}
              </div>
              <div className="bg-white border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
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
                    {testers.map(tester => <tr key={tester.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {tester.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {tester.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getTesterStatusBadge(tester.status)}
                        </td>
                        {user?.role === 'admin' && <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">
                              Edit
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
            {/* Bug Reports Section */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-medium text-gray-900">
                  Bug Reports
                </h3>
                {user?.role === 'customer' && <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600">
                    <BugIcon className="h-4 w-4 mr-1" />
                    Report Bug
                  </button>}
              </div>
              <div className="bg-white border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Severity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reported By
                      </th>
                      {user?.role === 'admin' && <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bugs.map(bug => <tr key={bug.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {bug.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getSeverityBadge(bug.severity)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getStatusBadge(bug.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {bug.reportedBy}
                        </td>
                        {user?.role === 'admin' && <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-primary-600 hover:text-primary-900 mr-3">
                              Update
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              Resolve
                            </button>
                          </td>}
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </div>
            {/* Feedback and Notes Section */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              {user?.role === 'customer' ? <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Provide Feedback
                  </h3>
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Feedback
                      </label>
                      <textarea id="feedback" name="feedback" rows={4} value={feedback} onChange={handleFeedbackChange} placeholder="Share your experience with the beta version. What worked well? What needs improvement?" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Upload Screenshots
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <input type="file" multiple accept="image/*" className="hidden" id="beta-files" onChange={handleFileChange} />
                        <label htmlFor="beta-files" className="cursor-pointer flex flex-col items-center justify-center">
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
                        <MessageCircleIcon className="mr-2 h-4 w-4" />
                        Submit Feedback
                      </button>
                    </div>
                  </form>
                </div> : <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Testing Notes
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <textarea id="testingNotes" name="testingNotes" rows={4} value={testingNotes} onChange={handleTestingNotesChange} placeholder="Add notes about the beta testing progress, issues to address, or next steps..." className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div className="flex justify-end">
                      <button type="button" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        Save Notes
                      </button>
                    </div>
                  </form>
                </div>}
            </div>
            {/* Complete Testing Section */}
            {user?.role === 'admin' && <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="text-md font-medium text-green-800 mb-2">
                    Ready to Complete Beta Testing?
                  </h3>
                  <p className="text-sm text-green-700 mb-4">
                    Once you complete beta testing, the project will move to the
                    MVP phase.
                  </p>
                  <div className="flex items-center">
                    <ListChecksIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm text-green-700">
                      All critical issues have been addressed
                    </span>
                  </div>
                  <button onClick={handleCompleteTestingPhase} className="mt-4 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Complete Beta Testing
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
    </div>;
};
export default BetaTesting;