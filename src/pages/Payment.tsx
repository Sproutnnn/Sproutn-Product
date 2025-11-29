import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CreditCardIcon, LockIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import { projectsService } from '../services/projects.service';
const Payment: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [manufacturer, setManufacturer] = useState({
    name: 'TechPro Manufacturing',
    price: 15.75,
    minOrderQuantity: 500
  });
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'bank-transfer'>('credit-card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: '',
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handlePaymentMethodChange = (method: 'credit-card' | 'bank-transfer') => {
    setPaymentMethod(method);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // In a real app, this would process the payment
    // For demo purposes, we'll simulate a payment process
    setTimeout(() => {
      navigate(`/project/${id}/tracking`);
    }, 1500);
  };
  const totalAmount = manufacturer.price * manufacturer.minOrderQuantity;
  const depositAmount = totalAmount * 0.3;
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
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Payment - 30% Deposit</p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Payment Information
              </h2>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <LockIcon className="h-5 w-5 text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Your payment information is secure. We require a 30%
                      deposit to begin production.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mb-6">
                <div className="flex space-x-4">
                  <button type="button" onClick={() => handlePaymentMethodChange('credit-card')} className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center ${paymentMethod === 'credit-card' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    <CreditCardIcon className="h-5 w-5 mr-2" />
                    Credit Card
                  </button>
                  <button type="button" onClick={() => handlePaymentMethodChange('bank-transfer')} className={`flex-1 py-3 px-4 border rounded-md flex items-center justify-center ${paymentMethod === 'bank-transfer' ? 'bg-primary-50 border-primary-500 text-primary-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}>
                    <div className="h-5 w-5 mr-2" />
                    Bank Transfer
                  </button>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                {paymentMethod === 'credit-card' ? <div className="space-y-4">
                    <div>
                      <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                        Cardholder Name
                      </label>
                      <input type="text" name="cardholderName" id="cardholderName" required value={formData.cardholderName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input type="text" name="cardNumber" id="cardNumber" required value={formData.cardNumber} onChange={handleChange} placeholder="XXXX XXXX XXXX XXXX" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                          Expiry Date
                        </label>
                        <input type="text" name="expiryDate" id="expiryDate" required value={formData.expiryDate} onChange={handleChange} placeholder="MM/YY" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input type="text" name="cvv" id="cvv" required value={formData.cvv} onChange={handleChange} placeholder="XXX" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                      </div>
                    </div>
                  </div> : <div className="space-y-4">
                    <div>
                      <label htmlFor="bankName" className="block text-sm font-medium text-gray-700">
                        Bank Name
                      </label>
                      <input type="text" name="bankName" id="bankName" required value={formData.bankName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="accountName" className="block text-sm font-medium text-gray-700">
                        Account Holder Name
                      </label>
                      <input type="text" name="accountName" id="accountName" required value={formData.accountName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">
                        Account Number
                      </label>
                      <input type="text" name="accountNumber" id="accountNumber" required value={formData.accountNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                    <div>
                      <label htmlFor="routingNumber" className="block text-sm font-medium text-gray-700">
                        Routing Number
                      </label>
                      <input type="text" name="routingNumber" id="routingNumber" required value={formData.routingNumber} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                    </div>
                  </div>}
                <div className="mt-8 flex justify-end">
                  <button type="submit" disabled={isSubmitting} className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300">
                    {isSubmitting ? 'Processing...' : 'Pay Deposit'}
                    {!isSubmitting && <ArrowRightIcon className="ml-2 h-4 w-4" />}
                  </button>
                </div>
              </form>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Manufacturer</span>
                    <span className="text-gray-900 font-medium">
                      {manufacturer.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Unit Price</span>
                    <span className="text-gray-900 font-medium">
                      ${manufacturer.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Quantity</span>
                    <span className="text-gray-900 font-medium">
                      {manufacturer.minOrderQuantity} units
                    </span>
                  </div>
                  <div className="border-t border-gray-200 my-3 pt-3">
                    <div className="flex justify-between">
                      <span className="text-gray-900 font-medium">
                        Total Order Value
                      </span>
                      <span className="text-gray-900 font-medium">
                        ${totalAmount.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary-50 p-3 rounded-md">
                    <div className="flex justify-between text-primary-800">
                      <span className="font-medium">30% Deposit (Due Now)</span>
                      <span className="font-bold">
                        ${depositAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-primary-600 mt-1">
                      Remaining balance will be due before shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Payment;