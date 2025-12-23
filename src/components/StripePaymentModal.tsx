import React, { useState } from 'react';
import { XIcon, CreditCardIcon, CheckIcon } from 'lucide-react';
import { paymentsService, PaymentType } from '../services/payments.service';
import { projectsService } from '../services/projects.service';

interface StripePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  projectId: string;
  paymentType: PaymentType;
  amount: number;
  title: string;
  description: string;
}

const StripePaymentModal: React.FC<StripePaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  projectId,
  paymentType,
  amount,
  title,
  description
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  if (!isOpen) return null;

  const handleClose = () => {
    setPaymentSuccess(false);
    setError(null);
    setFormData({
      cardholderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setError(null);

    try {
      // In a production app, you would:
      // 1. Create a payment intent on your backend
      // 2. Use Stripe Elements to collect card details securely
      // 3. Confirm the payment with Stripe
      // 4. Record the successful payment

      // For this demo, we'll simulate a successful payment
      // and record it in the database
      const simulatedPaymentIntentId = `pi_demo_${Date.now()}`;

      await paymentsService.recordPayment(
        projectId,
        paymentType,
        simulatedPaymentIntentId,
        projectsService
      );

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success state
      setPaymentSuccess(true);
      onSuccess();
    } catch (err) {
      console.error('Payment error:', err);
      setError(err instanceof Error ? err.message : 'Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {paymentSuccess ? (
          /* Success Confirmation UI */
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckIcon className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your payment of <span className="font-semibold">${amount.toFixed(2)}</span> has been processed successfully.
            </p>
            <p className="text-xs text-gray-500 mb-6">
              A confirmation email will be sent to your registered email address.
            </p>
            <button
              onClick={handleClose}
              className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue
            </button>
          </div>
        ) : (
          <>
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <p className="text-sm text-gray-600 mb-4">{description}</p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">
                Cardholder Name
              </label>
              <input
                type="text"
                id="cardholderName"
                name="cardholderName"
                value={formData.cardholderName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="4242 4242 4242 4242"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="123"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 p-3 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-base font-medium text-gray-900">Total</span>
              <span className="text-xl font-bold text-primary-600">${amount.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <CreditCardIcon className="mr-2 h-5 w-5" />
                  Pay ${amount.toFixed(2)}
                </>
              )}
            </button>
          </div>

          <p className="mt-3 text-xs text-gray-500 text-center">
            Your payment is secure. We use industry-standard encryption.
          </p>
        </form>
          </>
        )}
      </div>
    </div>
  );
};

export default StripePaymentModal;
