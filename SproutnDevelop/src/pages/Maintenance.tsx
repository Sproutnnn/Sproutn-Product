import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CreditCardIcon, CheckIcon, AlertCircleIcon, BarChartIcon, ShieldIcon, DatabaseIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProjectSteps from '../components/ProjectSteps';
import ModuleNavigation from '../components/ModuleNavigation';
const Maintenance: React.FC = () => {
  const {
    user
  } = useAuth();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState({
    id: '',
    name: '',
    status: 'maintenance' as const,
    createdAt: '',
    updatedAt: '',
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState([{
    id: 'basic',
    name: 'Basic Maintenance',
    price: 99,
    billingCycle: 'monthly',
    description: 'Essential maintenance to keep your software running smoothly',
    features: ['Bug fixes', 'Security updates', 'Basic monitoring', 'Email support', 'Response within 48 hours'],
    recommended: false
  }, {
    id: 'standard',
    name: 'Standard Maintenance',
    price: 249,
    billingCycle: 'monthly',
    description: 'Comprehensive maintenance with enhanced support',
    features: ['All Basic features', 'Performance optimization', 'Monthly reports', 'Content updates', 'Email & phone support', 'Response within 24 hours'],
    recommended: true
  }, {
    id: 'premium',
    name: 'Premium Maintenance',
    price: 499,
    billingCycle: 'monthly',
    description: 'Complete maintenance solution with priority support',
    features: ['All Standard features', 'Proactive monitoring', 'Weekly backups', 'Quarterly feature enhancements', 'Dedicated support manager', 'Response within 8 hours', 'Emergency 24/7 support'],
    recommended: false
  }]);
  const [maintenanceStats, setMaintenanceStats] = useState({
    uptime: '99.9%',
    responseTime: '0.8s',
    bugsFixed: 12,
    updatesDeployed: 8,
    lastMaintenance: '2023-10-15',
    nextScheduled: '2023-11-15'
  });
  const toggleRecommended = (packageId: string) => {
    if (user?.role === 'admin') {
      setPackages(packages.map(pkg => ({
        ...pkg,
        recommended: pkg.id === packageId
      })));
    }
  };
  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      setProject({
        id: id || '1',
        name: 'E-Commerce Platform',
        status: 'maintenance',
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-05-20T14:45:00Z',
        customer: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      });
      setLoading(false);
    }, 500);
  }, [id]);
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>;
  }
  return <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <ProjectSteps currentStep={project.status} />
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Maintenance</p>
        </div>
      </div>
      {/* Module Navigation */}
      <ModuleNavigation project={project} />
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Ongoing Maintenance
          </h2>
          <p className="text-sm text-gray-500">
            Keep your software running smoothly with regular maintenance and
            support
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {/* Maintenance Description */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Software Maintenance Services
              </h3>
              <p className="text-gray-600">
                Our maintenance services ensure your software remains secure,
                up-to-date, and performs optimally. Choose a maintenance plan
                that fits your needs and budget to keep your application running
                smoothly.
              </p>
            </div>
            {/* Stats Section (only visible if already subscribed) */}
            {selectedPackage && <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Maintenance Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <CheckIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Uptime</p>
                        <p className="text-lg font-semibold">
                          {maintenanceStats.uptime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <BarChartIcon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Response Time</p>
                        <p className="text-lg font-semibold">
                          {maintenanceStats.responseTime}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <AlertCircleIcon className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Bugs Fixed</p>
                        <p className="text-lg font-semibold">
                          {maintenanceStats.bugsFixed}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                        <ShieldIcon className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Updates Deployed
                        </p>
                        <p className="text-lg font-semibold">
                          {maintenanceStats.updatesDeployed}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <DatabaseIcon className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          Last Maintenance
                        </p>
                        <p className="text-lg font-semibold">
                          {formatDate(maintenanceStats.lastMaintenance)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-md border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center mr-3">
                        <DatabaseIcon className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Next Scheduled</p>
                        <p className="text-lg font-semibold">
                          {formatDate(maintenanceStats.nextScheduled)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
            {/* Maintenance Packages */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Choose Your Maintenance Plan
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Select a maintenance package that fits your ongoing support
                needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {packages.map(pkg => <div key={pkg.id} className={`border rounded-lg p-4 cursor-pointer relative ${selectedPackage === pkg.id ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:bg-gray-50'} ${pkg.recommended ? 'border-primary-500' : 'border-gray-200'}`} onClick={() => handlePackageSelect(pkg.id)}>
                    {pkg.recommended && <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                        <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      </div>}
                    <h4 className="text-lg font-medium text-gray-900">
                      {pkg.name}
                    </h4>
                    <div className="mt-1 mb-2 flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">
                        ${pkg.price}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        /{pkg.billingCycle}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => <li key={index} className="flex items-start">
                          <CheckIcon className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">
                            {feature}
                          </span>
                        </li>)}
                    </ul>
                    {user?.role === 'admin' && <div className="mt-4 pt-3 border-t border-gray-200">
                        <button onClick={e => {
                    e.stopPropagation();
                    toggleRecommended(pkg.id);
                  }} className={`text-xs px-2 py-1 rounded ${pkg.recommended ? 'bg-primary-100 text-primary-800' : 'bg-gray-100 text-gray-800'}`}>
                          {pkg.recommended ? 'Recommended' : 'Set as Recommended'}
                        </button>
                      </div>}
                  </div>)}
              </div>
            </div>
            {/* Admin Price Configuration (only visible to admins) */}
            {user?.role === 'admin' && <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Maintenance Plan Configuration
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Configure maintenance package prices and features
                </p>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="space-y-4">
                    {packages.map((pkg, index) => <div key={index} className="bg-white p-3 rounded-md border border-gray-200">
                        <h4 className="font-medium text-gray-900 mb-2">
                          {pkg.name}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Monthly Price ($)
                            </label>
                            <input type="number" value={pkg.price} onChange={e => {
                        const newPackages = [...packages];
                        newPackages[index].price = parseInt(e.target.value) || 0;
                        setPackages(newPackages);
                      }} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Billing Cycle
                            </label>
                            <select value={pkg.billingCycle} onChange={e => {
                        const newPackages = [...packages];
                        newPackages[index].billingCycle = e.target.value;
                        setPackages(newPackages);
                      }} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
                              <option value="monthly">Monthly</option>
                              <option value="quarterly">Quarterly</option>
                              <option value="yearly">Yearly</option>
                            </select>
                          </div>
                        </div>
                      </div>)}
                    <div className="flex justify-end">
                      <button className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                        Save Configuration
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
            {/* Payment Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Maintenance Subscription
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedPackage ? packages.find(p => p.id === selectedPackage)?.name : 'No package selected'}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {selectedPackage ? '$' + packages.find(p => p.id === selectedPackage)?.price.toFixed(2) + '/' + packages.find(p => p.id === selectedPackage)?.billingCycle : '-'}
                  </div>
                </div>
                <div className="mt-4">
                  <button disabled={!selectedPackage} className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    <CreditCardIcon className="mr-2 h-5 w-5" />
                    Subscribe to Maintenance Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Maintenance;