import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CreditCardIcon, LockIcon, CheckCircleIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import AdminStatusControl from '../components/AdminStatusControl';
import StripePaymentModal from '../components/StripePaymentModal';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
import { paymentsService } from '../services/payments.service';

const Payment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  const handlePaymentSuccess = () => {
    // Update project status to production
    if (id) {
      projectsService.updateProjectStatus(id, 'production').then(() => {
        navigate(`/project/${id}/tracking`);
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">{error || 'Project not found'}</div>
      </div>
    );
  }

  const manufacturer = project.selected_manufacturer;
  const paymentAmounts = paymentsService.calculatePaymentAmounts(project);
  const paymentStatus = paymentsService.getPaymentStatus(project);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <ModuleNavigation project={project} />

      {/* Admin Status Control */}
      {user?.role === 'admin' && id && (
        <AdminStatusControl projectId={id} currentStatus={project.status} />
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Payment - 30% Deposit</p>
        </div>
        <div className="p-6">
          {paymentStatus.depositPaid ? (
            <div className="text-center py-8">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-medium text-gray-900 mb-2">
                Deposit Payment Complete
              </h2>
              <p className="text-gray-600 mb-4">
                Your 30% deposit has been received. Production has started!
              </p>
              <p className="text-sm text-gray-500">
                Paid on:{' '}
                {new Date(paymentStatus.depositPaidAt).toLocaleDateString()}
              </p>
              <button
                onClick={() => navigate(`/project/${id}/tracking`)}
                className="mt-6 inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
              >
                Track Your Order
              </button>
            </div>
          ) : (
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

                {!manufacturer ? (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <p className="text-sm text-yellow-700">
                      Please select a manufacturer in the Sourcing step before
                      proceeding with payment.
                    </p>
                  </div>
                ) : (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="w-full inline-flex items-center justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <CreditCardIcon className="mr-2 h-5 w-5" />
                      Pay 30% Deposit - ${paymentAmounts.deposit.toFixed(2)}
                    </button>
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Order Summary
                  </h3>
                  {manufacturer ? (
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
                          ${manufacturer.price?.toFixed(2) || '0.00'}
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
                            ${paymentAmounts.total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      <div className="bg-primary-50 p-3 rounded-md">
                        <div className="flex justify-between text-primary-800">
                          <span className="font-medium">
                            30% Deposit (Due Now)
                          </span>
                          <span className="font-bold">
                            ${paymentAmounts.deposit.toFixed(2)}
                          </span>
                        </div>
                        <div className="text-xs text-primary-600 mt-1">
                          Remaining balance will be due before shipping
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No manufacturer selected yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stripe Payment Modal */}
      {id && (
        <StripePaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          projectId={id}
          paymentType="deposit"
          amount={paymentAmounts.deposit}
          title="Pay 30% Deposit"
          description="Your deposit will begin production of your order."
        />
      )}
    </div>
  );
};

export default Payment;
