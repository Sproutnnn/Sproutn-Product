import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from 'lucide-react';
import ProjectSteps from '../components/ProjectSteps';
import { useAuth } from '../context/AuthContext';
interface Manufacturer {
  id: string;
  name: string;
  minOrderQuantity: number;
  leadTime: string;
  price: number;
  details: string;
  advantages: string[];
  disadvantages: string[];
  recommended?: boolean;
}
const Sourcing: React.FC = () => {
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
    status: 'sourcing' as const,
    createdAt: '',
    updatedAt: ''
  });
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState<string | null>(null);
  // For admin form
  const [newManufacturer, setNewManufacturer] = useState<Omit<Manufacturer, 'id'>>({
    name: '',
    minOrderQuantity: 100,
    leadTime: '',
    price: 0,
    details: '',
    advantages: [''],
    disadvantages: ['']
  });
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setProject({
        id: id || '1',
        name: 'Smart Home Controller',
        status: 'sourcing',
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-05-20T14:45:00Z'
      });
      // Mock manufacturers data
      if (user?.role === 'admin') {
        // Empty list for admin to fill
        setManufacturers([]);
      } else {
        // Populated list for customer to choose from
        setManufacturers([{
          id: 'm1',
          name: 'TechPro Manufacturing',
          minOrderQuantity: 500,
          leadTime: '30-45 days',
          price: 15.75,
          details: 'Established in 2005, specializes in consumer electronics with a focus on smart home devices.',
          advantages: ['Excellent quality control', 'Competitive pricing', 'Experience with similar products'],
          disadvantages: ['Longer lead time', 'Higher minimum order quantity'],
          recommended: true
        }, {
          id: 'm2',
          name: 'QuickTurn Electronics',
          minOrderQuantity: 300,
          leadTime: '20-30 days',
          price: 18.5,
          details: 'Mid-sized manufacturer focused on quick turnaround and flexibility for startups and small businesses.',
          advantages: ['Faster production time', 'Lower minimum order quantity', 'Good communication'],
          disadvantages: ['Slightly higher unit cost', 'Less experience with complex products'],
          recommended: false
        }, {
          id: 'm3',
          name: 'Premium Tech Solutions',
          minOrderQuantity: 250,
          leadTime: '25-35 days',
          price: 22.0,
          details: 'High-end manufacturer with cutting-edge facilities and premium quality standards.',
          advantages: ['Superior build quality', 'Advanced testing procedures', 'Premium components used'],
          disadvantages: ['Higher cost', 'Less flexibility with design changes'],
          recommended: false
        }]);
      }
      setLoading(false);
    }, 500);
  }, [id, user]);
  const handleManufacturerSelect = (manufacturerId: string) => {
    setSelectedManufacturer(manufacturerId);
  };
  const handleCustomerSubmit = () => {
    if (!selectedManufacturer) {
      alert('Please select a manufacturer');
      return;
    }
    // In a real app, this would send data to an API
    navigate(`/project/${id}/payment`);
  };
  // Admin form handlers
  const handleManufacturerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setNewManufacturer(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleArrayChange = (field: 'advantages' | 'disadvantages', index: number, value: string) => {
    setNewManufacturer(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  const addArrayItem = (field: 'advantages' | 'disadvantages') => {
    setNewManufacturer(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  const removeArrayItem = (field: 'advantages' | 'disadvantages', index: number) => {
    setNewManufacturer(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    const newMan: Manufacturer = {
      ...newManufacturer,
      id: `m${manufacturers.length + 1}`
    };
    setManufacturers(prev => [...prev, newMan]);
    // Reset form
    setNewManufacturer({
      name: '',
      minOrderQuantity: 100,
      leadTime: '',
      price: 0,
      details: '',
      advantages: [''],
      disadvantages: ['']
    });
    alert('Manufacturer added successfully!');
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
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Sourcing Phase</p>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Manufacturer Selection
          </h2>
          {user?.role === 'admin' && <div className="mb-8">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Add at least 3 manufacturer options for the customer to
                      choose from.
                    </p>
                  </div>
                </div>
              </div>
              <form onSubmit={handleAdminSubmit} className="border rounded-md p-4 bg-gray-50">
                <h3 className="text-md font-medium text-gray-900 mb-4">
                  Add New Manufacturer
                </h3>
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Manufacturer Name *
                    </label>
                    <input type="text" name="name" id="name" required value={newManufacturer.name} onChange={handleManufacturerChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="minOrderQuantity" className="block text-sm font-medium text-gray-700">
                      Min Order Quantity *
                    </label>
                    <input type="number" name="minOrderQuantity" id="minOrderQuantity" required min="1" value={newManufacturer.minOrderQuantity} onChange={handleManufacturerChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="leadTime" className="block text-sm font-medium text-gray-700">
                      Lead Time *
                    </label>
                    <input type="text" name="leadTime" id="leadTime" required value={newManufacturer.leadTime} onChange={handleManufacturerChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="e.g., 30-45 days" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Unit Price (USD) *
                    </label>
                    <input type="number" name="price" id="price" required min="0.01" step="0.01" value={newManufacturer.price} onChange={handleManufacturerChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
                  </div>
                  <div className="sm:col-span-6">
                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">
                      Details *
                    </label>
                    <textarea name="details" id="details" rows={3} required value={newManufacturer.details} onChange={handleManufacturerChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Description of the manufacturer and their capabilities" />
                  </div>
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Advantages *
                    </label>
                    {newManufacturer.advantages.map((adv, index) => <div key={`adv-${index}`} className="flex mt-1">
                        <input type="text" required value={adv} onChange={e => handleArrayChange('advantages', index, e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder={`Advantage ${index + 1}`} />
                        {index > 0 && <button type="button" onClick={() => removeArrayItem('advantages', index)} className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <span className="sr-only">Remove</span>
                            <span className="h-5 w-5 flex items-center justify-center">
                              ×
                            </span>
                          </button>}
                      </div>)}
                    <button type="button" onClick={() => addArrayItem('advantages')} className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      + Add Advantage
                    </button>
                  </div>
                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">
                      Disadvantages *
                    </label>
                    {newManufacturer.disadvantages.map((disadv, index) => <div key={`disadv-${index}`} className="flex mt-1">
                        <input type="text" required value={disadv} onChange={e => handleArrayChange('disadvantages', index, e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder={`Disadvantage ${index + 1}`} />
                        {index > 0 && <button type="button" onClick={() => removeArrayItem('disadvantages', index)} className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            <span className="sr-only">Remove</span>
                            <span className="h-5 w-5 flex items-center justify-center">
                              ×
                            </span>
                          </button>}
                      </div>)}
                    <button type="button" onClick={() => addArrayItem('disadvantages')} className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      + Add Disadvantage
                    </button>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Add Manufacturer
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <h3 className="text-md font-medium text-gray-900 mb-2">
                  Added Manufacturers ({manufacturers.length}/3)
                </h3>
                {manufacturers.length === 0 ? <p className="text-sm text-gray-500">
                    No manufacturers added yet.
                  </p> : <ul className="divide-y divide-gray-200 border rounded-md">
                    {manufacturers.map(man => <li key={man.id} className="p-4">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">
                              {man.name}
                            </h4>
                          </div>
                          <div className="text-sm text-gray-500">
                            $
                            {typeof man.price === 'number' ? man.price.toFixed(2) : '0.00'}
                          </div>
                        </div>
                      </li>)}
                  </ul>}
                {manufacturers.length >= 3 && <div className="mt-4 bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          You've added 3 manufacturer options. The customer can
                          now select their preferred option.
                        </p>
                      </div>
                    </div>
                  </div>}
              </div>
            </div>}
          {user?.role === 'customer' && <>
              {manufacturers.length === 0 ? <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        Waiting for admin team to provide manufacturer options.
                        You'll be notified once options are available.
                      </p>
                    </div>
                  </div>
                </div> : <>
                  <p className="text-sm text-gray-600 mb-6">
                    Please review the manufacturer options below and select the
                    one you'd like to work with.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {manufacturers.map(man => <div key={man.id} className={`border rounded-lg p-4 relative ${selectedManufacturer === man.id ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:bg-gray-50'}`}>
                        {man.recommended && <div className="absolute top-0 right-0 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                            RECOMMENDED
                          </div>}
                        <div className="flex items-start mb-4">
                          <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${selectedManufacturer === man.id ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`} onClick={() => handleManufacturerSelect(man.id)}>
                            {selectedManufacturer === man.id && <CheckIcon className="h-3 w-3 text-white" />}
                          </div>
                          <div className="ml-3">
                            <h3 className="text-lg font-medium text-gray-900">
                              {man.name}
                            </h3>
                          </div>
                        </div>
                        <div className="mb-4">
                          <span className="text-xl font-bold text-gray-900">
                            ${man.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {' '}
                            per unit
                          </span>
                        </div>
                        <div className="mb-4">
                          <p className="text-sm text-gray-600">{man.details}</p>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Advantages
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {man.advantages.map((adv, index) => <li key={index} className="text-sm text-gray-600">
                                {adv}
                              </li>)}
                          </ul>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">
                            Disadvantages
                          </h4>
                          <ul className="list-disc pl-5 space-y-1">
                            {man.disadvantages.map((disadv, index) => <li key={index} className="text-sm text-gray-600">
                                {disadv}
                              </li>)}
                          </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mt-auto">
                          <div>
                            <span className="font-medium">Minimum Order:</span>{' '}
                            {man.minOrderQuantity} units
                          </div>
                          <div>
                            <span className="font-medium">Lead Time:</span>{' '}
                            {man.leadTime}
                          </div>
                        </div>
                      </div>)}
                  </div>
                  <div className="mt-8 flex justify-end">
                    <button onClick={handleCustomerSubmit} disabled={!selectedManufacturer} className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300">
                      Continue to Payment
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </>}
            </>}
        </div>
      </div>
    </div>;
};
export default Sourcing;