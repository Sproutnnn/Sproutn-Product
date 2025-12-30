import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UploadIcon, DownloadIcon, CreditCardIcon, FileTextIcon, CheckIcon, PlusIcon, TrashIcon, StarIcon, XIcon, EditIcon, PackageIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import AdminStatusControl from '../components/AdminStatusControl';
import StripePaymentModal from '../components/StripePaymentModal';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
import { supabase } from '../lib/supabase';
import { defaultPhotographyPackages } from '../data/defaultPackages';

interface PhotographyPackage {
  id: string;
  name: string;
  price: number;
  imageCount: number;
  videoIncluded?: boolean;
  description: string;
  features: string[];
  recommended: boolean;
}

const Photography: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [inspirationFiles, setInspirationFiles] = useState<string[]>([]);
  const [uploadingInspiration, setUploadingInspiration] = useState(false);
  const [packages, setPackages] = useState<PhotographyPackage[]>([]);
  const [completedAssets, setCompletedAssets] = useState<any[]>([]);
  const [questionnaireUrl, setQuestionnaireUrl] = useState<string | null>(null);

  // Admin form state
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [newPackage, setNewPackage] = useState<Omit<PhotographyPackage, 'id'>>({
    name: '',
    price: 0,
    imageCount: 0,
    videoIncluded: false,
    description: '',
    features: [''],
    recommended: false
  });
  const [priceInput, setPriceInput] = useState('0'); // String state for price input
  const [imageCountInput, setImageCountInput] = useState('0'); // String state for image count input

  // Edit package state
  const [showEditPackageForm, setShowEditPackageForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PhotographyPackage | null>(null);
  const [editPriceInput, setEditPriceInput] = useState('0');
  const [editImageCountInput, setEditImageCountInput] = useState('0');

  // Customer questionnaire upload
  const [customerQuestionnaireUrl, setCustomerQuestionnaireUrl] = useState<string | null>(null);

  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [photographyPaymentComplete, setPhotographyPaymentComplete] = useState(false);

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

        // Load photography data from database
        if (projectData.photography_packages && projectData.photography_packages.length > 0) {
          setPackages(projectData.photography_packages);
        }

        if (projectData.photography_inspiration_files) {
          setInspirationFiles(projectData.photography_inspiration_files);
        }

        if (projectData.photography_questionnaire_url) {
          setQuestionnaireUrl(projectData.photography_questionnaire_url);
        }

        if (projectData.completed_photography_assets) {
          setCompletedAssets(projectData.completed_photography_assets);
        }

        if (projectData.selected_photography_package) {
          setSelectedPackage(projectData.selected_photography_package.id);
        }

        if (projectData.customer_questionnaire_url) {
          setCustomerQuestionnaireUrl(projectData.customer_questionnaire_url);
        }

        if (projectData.photography_payment_complete) {
          setPhotographyPaymentComplete(true);
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

  const handleInspirationUpload = async () => {
    if (!id || uploadedFiles.length === 0) return;

    setUploadingInspiration(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of uploadedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/photography_inspiration_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

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

        uploadedUrls.push(urlData.publicUrl);
      }

      const allFiles = [...inspirationFiles, ...uploadedUrls];
      await projectsService.update(id, {
        photography_inspiration_files: allFiles
      });

      setInspirationFiles(allFiles);
      setUploadedFiles([]);
      alert('Inspiration files uploaded successfully!');
    } catch (err) {
      console.error('Error uploading files:', err);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploadingInspiration(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleQuestionnaireUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!id || !e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${id}/questionnaire_${Date.now()}.${fileExt}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('project-files')
        .getPublicUrl(fileName);

      await projectsService.update(id, {
        photography_questionnaire_url: urlData.publicUrl
      });

      setQuestionnaireUrl(urlData.publicUrl);
      alert('Questionnaire uploaded successfully!');
    } catch (err) {
      console.error('Error uploading questionnaire:', err);
      alert('Failed to upload questionnaire.');
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const pkg: PhotographyPackage = {
        ...newPackage,
        price: parseFloat(priceInput) || 0,
        imageCount: parseInt(imageCountInput) || 0,
        id: `photo_pkg_${Date.now()}`
      };

      const updatedPackages = [...packages, pkg];
      await projectsService.update(id, {
        photography_packages: updatedPackages
      });

      setPackages(updatedPackages);
      setNewPackage({
        name: '',
        price: 0,
        imageCount: 0,
        videoIncluded: false,
        description: '',
        features: [''],
        recommended: false
      });
      setPriceInput('0');
      setImageCountInput('0');
      setShowAddPackageForm(false);
      alert('Package added successfully!');
    } catch (err) {
      console.error('Error adding package:', err);
      alert('Failed to add package.');
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this package?');
    if (!confirmed) return;

    try {
      const updatedPackages = packages.filter(p => p.id !== packageId);
      await projectsService.update(id, {
        photography_packages: updatedPackages
      });

      setPackages(updatedPackages);
      alert('Package deleted!');
    } catch (err) {
      console.error('Error deleting package:', err);
      alert('Failed to delete package.');
    }
  };

  const handleSetRecommended = async (packageId: string) => {
    if (!id) return;

    try {
      const updatedPackages = packages.map(p => ({
        ...p,
        recommended: p.id === packageId
      }));

      await projectsService.update(id, {
        photography_packages: updatedPackages
      });

      setPackages(updatedPackages);
    } catch (err) {
      console.error('Error updating recommended:', err);
    }
  };

  const handleEditPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !editingPackage) return;

    try {
      const updatedPackages = packages.map(p =>
        p.id === editingPackage.id ? {
          ...editingPackage,
          price: parseFloat(editPriceInput) || 0,
          imageCount: parseInt(editImageCountInput) || 0
        } : p
      );

      await projectsService.update(id, {
        photography_packages: updatedPackages
      });

      setPackages(updatedPackages);
      setEditingPackage(null);
      setShowEditPackageForm(false);
      alert('Package updated successfully!');
    } catch (err) {
      console.error('Error updating package:', err);
      alert('Failed to update package.');
    }
  };

  const updateEditFeature = (index: number, value: string) => {
    if (!editingPackage) return;
    const features = [...editingPackage.features];
    features[index] = value;
    setEditingPackage({ ...editingPackage, features });
  };

  const addEditFeatureField = () => {
    if (!editingPackage) return;
    setEditingPackage({
      ...editingPackage,
      features: [...editingPackage.features, '']
    });
  };

  const handleLoadDefaultPackages = async () => {
    if (!id) return;

    const confirmed = window.confirm(
      packages.length > 0
        ? 'This will replace all existing packages with default templates. Are you sure?'
        : 'Load default photography packages?'
    );
    if (!confirmed) return;

    try {
      // Generate new IDs for the default packages
      const packagesWithNewIds = defaultPhotographyPackages.map(pkg => ({
        ...pkg,
        id: `photo_pkg_${Date.now()}_${Math.random().toString(36).substring(7)}`
      }));

      await projectsService.update(id, {
        photography_packages: packagesWithNewIds
      });

      setPackages(packagesWithNewIds);
      alert('Default packages loaded successfully!');
    } catch (err) {
      console.error('Error loading defaults:', err);
      alert('Failed to load default packages.');
    }
  };

  const handlePackageSelect = async (packageId: string) => {
    if (!id || user?.role !== 'customer') return;

    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    try {
      await projectsService.update(id, {
        selected_photography_package: {
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          selectedAt: new Date().toISOString()
        }
      });

      setSelectedPackage(packageId);
      alert('Package selected!');
    } catch (err) {
      console.error('Error selecting package:', err);
      alert('Failed to select package.');
    }
  };

  const addFeatureField = () => {
    setNewPackage(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setNewPackage(prev => {
      const features = [...prev.features];
      features[index] = value;
      return { ...prev, features };
    });
  };

  const handlePhotographyPaymentSuccess = async () => {
    if (!id) return;
    try {
      await projectsService.update(id, {
        photography_payment_complete: true,
        photography_payment_date: new Date().toISOString()
      });
      setPhotographyPaymentComplete(true);
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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

  return (
    <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Photography</p>
        </div>
      </div>
      <ModuleNavigation project={project} />

      {user?.role === 'admin' && id && (
        <AdminStatusControl projectId={id} currentStatus={project.status} />
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Product Photography</h2>
          <p className="text-sm text-gray-500">Professional photos to showcase your product</p>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {/* Photo Inspiration Upload */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Upload Photo Inspiration</h3>
              <p className="text-sm text-gray-500 mb-4">
                Share examples of product photography you like to help our photographers understand your vision.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input type="file" multiple accept="image/*,.zip" className="hidden" id="photo-upload" onChange={handleFileChange} />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center">
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, GIF, or ZIP, up to 10MB each</p>
                </label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Files to Upload ({uploadedFiles.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="border rounded-md p-2 flex items-center relative">
                        <button
                          onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                        >
                          <XIcon className="h-3 w-3" />
                        </button>
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                          <span className="text-xs text-gray-500">IMG</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleInspirationUpload}
                    disabled={uploadingInspiration}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
                  >
                    {uploadingInspiration ? 'Uploading...' : 'Upload Files'}
                  </button>
                </div>
              )}
              {inspirationFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Inspiration ({inspirationFiles.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {inspirationFiles.map((url, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden">
                        <img src={url} alt={`Inspiration ${index + 1}`} className="w-full h-24 object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Photography Questionnaire */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Photography Questionnaire</h3>
              {user?.role === 'admin' ? (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Upload the photography questionnaire for customers to download.</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" accept=".pdf,.doc,.docx,.zip" className="hidden" id="questionnaire-upload" onChange={handleQuestionnaireUpload} />
                    <label htmlFor="questionnaire-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-700">Upload questionnaire document</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, or ZIP files</p>
                    </label>
                  </div>
                  {questionnaireUrl && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">Questionnaire uploaded</p>
                      </div>
                      <a href={questionnaireUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:text-green-900 text-sm">
                        View
                      </a>
                    </div>
                  )}

                  {/* Customer's Completed Questionnaire */}
                  {customerQuestionnaireUrl && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md flex items-center">
                      <FileTextIcon className="h-5 w-5 text-blue-500 mr-2" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-blue-800">Customer submitted questionnaire</p>
                      </div>
                      <a href={customerQuestionnaireUrl} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 text-sm">
                        View
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {questionnaireUrl ? (
                      <a
                        href={questionnaireUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <DownloadIcon className="mr-2 h-5 w-5 text-gray-500" />
                        Download Questionnaire
                      </a>
                    ) : (
                      <p className="text-sm text-gray-500">Questionnaire not yet available.</p>
                    )}
                  </div>

                  {/* Customer Questionnaire Upload */}
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Upload Completed Questionnaire</h4>
                    <p className="text-xs text-gray-500 mb-3">
                      After filling out the questionnaire, upload it here for our team to review.
                    </p>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.zip"
                        className="hidden"
                        id="customer-questionnaire-upload"
                        onChange={async (e) => {
                          if (!id || !e.target.files || !e.target.files[0]) return;
                          const file = e.target.files[0];
                          const fileExt = file.name.split('.').pop();
                          const fileName = `${id}/customer_questionnaire_${Date.now()}.${fileExt}`;

                          try {
                            const { error: uploadError } = await supabase.storage
                              .from('project-files')
                              .upload(fileName, file);

                            if (uploadError) throw uploadError;

                            const { data: urlData } = supabase.storage
                              .from('project-files')
                              .getPublicUrl(fileName);

                            await projectsService.update(id, {
                              customer_questionnaire_url: urlData.publicUrl
                            });

                            setCustomerQuestionnaireUrl(urlData.publicUrl);
                            alert('Questionnaire uploaded successfully!');
                          } catch (err) {
                            console.error('Error uploading questionnaire:', err);
                            alert('Failed to upload questionnaire.');
                          }
                        }}
                      />
                      <label
                        htmlFor="customer-questionnaire-upload"
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                      >
                        <UploadIcon className="mr-2 h-4 w-4 text-gray-500" />
                        Choose File
                      </label>
                      {customerQuestionnaireUrl && (
                        <div className="flex items-center gap-2">
                          <CheckIcon className="h-5 w-5 text-green-500" />
                          <a
                            href={customerQuestionnaireUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary-600 hover:text-primary-800"
                          >
                            View Uploaded Questionnaire
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Photography Packages */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">Photography Packages</h3>
                {user?.role === 'admin' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleLoadDefaultPackages}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PackageIcon className="h-4 w-4 mr-1" />
                      Load Defaults
                    </button>
                    <button
                      onClick={() => setShowAddPackageForm(true)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Package
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">Select a photography package that fits your needs.</p>

              {packages.length === 0 ? (
                <div className="bg-gray-50 border rounded-md p-6 text-center">
                  <p className="text-sm text-gray-500">
                    {user?.role === 'admin' ? 'No packages added yet. Add a package to get started.' : 'Photography packages will appear here once available.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {packages.map(pkg => (
                    <div
                      key={pkg.id}
                      className={`border rounded-lg p-4 relative ${
                        selectedPackage === pkg.id ? 'ring-2 ring-primary-500 bg-primary-50' : 'hover:bg-gray-50'
                      } ${pkg.recommended ? 'border-primary-500' : 'border-gray-200'} ${user?.role === 'customer' ? 'cursor-pointer' : ''}`}
                      onClick={() => user?.role === 'customer' && handlePackageSelect(pkg.id)}
                    >
                      {pkg.recommended && (
                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                          <span className="bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">Recommended</span>
                        </div>
                      )}
                      <h4 className="text-lg font-medium text-gray-900">{pkg.name}</h4>
                      <div className="mt-1 mb-2">
                        <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{pkg.description}</p>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckIcon className="h-5 w-5 text-primary-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {user?.role === 'admin' && (
                        <div className="mt-4 pt-3 border-t border-gray-200 flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); handleSetRecommended(pkg.id); }}
                            className={`p-1 rounded ${pkg.recommended ? 'text-primary-600' : 'text-gray-400 hover:text-primary-600'}`}
                            title="Set as recommended"
                          >
                            <StarIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingPackage(pkg);
                              setEditPriceInput(pkg.price.toString());
                              setEditImageCountInput(pkg.imageCount.toString());
                              setShowEditPackageForm(true);
                            }}
                            className="p-1 text-gray-400 hover:text-primary-600 rounded"
                            title="Edit package"
                          >
                            <EditIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handleDeletePackage(pkg.id); }}
                            className="p-1 text-red-500 hover:text-red-700 rounded"
                            title="Delete package"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Assets (for customer) */}
            {user?.role === 'customer' && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Completed Assets</h3>
                <p className="text-sm text-gray-500 mb-4">Download your completed photography assets when they're ready.</p>
                {completedAssets.length > 0 ? (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="space-y-3">
                      {completedAssets.map((asset: any) => (
                        <div key={asset.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary-100 rounded flex items-center justify-center mr-3">
                              <FileTextIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                              <p className="text-xs text-gray-500">{asset.size} MB</p>
                            </div>
                          </div>
                          <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
                            <DownloadIcon className="h-4 w-4 mr-1" />
                            Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 border rounded-md p-4 text-center">
                    <p className="text-sm text-gray-500">Your photography assets will appear here once they're ready for download.</p>
                  </div>
                )}
              </div>
            )}

            {/* Admin: Upload Completed Assets */}
            {user?.role === 'admin' && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Completed Photography Assets</h3>
                <p className="text-sm text-gray-500 mb-4">Upload completed photography assets for the customer to download.</p>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4">
                  <input
                    type="file"
                    accept="image/*,.zip,.pdf"
                    multiple
                    className="hidden"
                    id="completed-assets-upload"
                    onChange={async (e) => {
                      if (!id || !e.target.files || e.target.files.length === 0) return;

                      try {
                        const newAssets: any[] = [];

                        for (const file of Array.from(e.target.files)) {
                          const fileExt = file.name.split('.').pop();
                          const fileName = `${id}/completed_assets_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

                          const { error: uploadError } = await supabase.storage
                            .from('project-files')
                            .upload(fileName, file);

                          if (uploadError) throw uploadError;

                          const { data: urlData } = supabase.storage
                            .from('project-files')
                            .getPublicUrl(fileName);

                          newAssets.push({
                            id: `asset_${Date.now()}_${Math.random().toString(36).substring(7)}`,
                            name: file.name,
                            url: urlData.publicUrl,
                            size: (file.size / (1024 * 1024)).toFixed(2),
                            uploadedAt: new Date().toISOString()
                          });
                        }

                        const allAssets = [...completedAssets, ...newAssets];
                        await projectsService.update(id, {
                          completed_photography_assets: allAssets
                        });

                        setCompletedAssets(allAssets);
                        alert('Assets uploaded successfully!');
                      } catch (err) {
                        console.error('Error uploading assets:', err);
                        alert('Failed to upload assets.');
                      }
                    }}
                  />
                  <label htmlFor="completed-assets-upload" className="cursor-pointer flex flex-col items-center justify-center">
                    <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-700">Upload completed photography assets</p>
                    <p className="text-xs text-gray-500 mt-1">Images, PDF, or ZIP files</p>
                  </label>
                </div>

                {completedAssets.length > 0 && (
                  <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Uploaded Assets ({completedAssets.length})</h4>
                    <div className="space-y-3">
                      {completedAssets.map((asset: any) => (
                        <div key={asset.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary-100 rounded flex items-center justify-center mr-3">
                              <FileTextIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{asset.name}</p>
                              <p className="text-xs text-gray-500">{asset.size} MB</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={asset.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
                              <DownloadIcon className="h-4 w-4 mr-1" />
                              View
                            </a>
                            <button
                              onClick={async () => {
                                if (!window.confirm('Delete this asset?')) return;
                                const updatedAssets = completedAssets.filter((a: any) => a.id !== asset.id);
                                await projectsService.update(id!, {
                                  completed_photography_assets: updatedAssets
                                });
                                setCompletedAssets(updatedAssets);
                              }}
                              className="text-red-500 hover:text-red-700 text-sm"
                            >
                              <TrashIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Section */}
            {selectedPackage && user?.role === 'customer' && (
              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Selected Package</h3>
                      <p className="text-sm text-gray-500">
                        {packages.find(p => p.id === selectedPackage)?.name}
                      </p>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      ${packages.find(p => p.id === selectedPackage)?.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="mt-4">
                    {photographyPaymentComplete ? (
                      <div className="w-full inline-flex items-center justify-center py-2 px-4 bg-green-100 text-green-800 rounded-md">
                        <CheckIcon className="mr-2 h-5 w-5" />
                        Payment Complete
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowPaymentModal(true)}
                        className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                      >
                        <CreditCardIcon className="mr-2 h-5 w-5" />
                        Make Payment
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Package Modal */}
      {showAddPackageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Add Photography Package</h3>
              <button onClick={() => setShowAddPackageForm(false)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddPackage} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Name</label>
                <input
                  type="text"
                  value={newPackage.name}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="text"
                    value={priceInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setPriceInput(val);
                        setNewPackage(prev => ({ ...prev, price: parseFloat(val) || 0 }));
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image Count</label>
                  <input
                    type="text"
                    value={imageCountInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*$/.test(val)) {
                        setImageCountInput(val);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newPackage.videoIncluded}
                    onChange={(e) => setNewPackage(prev => ({ ...prev, videoIncluded: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 mr-2"
                  />
                  <span className="text-sm text-gray-700">Includes Video</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newPackage.description}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <button type="button" onClick={addFeatureField} className="text-xs text-primary-600 hover:text-primary-800">
                    + Add Feature
                  </button>
                </div>
                {newPackage.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    placeholder={`Feature ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddPackageForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Add Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Package Modal */}
      {showEditPackageForm && editingPackage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Edit Photography Package</h3>
              <button onClick={() => { setShowEditPackageForm(false); setEditingPackage(null); }} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditPackage} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Package Name</label>
                <input
                  type="text"
                  value={editingPackage.name}
                  onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input
                    type="text"
                    value={editPriceInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*\.?\d*$/.test(val)) {
                        setEditPriceInput(val);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Image Count</label>
                  <input
                    type="text"
                    value={editImageCountInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '' || /^\d*$/.test(val)) {
                        setEditImageCountInput(val);
                      }
                    }}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingPackage.videoIncluded}
                    onChange={(e) => setEditingPackage({ ...editingPackage, videoIncluded: e.target.checked })}
                    className="rounded border-gray-300 text-primary-600 mr-2"
                  />
                  <span className="text-sm text-gray-700">Includes Video</span>
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={editingPackage.description}
                  onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                  rows={2}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Features</label>
                  <button type="button" onClick={addEditFeatureField} className="text-xs text-primary-600 hover:text-primary-800">
                    + Add Feature
                  </button>
                </div>
                {editingPackage.features.map((feature, index) => (
                  <input
                    key={index}
                    type="text"
                    value={feature}
                    onChange={(e) => updateEditFeature(index, e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                    placeholder={`Feature ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => { setShowEditPackageForm(false); setEditingPackage(null); }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Photography Payment Modal */}
      {id && selectedPackage && (
        <StripePaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePhotographyPaymentSuccess}
          projectId={id}
          paymentType="photography"
          amount={packages.find(p => p.id === selectedPackage)?.price || 0}
          title="Photography Package Payment"
          description={`Payment for ${packages.find(p => p.id === selectedPackage)?.name || 'photography package'}.`}
        />
      )}
    </div>
  );
};

export default Photography;
