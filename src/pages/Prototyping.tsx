import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, BoxIcon, MapPinIcon, CameraIcon, MessageCircleIcon, ImageIcon, DownloadIcon, XIcon, TruckIcon, RefreshCwIcon, CreditCardIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import AdminStatusControl from '../components/AdminStatusControl';
import StripePaymentModal from '../components/StripePaymentModal';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
import { supabase } from '../lib/supabase';
import { FeedbackThreadList } from '../components/feedback';
const Prototyping: React.FC = () => {
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
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phoneNumber: ''
  });
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [adminData, setAdminData] = useState({
    prototypeStatus: 'producing' as 'producing' | 'shipping' | 'delivered' | 'feedback',
    trackingNumber: '',
    estimatedDelivery: '',
    notes: ''
  });
  const [feedback, setFeedback] = useState('');
  const [feedbackImages, setFeedbackImages] = useState<File[]>([]);

  // Sample payment state
  const [showSamplePaymentModal, setShowSamplePaymentModal] = useState(false);
  const [samplePaymentComplete, setSamplePaymentComplete] = useState(false);
  const [samplePrice, setSamplePrice] = useState(0);

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

        // Load delivery address if it exists
        if (projectData.delivery_full_name) {
          setDeliveryAddress({
            fullName: projectData.delivery_full_name || '',
            addressLine1: projectData.delivery_address_line1 || '',
            addressLine2: projectData.delivery_address_line2 || '',
            city: projectData.delivery_city || '',
            state: projectData.delivery_state || '',
            zipCode: projectData.delivery_zip_code || '',
            country: projectData.delivery_country || '',
            phoneNumber: projectData.delivery_phone_number || ''
          });
          setAddressSubmitted(true);
        }

        // Load admin data if it exists
        if (projectData.prototype_status) {
          setAdminData({
            prototypeStatus: projectData.prototype_status as any,
            trackingNumber: projectData.tracking_number || '',
            estimatedDelivery: projectData.estimated_delivery || '',
            notes: projectData.admin_notes || ''
          });
        }

        // Load feedback if it exists
        if (projectData.customer_feedback) {
          setFeedback(projectData.customer_feedback);
        }

        // Load sample payment status
        if (projectData.sample_payment_complete) {
          setSamplePaymentComplete(true);
        }
        if (projectData.sample_price) {
          setSamplePrice(projectData.sample_price);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleSamplePaymentSuccess = async () => {
    if (!id) return;
    try {
      await projectsService.update(id, {
        sample_payment_complete: true,
        sample_payment_date: new Date().toISOString()
      });
      setSamplePaymentComplete(true);
    } catch (err) {
      console.error('Error updating sample payment status:', err);
    }
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };
  const handleFeedbackImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFeedbackImages(Array.from(e.target.files));
    }
  };
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSubmittingFeedback(true);
    try {
      // Upload images to storage and get URLs
      const imageUrls: string[] = [];

      for (const file of feedbackImages) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/feedback_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(fileName, file);

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data: urlData } = supabase.storage
          .from('project-files')
          .getPublicUrl(fileName);

        imageUrls.push(urlData.publicUrl);
      }

      await projectsService.submitFeedback(id, feedback, imageUrls);

      // Clear the form
      setFeedback('');
      setFeedbackImages([]);

      alert('Feedback submitted successfully!');
      // Reload to show updated feedback
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to submit feedback');
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const handleRemoveFeedbackImage = (index: number) => {
    setFeedbackImages(prev => prev.filter((_, i) => i !== index));
  };
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setDeliveryAddress(prev => ({
      ...prev,
      [name]: value
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
  const handleCustomerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await projectsService.updateDeliveryAddress(id, deliveryAddress);
      setAddressSubmitted(true);
      alert('Delivery address saved successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save delivery address');
    }
  };
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await projectsService.updatePrototypeStatus(id, {
        prototypeStatus: adminData.prototypeStatus,
        trackingNumber: adminData.trackingNumber,
        estimatedDelivery: adminData.estimatedDelivery,
        notes: adminData.notes
      });

      if (adminData.prototypeStatus === 'delivered') {
        alert('Sample marked as delivered! The customer can now provide feedback.');
      } else {
        alert('Prototype status updated successfully!');
      }
      // Reload project data to show updated info
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update prototype status');
    }
  };

  // Admin action handlers for feedback stage
  const [showApprovalConfirm, setShowApprovalConfirm] = useState(false);
  const [showNewSampleConfirm, setShowNewSampleConfirm] = useState(false);
  const [newSampleReason, setNewSampleReason] = useState('');

  const handleApproveAndProceed = async () => {
    if (!id) return;
    try {
      await projectsService.update(id, {
        status: 'sourcing',
        sample_approved: true,
        sample_approved_at: new Date().toISOString()
      });
      alert('Sample approved! Moving to sourcing stage.');
      navigate(`/project/${id}/sourcing`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to proceed to sourcing');
    }
  };

  const handleRequestNewSample = async () => {
    if (!id) return;
    try {
      const noteAddition = newSampleReason
        ? `\n[New sample requested: ${newSampleReason}]`
        : '\n[New sample requested]';

      await projectsService.updatePrototypeStatus(id, {
        prototypeStatus: 'producing',
        trackingNumber: '',
        estimatedDelivery: '',
        notes: (adminData.notes || '') + noteAddition
      });
      // Clear customer feedback for new sample
      await projectsService.update(id, {
        customer_feedback: null,
        feedback_images: [],
        sample_revision_count: (project.sample_revision_count || 0) + 1
      });
      alert('New sample requested. Status reset to producing.');
      window.location.reload();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to request new sample');
    }
  };
  // Prototype steps
  const prototypeSteps = [{
    id: 'producing',
    label: 'Producing Sample'
  }, {
    id: 'shipping',
    label: 'Sample Shipped'
  }, {
    id: 'delivered',
    label: 'Sample Delivered'
  }, {
    id: 'feedback',
    label: 'Feedback Received'
  }];
  const getCurrentStepIndex = () => {
    if (!project || !project.prototype_status) return 0;
    return prototypeSteps.findIndex(step => step.id === project.prototype_status);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>;
  }

  if (error || !project) {
    return <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error || 'Project not found'}</div>
      </div>;
  }
  return <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
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

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Sampling Phase</p>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Sample Status
            </h2>
            {/* Step Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between w-full">
                {prototypeSteps.map((step, index) => {
                const currentStepIndex = getCurrentStepIndex();
                const isActive = index <= currentStepIndex;
                const isCompleted = index < currentStepIndex;
                return <Fragment key={step.id}>
                      {/* Step circle */}
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full
                              ${isCompleted ? 'bg-green-100' : isActive ? 'bg-primary-50' : 'bg-gray-100'}`}>
                            {isCompleted ? <CheckIcon className="h-5 w-5 text-green-600" /> : <BoxIcon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />}
                          </div>
                          <span className={`mt-2 text-xs block text-center w-24 -ml-7
                              ${isCompleted ? 'text-green-600' : isActive ? index === currentStepIndex ? 'text-primary-600 font-medium' : 'text-charcoal-500' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                        </div>
                      </div>
                      {/* Connector line */}
                      {index < prototypeSteps.length - 1 && <div className="flex-1 h-1 mx-2">
                          <div className={`h-full ${index < currentStepIndex ? 'bg-green-500' : 'bg-gray-200'}`} />
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
                      {project.prototype_status || 'producing'}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Sample Payment Section for Customer */}
            {user?.role === 'customer' && samplePrice > 0 && (project.prototype_status === 'producing' || !project.prototype_status) && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">Sample Production Fee</h3>
                    <p className="text-sm text-gray-500">Payment required to begin sample production</p>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    ${samplePrice.toFixed(2)}
                  </div>
                </div>
                <div className="mt-4">
                  {samplePaymentComplete ? (
                    <div className="w-full inline-flex items-center justify-center py-2 px-4 bg-green-100 text-green-800 rounded-md">
                      <CheckIcon className="mr-2 h-5 w-5" />
                      Payment Complete - Sample in Production
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowSamplePaymentModal(true)}
                      className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <CreditCardIcon className="mr-2 h-5 w-5" />
                      Pay for Sample
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Admin: Set Sample Price */}
            {user?.role === 'admin' && (project.prototype_status === 'producing' || !project.prototype_status) && (
              <div className="mb-6 bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="text-md font-medium text-gray-900 mb-3">Sample Pricing</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Sample Price ($)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={samplePrice || ''}
                      onChange={(e) => setSamplePrice(parseFloat(e.target.value) || 0)}
                      className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Enter sample price"
                    />
                  </div>
                  <button
                    onClick={async () => {
                      if (!id) return;
                      try {
                        await projectsService.update(id, { sample_price: samplePrice });
                        alert('Sample price updated!');
                      } catch (err) {
                        alert('Failed to update price');
                      }
                    }}
                    className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
                  >
                    Save Price
                  </button>
                </div>
                {samplePaymentComplete && (
                  <p className="mt-2 text-sm text-green-600 flex items-center">
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Customer has paid for this sample
                  </p>
                )}
              </div>
            )}

            {user?.role === 'admin' && <>
              <form onSubmit={handleAdminSubmit} className="border rounded-md p-4 bg-gray-50">
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Update Sample Status
                </h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="prototypeStatus" className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <select id="prototypeStatus" name="prototypeStatus" value={adminData.prototypeStatus} onChange={handleAdminChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                      <option value="producing">Producing Sample</option>
                      <option value="shipping">Sample Shipping</option>
                      <option value="delivered">Sample Delivered</option>
                      <option value="feedback">Feedback Received</option>
                    </select>
                  </div>
                  {['shipping', 'delivered', 'feedback'].includes(adminData.prototypeStatus) && <>
                      <div>
                        <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
                          Tracking Number {adminData.prototypeStatus === 'shipping' && <span className="text-red-500">*</span>}
                        </label>
                        <input type="text" name="trackingNumber" id="trackingNumber" value={adminData.trackingNumber} onChange={handleAdminChange} required={adminData.prototypeStatus === 'shipping'} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Enter tracking number" />
                      </div>
                      <div>
                        <label htmlFor="estimatedDelivery" className="block text-sm font-medium text-gray-700">
                          Estimated Delivery Date
                        </label>
                        <input type="date" name="estimatedDelivery" id="estimatedDelivery" value={adminData.estimatedDelivery} onChange={handleAdminChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                      </div>
                    </>}
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <textarea name="notes" id="notes" rows={3} value={adminData.notes} onChange={handleAdminChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Any additional information about the prototype" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Update Status
                  </button>
                </div>
              </form>

              {/* Admin Action Panel - shown when feedback has been received */}
              {project.customer_feedback && (
                <div className="mt-6 border-2 rounded-md p-4 bg-yellow-50 border-yellow-400">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ⚠️ Action Required: Review Sample Feedback
                  </h3>
                  {project.sample_revision_count > 0 && (
                    <p className="text-sm text-orange-600 mb-2">
                      This is revision #{project.sample_revision_count + 1}
                    </p>
                  )}
                  <p className="text-sm text-gray-600 mb-4">
                    Customer has provided feedback. Review carefully and decide whether to approve the sample or request revisions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setShowApprovalConfirm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Approve Sample
                    </button>
                    <button
                      onClick={() => setShowNewSampleConfirm(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600"
                    >
                      <RefreshCwIcon className="h-4 w-4 mr-2" />
                      Request New Sample
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">
                    Approving will move the project to the Sourcing stage. Requesting a new sample will reset to Producing.
                  </p>
                </div>
              )}

              {/* Customer Sample Feedback Section for Admin */}
              <div className="mt-6 border rounded-md p-4 bg-green-50 border-green-200">
                <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
                  <MessageCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                  Customer Sample Feedback
                </h3>
                {project.customer_feedback ? (
                  <div>
                    <div className="bg-white rounded-md p-4 border border-green-200 mb-4">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{project.customer_feedback}</p>
                    </div>
                    {project.feedback_images && project.feedback_images.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          Feedback Images ({project.feedback_images.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {project.feedback_images.map((imageUrl: string, index: number) => (
                            <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                              <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                <img
                                  src={imageUrl}
                                  alt={`Feedback image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                  }}
                                />
                                <div className="hidden flex-col items-center justify-center text-gray-400">
                                  <ImageIcon className="h-8 w-8 mb-1" />
                                  <span className="text-xs">Image</span>
                                </div>
                              </div>
                              <div className="p-2">
                                <a
                                  href={imageUrl}
                                  download
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center text-xs text-primary-600 hover:text-primary-800"
                                >
                                  <DownloadIcon className="h-3 w-3 mr-1" />
                                  Download
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No feedback submitted yet by customer.</p>
                )}
              </div>
            </>}
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Delivery Address
            </h2>
            {user?.role === 'customer' && !addressSubmitted && <form onSubmit={handleCustomerSubmit}>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input type="text" name="fullName" id="fullName" required value={deliveryAddress.fullName} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                      Phone Number *
                    </label>
                    <input type="text" name="phoneNumber" id="phoneNumber" required value={deliveryAddress.phoneNumber} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                      Address Line 1 *
                    </label>
                    <input type="text" name="addressLine1" id="addressLine1" required value={deliveryAddress.addressLine1} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                      Address Line 2
                    </label>
                    <input type="text" name="addressLine2" id="addressLine2" value={deliveryAddress.addressLine2} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      City *
                    </label>
                    <input type="text" name="city" id="city" required value={deliveryAddress.city} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                      State / Province *
                    </label>
                    <input type="text" name="state" id="state" required value={deliveryAddress.state} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                      ZIP / Postal Code *
                    </label>
                    <input type="text" name="zipCode" id="zipCode" required value={deliveryAddress.zipCode} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                      Country *
                    </label>
                    <select id="country" name="country" required value={deliveryAddress.country} onChange={handleAddressChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                      {/* Add more countries as needed */}
                    </select>
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Save Delivery Address
                  </button>
                </div>
              </form>}
            {user?.role === 'customer' && addressSubmitted && <div className="bg-white border rounded-md p-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-1">
                      Delivery Address
                    </h3>
                    <p className="text-sm text-gray-700">
                      {deliveryAddress.fullName}
                    </p>
                    <p className="text-sm text-gray-700">
                      {deliveryAddress.phoneNumber}
                    </p>
                    <p className="text-sm text-gray-700">
                      {deliveryAddress.addressLine1}
                    </p>
                    {deliveryAddress.addressLine2 && <p className="text-sm text-gray-700">
                        {deliveryAddress.addressLine2}
                      </p>}
                    <p className="text-sm text-gray-700">
                      {deliveryAddress.city}, {deliveryAddress.state}{' '}
                      {deliveryAddress.zipCode}
                    </p>
                    <p className="text-sm text-gray-700">
                      {deliveryAddress.country}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button onClick={() => setAddressSubmitted(false)} className="text-sm text-primary-600 hover:text-primary-800">
                    Edit Address
                  </button>
                </div>
              </div>}
            {user?.role === 'admin' && !project.delivery_full_name && <div className="bg-gray-50 border rounded-md p-4">
                <p className="text-sm text-gray-500">
                  Waiting for customer to provide delivery address. You'll be
                  notified once the address is submitted.
                </p>
              </div>}
            {user?.role === 'admin' && project.delivery_full_name && <div className="bg-white border rounded-md p-4">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                  <div>
                    <h3 className="text-md font-medium text-gray-900 mb-1">
                      Customer Delivery Address
                    </h3>
                    <p className="text-sm text-gray-700">
                      {project.delivery_full_name}
                    </p>
                    <p className="text-sm text-gray-700">
                      {project.delivery_phone_number}
                    </p>
                    <p className="text-sm text-gray-700">
                      {project.delivery_address_line1}
                    </p>
                    {project.delivery_address_line2 && <p className="text-sm text-gray-700">
                        {project.delivery_address_line2}
                      </p>}
                    <p className="text-sm text-gray-700">
                      {project.delivery_city}, {project.delivery_state}{' '}
                      {project.delivery_zip_code}
                    </p>
                    <p className="text-sm text-gray-700">
                      {project.delivery_country}
                    </p>
                  </div>
                </div>
              </div>}
          </div>
          {/* Tracking Information for Customer */}
          {user?.role === 'customer' && ['shipping', 'delivered', 'feedback'].includes(project.prototype_status) && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-md font-medium text-gray-900 mb-2 flex items-center">
                <TruckIcon className="h-5 w-5 mr-2 text-blue-600" />
                Tracking Information
              </h3>
              <div className="text-sm">
                {project.tracking_number ? (
                  <>
                    <p><span className="font-medium">Tracking Number:</span> {project.tracking_number}</p>
                    {project.estimated_delivery && (
                      <p className="mt-1">
                        <span className="font-medium">Estimated Delivery:</span>{' '}
                        {new Date(project.estimated_delivery + 'T00:00:00').toLocaleDateString()}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-gray-600">Tracking number will be provided shortly.</p>
                )}
              </div>
            </div>
          )}

          {/* Sample Delivered Notification */}
          {user?.role === 'customer' && project.prototype_status === 'delivered' && !project.customer_feedback && (
            <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
              <p className="text-sm text-green-700">
                Your sample has been delivered! Please provide your feedback below so we can proceed to the next step.
              </p>
            </div>
          )}

          {user?.role === 'customer' && <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Sample Feedback
              </h2>

              {/* Show feedback form only when status is delivered or feedback, and no feedback submitted yet */}
              {['delivered', 'feedback'].includes(project.prototype_status || '') && !project.customer_feedback ? (
              <div className="bg-white border rounded-md p-4">
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Feedback
                    </label>
                    <textarea id="feedback" name="feedback" rows={4} value={feedback} onChange={handleFeedbackChange} placeholder="Share your thoughts on the sample. What works well? What could be improved?" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Images
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Share photos of the sample with annotations or showing
                      specific issues
                    </p>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input type="file" multiple accept="image/*" className="hidden" id="feedback-images" onChange={handleFeedbackImageUpload} />
                      <label htmlFor="feedback-images" className="cursor-pointer flex flex-col items-center justify-center">
                        <CameraIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload images
                        </p>
                      </label>
                    </div>
                    {feedbackImages.length > 0 && <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Images to Upload ({feedbackImages.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {feedbackImages.map((file, index) => <div key={index} className="border rounded-md p-2 flex items-center relative">
                              <button
                                type="button"
                                onClick={() => handleRemoveFeedbackImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                              >
                                <XIcon className="h-3 w-3" />
                              </button>
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
                    <button
                      type="submit"
                      disabled={submittingFeedback}
                      className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
                    >
                      {submittingFeedback ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <MessageCircleIcon className="mr-2 h-4 w-4" />
                          Submit Feedback
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              ) : project.customer_feedback ? (
                /* Feedback already submitted */
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <div className="flex items-start">
                    <CheckIcon className="h-5 w-5 text-green-600 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-700">Feedback Submitted</p>
                      <p className="text-sm text-gray-600 mt-1 whitespace-pre-wrap">{project.customer_feedback}</p>
                      {project.feedback_images && project.feedback_images.length > 0 && (
                        <div className="mt-3">
                          <p className="text-xs text-gray-500">{project.feedback_images.length} image(s) attached</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Waiting for delivery */
                <div className="bg-gray-50 border rounded-md p-4">
                  <p className="text-sm text-gray-500">
                    You'll be able to provide feedback once your sample has been delivered.
                  </p>
                </div>
              )}
            </div>}
        </div>
      </div>

      {/* Feedback Threads Section - Only show after sample is delivered */}
      {id && ['delivered', 'feedback'].includes(project.prototype_status || '') && (
        <div className="mt-6">
          <FeedbackThreadList projectId={id} />
        </div>
      )}

      {/* Approval Confirmation Modal */}
      {showApprovalConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Sample Approval
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to approve this sample and move to the Sourcing stage?
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-4">
              <p className="text-sm text-blue-800">
                <strong>This will:</strong>
              </p>
              <ul className="text-sm text-blue-700 list-disc list-inside mt-1">
                <li>Mark the sample as approved</li>
                <li>Move the project to the Sourcing stage</li>
                <li>Allow the customer to proceed with manufacturer selection</li>
              </ul>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowApprovalConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowApprovalConfirm(false);
                  handleApproveAndProceed();
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Yes, Approve & Proceed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request New Sample Confirmation Modal */}
      {showNewSampleConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Request New Sample
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              This will reset the sampling process. The customer will need to wait for a new sample.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for new sample (optional)
              </label>
              <textarea
                value={newSampleReason}
                onChange={(e) => setNewSampleReason(e.target.value)}
                rows={3}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="e.g., Quality issues, wrong color, size adjustments needed..."
              />
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-md p-3 mb-4">
              <p className="text-sm text-orange-800">
                <strong>This will:</strong>
              </p>
              <ul className="text-sm text-orange-700 list-disc list-inside mt-1">
                <li>Reset status to "Producing Sample"</li>
                <li>Clear the current feedback</li>
                <li>Increment the revision counter</li>
              </ul>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowNewSampleConfirm(false);
                  setNewSampleReason('');
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNewSampleConfirm(false);
                  handleRequestNewSample();
                }}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600"
              >
                Request New Sample
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sample Payment Modal */}
      {id && samplePrice > 0 && (
        <StripePaymentModal
          isOpen={showSamplePaymentModal}
          onClose={() => setShowSamplePaymentModal(false)}
          onSuccess={handleSamplePaymentSuccess}
          projectId={id}
          paymentType="sample"
          amount={samplePrice}
          title="Sample Production Payment"
          description="Payment for sample production and shipping."
        />
      )}
    </div>;
};
export default Prototyping;