import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TruckIcon, PackageIcon, ClipboardCheckIcon, CheckCircleIcon, PlusIcon, SaveIcon, XIcon } from 'lucide-react';
import ProjectSteps from '../components/ProjectSteps';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
const Tracking: React.FC = () => {
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
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [trackingEvents, setTrackingEvents] = useState([{
    date: '2023-06-15',
    title: 'Order Confirmed',
    description: 'Your order has been confirmed and sent to the manufacturer.',
    completed: true
  }, {
    date: '2023-06-20',
    title: 'Production Started',
    description: 'The manufacturer has started production of your order.',
    completed: true
  }, {
    date: '2023-07-10',
    title: 'Quality Control',
    description: 'Your products are undergoing quality control checks.',
    completed: false
  }, {
    date: '2023-07-20',
    title: 'Packaging',
    description: 'Your order is being packaged for shipping.',
    completed: false
  }, {
    date: '2023-07-22',
    title: 'Picked Up',
    description: 'Your order has been picked up by the shipping carrier.',
    completed: false
  }, {
    date: '2023-07-25',
    title: 'Shipped',
    description: 'Your order has been shipped and is on its way to you.',
    completed: false,
    trackingNumber: '',
    carrier: ''
  }, {
    date: '2023-08-10',
    title: 'Delivered',
    description: 'Your order has been delivered to the specified address.',
    completed: false
  }]);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({
    trackingNumber: '',
    carrier: ''
  });
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('August 10, 2023');
  const [isEditingDeliveryDate, setIsEditingDeliveryDate] = useState(false);
  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const projectData = await projectsService.getById(id);

        if (!projectData) {
          setError('Project not found');
          return;
        }

        setProject(projectData);

        // Load estimated delivery date from project
        if (projectData.estimated_delivery) {
          setEstimatedDeliveryDate(new Date(projectData.estimated_delivery).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }));
        }

        // TODO: Load tracking events from database when migration is ready
        // For now, tracking events use mock data
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);
  const handleDeliveryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEstimatedDeliveryDate(e.target.value);
  };
  const saveDeliveryDate = () => {
    setIsEditingDeliveryDate(false);
    // In a real app, you would save this to the backend
  };
  const updateEventStatus = (index: number) => {
    setTrackingEvents(prev => {
      const newEvents = [...prev];
      // Toggle completion status
      newEvents[index] = {
        ...newEvents[index],
        completed: !newEvents[index].completed
      };
      // If marking an event as complete, update its date to today
      if (!prev[index].completed) {
        newEvents[index].date = new Date().toISOString().split('T')[0];
      }
      // If this is the "Shipped" event and it's being marked as complete
      if (newEvents[index].title === 'Shipped' && !prev[index].completed) {
        setShowTrackingModal(true);
      }
      return newEvents;
    });
  };
  const handleTrackingInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the tracking information for the "Shipped" event
    setTrackingEvents(prev => {
      const newEvents = [...prev];
      const shippedIndex = newEvents.findIndex(event => event.title === 'Shipped');
      if (shippedIndex !== -1) {
        newEvents[shippedIndex] = {
          ...newEvents[shippedIndex],
          trackingNumber: trackingInfo.trackingNumber,
          carrier: trackingInfo.carrier
        };
      }
      return newEvents;
    });
    setShowTrackingModal(false);
  };
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>;
  }

  if (error || !project) {
    return <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error || 'Project not found'}</div>
      </div>;
  }
  const getStatusIcon = (index: number, completed: boolean) => {
    if (index === 0) return <ClipboardCheckIcon className={`h-6 w-6 ${completed ? 'text-green-500' : 'text-gray-400'}`} />;
    if (index === 1) return <PackageIcon className={`h-6 w-6 ${completed ? 'text-green-500' : 'text-gray-400'}`} />;
    if (index === 4 || index === 5) return <TruckIcon className={`h-6 w-6 ${completed ? 'text-green-500' : 'text-gray-400'}`} />;
    return <CheckCircleIcon className={`h-6 w-6 ${completed ? 'text-green-500' : 'text-gray-400'}`} />;
  };
  return <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <ProjectSteps currentStep={project.status} />
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Order Tracking</p>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            Production & Shipping Status
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-9 top-0 h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {trackingEvents.map((event, index) => <div key={index} className="relative flex items-start">
                  <div className={`flex items-center justify-center h-18 w-18 rounded-full border-2 ${event.completed ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'} z-10`}>
                    <div className="p-2">
                      {getStatusIcon(index, event.completed)}
                    </div>
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {event.title}
                      </div>
                      {user?.role === 'admin' && <button onClick={() => updateEventStatus(index)} className={`text-xs px-2 py-1 rounded ${event.completed ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                          {event.completed ? 'Mark Incomplete' : 'Mark Complete'}
                        </button>}
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      {event.description}
                    </div>
                    {event.title === 'Shipped' && 'trackingNumber' in event && event.trackingNumber && <div className="mt-1 text-sm">
                          <span className="font-medium">Tracking: </span>
                          <span className="text-blue-600">
                            {event.trackingNumber}
                          </span>
                          {event.carrier && <span className="ml-2 text-gray-500">
                              ({event.carrier})
                            </span>}
                        </div>}
                    <div className={`mt-1 text-xs ${event.completed ? 'text-green-600' : 'text-gray-400'}`}>
                      {event.completed ? 'Completed' : 'Expected'}: {event.date}
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          <div className="mt-8 bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    Estimated delivery date: {estimatedDeliveryDate}. You will
                    receive email updates as your order progresses.
                  </p>
                </div>
              </div>
              {user?.role === 'admin' && !isEditingDeliveryDate && <button onClick={() => setIsEditingDeliveryDate(true)} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Edit
                </button>}
            </div>
            {user?.role === 'admin' && isEditingDeliveryDate && <div className="mt-2 flex items-center">
                <input type="text" value={estimatedDeliveryDate} onChange={handleDeliveryDateChange} className="border border-gray-300 rounded-md py-1 px-2 text-sm w-40 mr-2" />
                <button onClick={saveDeliveryDate} className="bg-blue-600 text-white text-xs px-2 py-1 rounded hover:bg-blue-700">
                  Save
                </button>
              </div>}
          </div>
        </div>
      </div>
      {/* Tracking Information Modal */}
      {showTrackingModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Add Tracking Information
              </h3>
              <button onClick={() => setShowTrackingModal(false)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleTrackingInfoSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
                    Tracking Number
                  </label>
                  <input type="text" id="trackingNumber" value={trackingInfo.trackingNumber} onChange={e => setTrackingInfo({
                ...trackingInfo,
                trackingNumber: e.target.value
              })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Enter tracking number" required />
                </div>
                <div>
                  <label htmlFor="carrier" className="block text-sm font-medium text-gray-700">
                    Carrier
                  </label>
                  <input type="text" id="carrier" value={trackingInfo.carrier} onChange={e => setTrackingInfo({
                ...trackingInfo,
                carrier: e.target.value
              })} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="e.g., FedEx, UPS, DHL" />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={() => setShowTrackingModal(false)} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600">
                  <SaveIcon className="h-4 w-4 inline mr-1" />
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
export default Tracking;