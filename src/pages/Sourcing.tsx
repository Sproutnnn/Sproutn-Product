import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, CheckCircleIcon, TrashIcon, StarIcon, EditIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import AdminStatusControl from '../components/AdminStatusControl';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
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
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
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
  // For editing existing manufacturers
  const [editingManufacturer, setEditingManufacturer] = useState<Manufacturer | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
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

        // Load manufacturers from database
        if (projectData.manufacturers && projectData.manufacturers.length > 0) {
          setManufacturers(projectData.manufacturers);
        }
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id, user]);
  const handleManufacturerSelect = (manufacturerId: string) => {
    setSelectedManufacturer(manufacturerId);
  };
  const handleCustomerSubmit = async () => {
    if (!selectedManufacturer) {
      alert('Please select a manufacturer');
      return;
    }

    try {
      // Find the selected manufacturer details
      const selectedMan = manufacturers.find(m => m.id === selectedManufacturer);
      if (!selectedMan) {
        alert('Selected manufacturer not found');
        return;
      }

      // Save the selected manufacturer to the database
      await projectsService.update(id!, {
        selected_manufacturer: {
          ...selectedMan,
          selectedAt: new Date().toISOString()
        }
      });

      navigate(`/project/${id}/payment`);
    } catch (err) {
      console.error('Error saving manufacturer selection:', err);
      alert('Failed to save manufacturer selection');
    }
  };
  // Admin form handlers
  const handleManufacturerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value,
      type
    } = e.target as HTMLInputElement;
    setNewManufacturer(prev => ({
      ...prev,
      [name]: type === 'number' ? (parseFloat(value) || 0) : value
    }));
  };

  // Handler for editing manufacturer form
  const handleEditManufacturerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editingManufacturer) return;
    const {
      name,
      value,
      type
    } = e.target as HTMLInputElement;
    setEditingManufacturer(prev => prev ? ({
      ...prev,
      [name]: type === 'number' ? (parseFloat(value) || 0) : value
    }) : null);
  };

  const handleEditArrayChange = (field: 'advantages' | 'disadvantages', index: number, value: string) => {
    if (!editingManufacturer) return;
    setEditingManufacturer(prev => {
      if (!prev) return null;
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addEditArrayItem = (field: 'advantages' | 'disadvantages') => {
    if (!editingManufacturer) return;
    setEditingManufacturer(prev => prev ? ({
      ...prev,
      [field]: [...prev[field], '']
    }) : null);
  };

  const removeEditArrayItem = (field: 'advantages' | 'disadvantages', index: number) => {
    if (!editingManufacturer) return;
    setEditingManufacturer(prev => {
      if (!prev) return null;
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleEditManufacturer = async () => {
    if (!id || !editingManufacturer) return;

    try {
      const updatedManufacturers = manufacturers.map(m =>
        m.id === editingManufacturer.id ? editingManufacturer : m
      );

      await projectsService.update(id, {
        manufacturers: updatedManufacturers
      });

      setManufacturers(updatedManufacturers);
      setEditingManufacturer(null);
      setShowEditModal(false);
      alert('Manufacturer updated successfully!');
    } catch (err) {
      console.error('Error updating manufacturer:', err);
      alert('Failed to update manufacturer.');
    }
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
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const newMan: Manufacturer = {
        ...newManufacturer,
        id: `m${Date.now()}`
      };

      const updatedManufacturers = [...manufacturers, newMan];

      // Save to database
      await projectsService.update(id, {
        manufacturers: updatedManufacturers
      });

      setManufacturers(updatedManufacturers);

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
    } catch (err) {
      console.error('Error adding manufacturer:', err);
      alert('Failed to add manufacturer. Please try again.');
    }
  };

  const handleDeleteManufacturer = async (manufacturerId: string) => {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this manufacturer?');
    if (!confirmed) return;

    try {
      const updatedManufacturers = manufacturers.filter(m => m.id !== manufacturerId);

      await projectsService.update(id, {
        manufacturers: updatedManufacturers
      });

      setManufacturers(updatedManufacturers);
      alert('Manufacturer deleted successfully!');
    } catch (err) {
      console.error('Error deleting manufacturer:', err);
      alert('Failed to delete manufacturer. Please try again.');
    }
  };

  const handleSetRecommended = async (manufacturerId: string) => {
    if (!id) return;

    try {
      const updatedManufacturers = manufacturers.map(m => ({
        ...m,
        recommended: m.id === manufacturerId
      }));

      await projectsService.update(id, {
        manufacturers: updatedManufacturers
      });

      setManufacturers(updatedManufacturers);
      alert('Recommended manufacturer updated!');
    } catch (err) {
      console.error('Error updating recommended manufacturer:', err);
      alert('Failed to update recommended manufacturer.');
    }
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

  // Wait for user to be loaded
  if (!user) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>;
  }

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
          <p className="text-sm text-gray-500 mt-1">Sourcing Phase</p>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Manufacturer Selection
          </h2>
          {user?.role === 'admin' && <div className="mb-8">
              {/* Show Selected Manufacturer if customer has made a selection */}
              {project.selected_manufacturer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                    Customer Selected Manufacturer
                  </h3>
                  <div className="bg-white rounded-lg border border-green-200 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{project.selected_manufacturer.name}</h4>
                        {project.selected_manufacturer.recommended && (
                          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2 py-0.5 rounded mt-1">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-gray-900">${project.selected_manufacturer.price.toFixed(2)}</span>
                        <span className="text-sm text-gray-500 block">per unit</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{project.selected_manufacturer.details}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Minimum Order:</span>{' '}
                        <span className="text-gray-600">{project.selected_manufacturer.minOrderQuantity} units</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Lead Time:</span>{' '}
                        <span className="text-gray-600">{project.selected_manufacturer.leadTime}</span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-green-700 mb-1">Advantages</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {project.selected_manufacturer.advantages.map((adv: string, idx: number) => (
                            <li key={idx}>{adv}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-700 mb-1">Disadvantages</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {project.selected_manufacturer.disadvantages.map((dis: string, idx: number) => (
                            <li key={idx}>{dis}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {project.selected_manufacturer.selectedAt && (
                      <p className="text-xs text-gray-400 mt-3">
                        Selected on {new Date(project.selected_manufacturer.selectedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

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
                    <input type="text" inputMode="numeric" name="minOrderQuantity" id="minOrderQuantity" required value={newManufacturer.minOrderQuantity || ''} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d*$/.test(val)) { handleManufacturerChange({ target: { name: 'minOrderQuantity', value: val === '' ? 0 : parseInt(val) || 0 } } as any); } }} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
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
                    <input type="text" inputMode="decimal" name="price" id="price" required value={newManufacturer.price || ''} onChange={(e) => { const val = e.target.value; if (val === '' || /^\d*\.?\d*$/.test(val)) { handleManufacturerChange({ target: { name: 'price', value: val === '' ? 0 : parseFloat(val) || 0 } } as any); } }} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
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
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-medium text-gray-900">
                                {man.name}
                              </h4>
                              {man.recommended && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-700">
                                  <StarIcon className="h-3 w-3 mr-1" />
                                  Recommended
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              MOQ: {man.minOrderQuantity} | Lead: {man.leadTime}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-gray-900">
                              ${typeof man.price === 'number' ? man.price.toFixed(2) : '0.00'}
                            </span>
                            <button
                              onClick={() => handleSetRecommended(man.id)}
                              className={`p-1 rounded ${man.recommended ? 'text-primary-600' : 'text-gray-400 hover:text-primary-600'}`}
                              title="Set as recommended"
                            >
                              <StarIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingManufacturer(man);
                                setShowEditModal(true);
                              }}
                              className="p-1 text-blue-500 hover:text-blue-700 rounded"
                              title="Edit manufacturer"
                            >
                              <EditIcon className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteManufacturer(man.id)}
                              className="p-1 text-red-500 hover:text-red-700 rounded"
                              title="Delete manufacturer"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
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
              {/* Show customer's selected manufacturer if they've already made a selection */}
              {project.selected_manufacturer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-600" />
                    Your Selected Manufacturer
                  </h3>
                  <div className="bg-white rounded-lg border border-green-200 p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">{project.selected_manufacturer.name}</h4>
                        {project.selected_manufacturer.recommended && (
                          <span className="inline-block bg-primary-100 text-primary-700 text-xs font-medium px-2 py-0.5 rounded mt-1">
                            RECOMMENDED
                          </span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-gray-900">${typeof project.selected_manufacturer.price === 'number' ? project.selected_manufacturer.price.toFixed(2) : '0.00'}</span>
                        <span className="text-sm text-gray-500 block">per unit</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{project.selected_manufacturer.details}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-700">Minimum Order:</span>{' '}
                        <span className="text-gray-600">{project.selected_manufacturer.minOrderQuantity} units</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Lead Time:</span>{' '}
                        <span className="text-gray-600">{project.selected_manufacturer.leadTime}</span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-medium text-green-700 mb-1">Advantages</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {project.selected_manufacturer.advantages?.map((adv: string, idx: number) => (
                            <li key={idx}>{adv}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-700 mb-1">Disadvantages</h5>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {project.selected_manufacturer.disadvantages?.map((dis: string, idx: number) => (
                            <li key={idx}>{dis}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {project.selected_manufacturer.selectedAt && (
                      <p className="text-xs text-gray-400 mt-3">
                        Selected on {new Date(project.selected_manufacturer.selectedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Show selection options if no selection made yet */}
              {!project.selected_manufacturer && (
                manufacturers.length === 0 ? <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
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
                </>
              )}
            </>}
        </div>
      </div>

      {/* Edit Manufacturer Modal */}
      {showEditModal && editingManufacturer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Edit Manufacturer</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Manufacturer Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={editingManufacturer.name}
                    onChange={handleEditManufacturerChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Min Order Quantity *
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    name="minOrderQuantity"
                    required
                    value={editingManufacturer.minOrderQuantity || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*$/.test(val)) {
                        handleEditManufacturerChange({ target: { name: 'minOrderQuantity', value: val === '' ? 0 : parseInt(val) || 0 } } as any);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Lead Time *
                  </label>
                  <input
                    type="text"
                    name="leadTime"
                    required
                    value={editingManufacturer.leadTime}
                    onChange={handleEditManufacturerChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="e.g., 30-45 days"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Unit Price (USD) *
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    name="price"
                    required
                    value={editingManufacturer.price || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        handleEditManufacturerChange({ target: { name: 'price', value: val === '' ? 0 : parseFloat(val) || 0 } } as any);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Details *
                  </label>
                  <textarea
                    name="details"
                    rows={3}
                    required
                    value={editingManufacturer.details}
                    onChange={handleEditManufacturerChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Advantages *
                  </label>
                  {editingManufacturer.advantages.map((adv, index) => (
                    <div key={`edit-adv-${index}`} className="flex mt-1">
                      <input
                        type="text"
                        required
                        value={adv}
                        onChange={e => handleEditArrayChange('advantages', index, e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder={`Advantage ${index + 1}`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeEditArrayItem('advantages', index)}
                          className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700"
                        >
                          <span className="h-5 w-5 flex items-center justify-center">×</span>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addEditArrayItem('advantages')}
                    className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    + Add Advantage
                  </button>
                </div>
                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Disadvantages *
                  </label>
                  {editingManufacturer.disadvantages.map((disadv, index) => (
                    <div key={`edit-disadv-${index}`} className="flex mt-1">
                      <input
                        type="text"
                        required
                        value={disadv}
                        onChange={e => handleEditArrayChange('disadvantages', index, e.target.value)}
                        className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        placeholder={`Disadvantage ${index + 1}`}
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeEditArrayItem('disadvantages', index)}
                          className="ml-2 inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700"
                        >
                          <span className="h-5 w-5 flex items-center justify-center">×</span>
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addEditArrayItem('disadvantages')}
                    className="mt-2 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    + Add Disadvantage
                  </button>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingManufacturer(null);
                    setShowEditModal(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditManufacturer}
                  className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>;
};
export default Sourcing;