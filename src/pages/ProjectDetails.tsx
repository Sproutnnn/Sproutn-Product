import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, CreditCardIcon, UploadIcon, XIcon, PlusIcon, DownloadIcon, ImageIcon, CheckIcon, TrashIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
import { supabase } from '../lib/supabase';
const ProjectDetails: React.FC = () => {
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    keyFeatures: ['', '', ''],
    targetMarket: ''
  });
  const [starterFee, setStarterFee] = useState<number>(399);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<string[]>([]);
  const [showUploadConfirm, setShowUploadConfirm] = useState(false);
  const [uploading, setUploading] = useState(false);
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

        // Load form data from database
        setFormData({
          description: projectData.description || '',
          keyFeatures: projectData.key_features || ['', '', ''],
          targetMarket: projectData.target_market || ''
        });

        // Load starter fee
        if (projectData.starter_fee) {
          setStarterFee(projectData.starter_fee);
        }

        // Load existing uploaded files
        if (projectData.uploaded_files && projectData.uploaded_files.length > 0) {
          setExistingFiles(projectData.uploaded_files);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleFeatureChange = (index: number, value: string) => {
    setFormData(prev => {
      const newFeatures = [...prev.keyFeatures];
      newFeatures[index] = value;
      return {
        ...prev,
        keyFeatures: newFeatures
      };
    });
  };
  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: [...prev.keyFeatures, '']
    }));
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);

      // Filter to only allow JPG and PNG files
      const validFiles = filesArray.filter(file => {
        const extension = file.name.toLowerCase().split('.').pop();
        return ['jpg', 'jpeg', 'png'].includes(extension || '');
      });

      if (validFiles.length === 0) {
        alert('Please select only JPG or PNG files.');
        return;
      }

      if (validFiles.length < filesArray.length) {
        alert(`${filesArray.length - validFiles.length} file(s) were skipped. Only JPG and PNG files are allowed.`);
      }

      setUploadedFiles(validFiles);
      setShowUploadConfirm(true);
    }
  };

  const handleUploadConfirm = async () => {
    if (!id || uploadedFiles.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of uploadedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

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

      // Combine with existing files and save to database
      const allFiles = [...existingFiles, ...uploadedUrls];
      await projectsService.update(id, {
        uploaded_files: allFiles
      });

      setExistingFiles(allFiles);
      setUploadedFiles([]);
      setShowUploadConfirm(false);
      alert('Files uploaded successfully!');
    } catch (err) {
      console.error('Error uploading files:', err);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleUploadCancel = () => {
    setUploadedFiles([]);
    setShowUploadConfirm(false);
  };

  const handleDeleteExistingFile = async (fileUrl: string, index: number) => {
    if (!id) return;

    const confirmed = window.confirm('Are you sure you want to delete this image?');
    if (!confirmed) return;

    try {
      // Extract the file path from the URL for deletion from storage
      const urlParts = fileUrl.split('/project-files/');
      if (urlParts.length > 1) {
        const filePath = urlParts[1];
        await supabase.storage.from('project-files').remove([filePath]);
      }

      // Update the project to remove the file from the list
      const newFiles = existingFiles.filter((_, i) => i !== index);
      await projectsService.update(id, {
        uploaded_files: newFiles
      });

      setExistingFiles(newFiles);
      alert('Image deleted successfully!');
    } catch (err) {
      console.error('Error deleting file:', err);
      alert('Failed to delete image. Please try again.');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await projectsService.update(id, {
        description: formData.description,
        key_features: formData.keyFeatures.filter(f => f.trim() !== ''),
        target_market: formData.targetMarket,
        starter_fee: starterFee,
        status: 'prototyping' // Move to next step
      });

      alert('Brief saved successfully!');
      // Navigate to the next step
      navigate(`/project/${id}/prototyping`);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save brief');
    }
  };

  const handleSaveStarterFee = async () => {
    if (!id) return;

    try {
      await projectsService.update(id, {
        starter_fee: starterFee
      });
      alert('Starter fee updated successfully!');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update starter fee');
    }
  };
  const handlePayment = () => {
    setShowPaymentModal(true);
  };
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment
    setTimeout(() => {
      setShowPaymentModal(false);
      // In a real app, you would update the project status here
      alert('Payment processed successfully!');
    }, 500);
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
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-2">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back to Dashboard
      </button>
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Created on {new Date(project.created_at).toLocaleDateString()}
          </p>
          {project.project_code && (
            <p className="text-sm text-gray-600 mt-1 font-mono bg-gray-100 inline-block px-2 py-1 rounded">
              {project.project_code}
            </p>
          )}
        </div>
      </div>
      {/* Module Navigation */}
      <ModuleNavigation project={project} />

      {/* Admin Project Status Control */}
      {user?.role === 'admin' && <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-blue-800">Project Status</h3>
              <p className="text-xs text-blue-700 mt-1">
                Change to "Production" to unlock Photography and Marketing for customer
              </p>
            </div>
            <div className="flex items-center gap-3">
              <select value={project.status} onChange={async (e) => {
            const newStatus = e.target.value;
            console.log('Attempting to update status to:', newStatus);
            console.log('Project ID:', id);

            try {
              const updatedProject = await projectsService.updateProjectStatus(id!, newStatus);
              console.log('Status updated successfully, new project data:', updatedProject);
              // Update local state with new data
              setProject(updatedProject);
              alert(`Project status updated to "${newStatus}" successfully!`);
              // Force reload the page to ensure all components get new data
              window.location.reload();
            } catch (err) {
              console.error('Failed to update status - Full error:', err);
              const errorMessage = err instanceof Error ? err.message : 'Unknown error';
              alert(`Failed to update project status: ${errorMessage}`);
            }
          }} className="block border border-blue-300 bg-white rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="draft">Draft</option>
                <option value="details">Brief</option>
                <option value="prototyping">Prototyping</option>
                <option value="sourcing">Sourcing</option>
                <option value="payment">To Pay</option>
                <option value="production">Production</option>
                <option value="shipping">Shipping</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Brief</h2>
          <p className="text-sm text-gray-500">
            Complete your product brief to get started
          </p>
        </div>
        <div className="p-6">
          {user?.role === 'customer' && <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Product Information
              </h3>
              {project.description && <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Description
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200">
                    {project.description}
                  </p>
                </div>}
              {project.key_features && project.key_features.length > 0 && project.key_features[0] !== '' && <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Key Features
                    </h4>
                    <ul className="mt-1 list-disc list-inside text-sm text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200">
                      {project.key_features.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>
                  </div>}
              {project.target_market && <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Target Market
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200">
                    {project.target_market}
                  </p>
                </div>}
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Upload Product Images
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Share sketches, mockups or reference images of your product
                  idea
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input type="file" multiple accept=".jpg,.jpeg,.png" className="hidden" id="product-upload" onChange={handleFileChange} />
                  <label htmlFor="product-upload" className="cursor-pointer flex flex-col items-center justify-center">
                    <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-700">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG or PNG only, up to 10MB each
                    </p>
                  </label>
                </div>
                {existingFiles.length > 0 && <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Your Uploaded Files ({existingFiles.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {existingFiles.map((fileUrl, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden relative group">
                          <div className="aspect-square bg-gray-100">
                            <img
                              src={fileUrl}
                              alt={`Uploaded file ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => handleDeleteExistingFile(fileUrl, index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            title="Delete image"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>}
              </div>
            </div>}
          {user?.role === 'admin' && <>
              {/* Customer Uploaded Files Section - Always visible for admin */}
              <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-3 flex items-center">
                  <ImageIcon className="h-5 w-5 mr-2 text-blue-600" />
                  Customer Uploaded Images
                  {project.uploaded_files && project.uploaded_files.length > 0 && (
                    <span className="ml-2 text-sm text-gray-500">({project.uploaded_files.length})</span>
                  )}
                </h3>
                {project.uploaded_files && project.uploaded_files.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {project.uploaded_files.map((fileUrl: string, index: number) => (
                      <div key={index} className="bg-white border rounded-lg overflow-hidden shadow-sm">
                        <div className="aspect-square bg-gray-100 flex items-center justify-center">
                          <img
                            src={fileUrl}
                            alt={`Uploaded file ${index + 1}`}
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
                            href={fileUrl}
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
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No images uploaded by customer yet</p>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Product Description *
                  </label>
                  <textarea name="description" id="description" rows={4} required value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Detailed description of the product" />
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-700">
                      Key Features *
                    </label>
                    <button type="button" onClick={handleAddFeature} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Feature
                    </button>
                  </div>
                  <div className="space-y-2 mt-1">
                    {formData.keyFeatures && formData.keyFeatures.map((feature, index) => <input key={index} type="text" required value={feature} onChange={e => handleFeatureChange(index, e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder={`Feature ${index + 1}`} />)}
                  </div>
                </div>
                <div>
                  <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700">
                    Target Market *
                  </label>
                  <input type="text" name="targetMarket" id="targetMarket" required value={formData.targetMarket} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="e.g., Young professionals, Parents, etc." />
                </div>
              </div>
              <div className="mt-8">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        Starter Fee
                      </h3>
                      <p className="text-sm text-gray-500">
                        One-time fee for project setup and brief creation
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg text-gray-500">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={starterFee}
                        onChange={(e) => setStarterFee(parseFloat(e.target.value) || 0)}
                        className="w-28 text-xl font-bold text-gray-900 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                      <button
                        type="button"
                        onClick={handleSaveStarterFee}
                        className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Save and Continue
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
            </>}
          {user?.role === 'customer' && <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Starter Fee
                  </h3>
                  <p className="text-sm text-gray-500">
                    One-time fee for project setup and brief creation
                  </p>
                </div>
                <div className="text-xl font-bold text-gray-900">${(project.starter_fee || 399).toFixed(2)}</div>
              </div>
              <div className="mt-4">
                <button type="button" onClick={handlePayment} className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <CreditCardIcon className="mr-2 h-5 w-5" />
                  Make Payment
                </button>
              </div>
            </div>}
        </div>
      </div>
      {/* Payment Modal */}
      {showPaymentModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handlePaymentSubmit} className="p-4">
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
                    Name on card
                  </label>
                  <input type="text" id="cardName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                    Card number
                  </label>
                  <input type="text" id="cardNumber" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="4242 4242 4242 4242" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expDate" className="block text-sm font-medium text-gray-700">
                      Expiration date
                    </label>
                    <input type="text" id="expDate" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="MM/YY" required />
                  </div>
                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <input type="text" id="cvc" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="123" required />
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>Starter Fee</span>
                    <span>${(project.starter_fee || 399).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                    <span className="text-base font-medium text-gray-900">
                      Total
                    </span>
                    <span className="text-base font-medium text-gray-900">
                      ${(project.starter_fee || 399).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <CreditCardIcon className="mr-2 h-5 w-5" />
                  Pay ${(project.starter_fee || 399).toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>}

      {/* Upload Confirmation Modal */}
      {showUploadConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">Confirm Upload</h3>
              <button onClick={handleUploadCancel} className="text-gray-400 hover:text-gray-500">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                You are about to upload {uploadedFiles.length} file{uploadedFiles.length > 1 ? 's' : ''}:
              </p>
              <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                    <ImageIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleUploadCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadConfirm}
                  disabled={uploading}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-500 rounded-md hover:bg-primary-600 disabled:bg-gray-300"
                >
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>;
};
export default ProjectDetails;