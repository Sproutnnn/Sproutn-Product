import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, BoxIcon, MapPinIcon, CameraIcon, MessageCircleIcon } from 'lucide-react';
import ProjectSteps from '../components/ProjectSteps';
import { useAuth } from '../context/AuthContext';
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
  const [project, setProject] = useState({
    id: '',
    name: '',
    status: 'prototyping' as const,
    prototypeStatus: 'producing' as 'producing' | 'shipping' | 'delivered' | 'feedback',
    createdAt: '',
    updatedAt: ''
  });
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
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      const mockProject = {
        id: id || '1',
        name: 'Smart Home Controller',
        status: 'prototyping' as const,
        prototypeStatus: 'producing' as const,
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
  const handleFeedbackImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFeedbackImages(Array.from(e.target.files));
    }
  };
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the feedback and images to an API
    console.log('Feedback submitted:', {
      feedback,
      images: feedbackImages
    });
    // Clear the form
    setFeedback('');
    setFeedbackImages([]);
    // Optionally show a success message
    alert('Feedback submitted successfully!');
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
  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    setAddressSubmitted(true);
  };
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    // If status is feedback, move to the next step
    if (adminData.prototypeStatus === 'feedback') {
      navigate(`/project/${id}/sourcing`);
    } else {
      alert('Prototype status updated successfully!');
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
    id: 'feedback',
    label: 'Sample Feedback'
  }];
  const getCurrentStepIndex = () => {
    return prototypeSteps.findIndex(step => step.id === project.prototypeStatus);
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
          <p className="text-sm text-gray-500 mt-1">Prototyping Phase</p>
        </div>
        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Prototype Status
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
                              ${isActive ? 'bg-primary-50' : 'bg-gray-100'}`}>
                            {isCompleted ? <CheckIcon className="h-5 w-5 text-primary-600" /> : <BoxIcon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />}
                          </div>
                          <span className={`mt-2 text-xs block text-center w-24 -ml-7
                              ${isActive ? index === currentStepIndex ? 'text-primary-600 font-medium' : 'text-charcoal-500' : 'text-gray-400'}`}>
                            {step.label}
                          </span>
                        </div>
                      </div>
                      {/* Connector line */}
                      {index < prototypeSteps.length - 1 && <div className="flex-1 h-1 mx-2">
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
                      {project.prototypeStatus}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            {user?.role === 'admin' && <form onSubmit={handleAdminSubmit} className="border rounded-md p-4 bg-gray-50">
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Update Prototype Status
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
                  {adminData.prototypeStatus === 'shipping' && <>
                      <div>
                        <label htmlFor="trackingNumber" className="block text-sm font-medium text-gray-700">
                          Tracking Number
                        </label>
                        <input type="text" name="trackingNumber" id="trackingNumber" value={adminData.trackingNumber} onChange={handleAdminChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
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
                    {adminData.prototypeStatus === 'feedback' ? <>
                        Move to Sourcing
                        <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </> : 'Update Status'}
                  </button>
                </div>
              </form>}
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
            {user?.role === 'admin' && <div className="bg-gray-50 border rounded-md p-4">
                <p className="text-sm text-gray-500">
                  Waiting for customer to provide delivery address. You'll be
                  notified once the address is submitted.
                </p>
              </div>}
          </div>
          {user?.role === 'customer' && <div className="mt-8 border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Prototype Feedback
              </h2>
              <div className="bg-white border rounded-md p-4">
                <form onSubmit={handleFeedbackSubmit}>
                  <div className="mb-4">
                    <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Feedback
                    </label>
                    <textarea id="feedback" name="feedback" rows={4} value={feedback} onChange={handleFeedbackChange} placeholder="Share your thoughts on the prototype. What works well? What could be improved?" className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Images
                    </label>
                    <p className="text-xs text-gray-500 mb-2">
                      Share photos of the prototype with annotations or showing
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
                          Uploaded Images ({feedbackImages.length})
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          {feedbackImages.map((file, index) => <div key={index} className="border rounded-md p-2 flex items-center">
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
        </div>
      </div>
    </div>;
};
export default Prototyping;