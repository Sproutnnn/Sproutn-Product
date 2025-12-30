import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, TruckIcon, PackageIcon, ClipboardCheckIcon, CheckCircleIcon, PlusIcon, SaveIcon, XIcon, CreditCardIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import AdminStatusControl from '../components/AdminStatusControl';
import StripePaymentModal from '../components/StripePaymentModal';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
import { paymentsService, PaymentType } from '../services/payments.service';
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
  const defaultTrackingEvents = [{
    date: new Date().toISOString().split('T')[0],
    title: 'Order Confirmed',
    description: 'Your order has been confirmed and sent to the manufacturer.',
    completed: false
  }, {
    date: '',
    title: 'Production Started',
    description: 'The manufacturer has started production of your order.',
    completed: false
  }, {
    date: '',
    title: 'Quality Control',
    description: 'Your products are undergoing quality control checks.',
    completed: false
  }, {
    date: '',
    title: 'Packaging',
    description: 'Your order is being packaged for shipping.',
    completed: false
  }, {
    date: '',
    title: 'Picked Up',
    description: 'Your order has been picked up by the shipping carrier.',
    completed: false
  }, {
    date: '',
    title: 'Shipped',
    description: 'Your order has been shipped and is on its way to you.',
    completed: false,
    trackingNumber: '',
    carrier: ''
  }, {
    date: '',
    title: 'Delivered',
    description: 'Your order has been delivered to the specified address.',
    completed: false
  }];

  const [trackingEvents, setTrackingEvents] = useState(defaultTrackingEvents);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState({
    trackingNumber: '',
    carrier: ''
  });
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('August 10, 2023');
  const [isEditingDeliveryDate, setIsEditingDeliveryDate] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentPaymentType, setCurrentPaymentType] = useState<PaymentType>('remaining');
  const [currentPaymentAmount, setCurrentPaymentAmount] = useState(0);
  const [currentPaymentTitle, setCurrentPaymentTitle] = useState('');
  // Admin cost settings
  const [qcCost, setQcCost] = useState(0);
  const [freightCost, setFreightCost] = useState(500);
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

        // Load estimated delivery date from project (parse as local date to avoid timezone shift)
        if (projectData.estimated_delivery) {
          const dateStr = projectData.estimated_delivery;
          // Parse as local date to avoid timezone issues
          let localDate: Date;
          if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateStr.split('-').map(Number);
            localDate = new Date(year, month - 1, day);
          } else {
            localDate = new Date(dateStr);
          }
          setEstimatedDeliveryDate(localDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }));
        }

        // Load tracking events from database
        if (projectData.tracking_events && projectData.tracking_events.length > 0) {
          setTrackingEvents(projectData.tracking_events);
        }

        // Load cost settings
        if (projectData.qc_cost !== undefined) {
          setQcCost(projectData.qc_cost || 0);
        }
        if (projectData.freight_cost !== undefined) {
          setFreightCost(projectData.freight_cost || 500);
        }
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

  const saveDeliveryDate = async () => {
    if (!id) return;

    try {
      await projectsService.update(id, {
        estimated_delivery: estimatedDeliveryDate
      });
      setIsEditingDeliveryDate(false);
      alert('Delivery date saved!');
    } catch (err) {
      console.error('Error saving delivery date:', err);
      alert('Failed to save delivery date.');
    }
  };

  const updateEventStatus = async (index: number) => {
    if (!id) return;

    const newEvents = [...trackingEvents];
    // Toggle completion status
    newEvents[index] = {
      ...newEvents[index],
      completed: !newEvents[index].completed
    };
    // If marking an event as complete, update its date to today
    if (!trackingEvents[index].completed) {
      newEvents[index].date = new Date().toISOString().split('T')[0];
    }

    // If this is the "Shipped" event and it's being marked as complete
    if (newEvents[index].title === 'Shipped' && !trackingEvents[index].completed) {
      setShowTrackingModal(true);
    }

    try {
      await projectsService.update(id, {
        tracking_events: newEvents
      });
      setTrackingEvents(newEvents);
    } catch (err) {
      console.error('Error updating tracking status:', err);
      alert('Failed to update status.');
    }
  };

  const handleTrackingInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    // Update the tracking information for the "Shipped" event
    const newEvents = [...trackingEvents];
    const shippedIndex = newEvents.findIndex(event => event.title === 'Shipped');
    if (shippedIndex !== -1) {
      newEvents[shippedIndex] = {
        ...newEvents[shippedIndex],
        trackingNumber: trackingInfo.trackingNumber,
        carrier: trackingInfo.carrier
      };
    }

    try {
      await projectsService.update(id, {
        tracking_events: newEvents,
        tracking_number: trackingInfo.trackingNumber
      });
      setTrackingEvents(newEvents);
      setShowTrackingModal(false);
      alert('Tracking information saved!');
    } catch (err) {
      console.error('Error saving tracking info:', err);
      alert('Failed to save tracking information.');
    }
  };

  const handlePayRemaining = () => {
    if (!project) return;
    const amounts = paymentsService.calculatePaymentAmounts(project);
    setCurrentPaymentType('remaining');
    setCurrentPaymentAmount(amounts.remaining);
    setCurrentPaymentTitle('Pay Remaining Balance');
    setShowPaymentModal(true);
  };

  const handlePayFreight = () => {
    if (!project) return;
    const amounts = paymentsService.calculatePaymentAmounts(project);
    setCurrentPaymentType('freight');
    setCurrentPaymentAmount(amounts.freight);
    setCurrentPaymentTitle('Pay Freight');
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    alert('Payment successful!');
    window.location.reload();
  };

  const handleSaveCosts = async () => {
    if (!id) return;
    try {
      await projectsService.update(id, {
        qc_cost: qcCost,
        freight_cost: freightCost
      });
      alert('Costs saved successfully!');
    } catch (err) {
      console.error('Error saving costs:', err);
      alert('Failed to save costs.');
    }
  };

  const paymentStatus = project ? paymentsService.getPaymentStatus(project) : null;
  const paymentAmounts = project ? paymentsService.calculatePaymentAmounts(project) : null;
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
      <ModuleNavigation project={project} />

      {/* Admin Status Control */}
      {user?.role === 'admin' && id && (
        <AdminStatusControl
          projectId={id}
          currentStatus={project.status}
        />
      )}

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
            {/* Timeline line - centered with h-16 icons (center at 8 = 32px) */}
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gray-200"></div>
            <div className="space-y-8">
              {trackingEvents.map((event, index) => <div key={index} className="relative flex items-start">
                  <div className={`flex items-center justify-center h-16 w-16 rounded-full border-2 ${event.completed ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'} z-10`}>
                    <div className="flex items-center justify-center">
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
                    {/* Pay Remaining button for Quality Control */}
                    {event.title === 'Quality Control' && user?.role === 'customer' && (
                      <div className="mt-3">
                        {paymentStatus?.remainingPaid ? (
                          <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-md">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Remaining Balance Paid
                          </span>
                        ) : (
                          <button
                            onClick={handlePayRemaining}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <CreditCardIcon className="h-4 w-4 mr-1" />
                            Pay Remaining Balance (${paymentAmounts?.remaining.toFixed(2) || '0.00'})
                          </button>
                        )}
                      </div>
                    )}
                    {/* Payment for Freight button for Packaging */}
                    {event.title === 'Packaging' && user?.role === 'customer' && (
                      <div className="mt-3">
                        {paymentStatus?.freightPaid ? (
                          <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 rounded-md">
                            <CheckCircleIcon className="h-4 w-4 mr-1" />
                            Freight Paid
                          </span>
                        ) : (
                          <button
                            onClick={handlePayFreight}
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            <CreditCardIcon className="h-4 w-4 mr-1" />
                            Pay Freight (${paymentAmounts?.freight.toFixed(2) || '0.00'})
                          </button>
                        )}
                      </div>
                    )}
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

          {/* Admin Cost Settings */}
          {user?.role === 'admin' && (
            <div className="mt-6 bg-gray-50 border rounded-md p-4">
              <h3 className="text-md font-medium text-gray-900 mb-4">Payment Amounts</h3>
              <p className="text-sm text-gray-500 mb-4">Set the costs that customers need to pay at each stage.</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">QC Cost ($)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={qcCost || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setQcCost(val === '' ? 0 : parseFloat(val) || 0);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 sm:text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Freight Cost ($)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={freightCost || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setFreightCost(val === '' ? 0 : parseFloat(val) || 0);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 sm:text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="500.00"
                  />
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={handleSaveCosts}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <SaveIcon className="h-4 w-4 mr-2" />
                  Save Costs
                </button>
              </div>
            </div>
          )}
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

      {/* Stripe Payment Modal */}
      {id && (
        <StripePaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          projectId={id}
          paymentType={currentPaymentType}
          amount={currentPaymentAmount}
          title={currentPaymentTitle}
          description={currentPaymentType === 'remaining' ? 'Pay the remaining 70% balance to proceed with shipping.' : 'Pay the freight cost for delivery of your order.'}
        />
      )}
    </div>;
};
export default Tracking;