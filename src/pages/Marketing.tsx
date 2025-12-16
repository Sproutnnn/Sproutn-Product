import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UploadIcon, CreditCardIcon, LinkIcon, CheckIcon, DownloadIcon, FileIcon, PlusIcon, TrashIcon, StarIcon, XIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ModuleNavigation from '../components/ModuleNavigation';
import AdminStatusControl from '../components/AdminStatusControl';
import { projectsService } from '../services/projects.service';
import { supabase } from '../lib/supabase';

interface MarketingPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  recommended: boolean;
}

const Marketing: React.FC = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    targetAudience: '',
    brandDescription: '',
    competitors: '',
    goals: '',
    marketingBudget: '',
    websiteUrls: ['']
  });
  const [brandInspirationFiles, setBrandInspirationFiles] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadingBrand, setUploadingBrand] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [recommendedPackageFile, setRecommendedPackageFile] = useState<string | null>(null);
  const [recommendedPackageFileName, setRecommendedPackageFileName] = useState<string | null>(null);
  const [uploadingRecommended, setUploadingRecommended] = useState(false);
  const [packages, setPackages] = useState<MarketingPackage[]>([]);

  // Admin form state
  const [showAddPackageForm, setShowAddPackageForm] = useState(false);
  const [newPackage, setNewPackage] = useState<Omit<MarketingPackage, 'id'>>({
    name: '',
    price: 0,
    description: '',
    features: [''],
    recommended: false
  });

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

        // Load marketing data from database
        if (projectData.marketing_plan_data) {
          setFormData({
            targetAudience: projectData.marketing_plan_data.targetAudience || '',
            brandDescription: projectData.marketing_plan_data.brandDescription || '',
            competitors: projectData.marketing_plan_data.competitors || '',
            goals: projectData.marketing_plan_data.goals || '',
            marketingBudget: projectData.marketing_plan_data.marketingBudget || '',
            websiteUrls: projectData.marketing_plan_data.websiteUrls || ['']
          });
          if (projectData.marketing_plan_data.brandInspirationFiles) {
            setBrandInspirationFiles(projectData.marketing_plan_data.brandInspirationFiles);
          }
        }

        if (projectData.marketing_packages && projectData.marketing_packages.length > 0) {
          setPackages(projectData.marketing_packages);
        }

        if (projectData.selected_marketing_package) {
          setSelectedPackage(projectData.selected_marketing_package.id);
        }

        if (projectData.recommended_package_url) {
          setRecommendedPackageFile(projectData.recommended_package_url);
          setRecommendedPackageFileName(projectData.recommended_package_name || 'Recommended Package');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUrlChange = (index: number, value: string) => {
    setFormData(prev => {
      const newUrls = [...prev.websiteUrls];
      newUrls[index] = value;
      return { ...prev, websiteUrls: newUrls };
    });
  };

  const handleAddUrl = () => {
    setFormData(prev => ({
      ...prev,
      websiteUrls: [...prev.websiteUrls, '']
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const handleBrandUpload = async () => {
    if (!id || uploadedFiles.length === 0) return;

    setUploadingBrand(true);
    try {
      const uploadedUrls: string[] = [];

      for (const file of uploadedFiles) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${id}/marketing_brand_${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('project-files')
          .getPublicUrl(fileName);

        uploadedUrls.push(urlData.publicUrl);
      }

      const allFiles = [...brandInspirationFiles, ...uploadedUrls];

      await projectsService.update(id, {
        marketing_plan_data: {
          ...formData,
          brandInspirationFiles: allFiles
        }
      });

      setBrandInspirationFiles(allFiles);
      setUploadedFiles([]);
      alert('Brand inspiration files uploaded successfully!');
    } catch (err) {
      console.error('Error uploading files:', err);
      alert('Failed to upload files. Please try again.');
    } finally {
      setUploadingBrand(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setSaving(true);
    try {
      await projectsService.update(id, {
        marketing_plan_data: {
          ...formData,
          brandInspirationFiles
        }
      });
      alert('Marketing plan information saved successfully!');
    } catch (err) {
      console.error('Error saving marketing data:', err);
      alert('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleAddPackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const pkg: MarketingPackage = {
        ...newPackage,
        id: `mkt_pkg_${Date.now()}`
      };

      const updatedPackages = [...packages, pkg];
      await projectsService.update(id, {
        marketing_packages: updatedPackages
      });

      setPackages(updatedPackages);
      setNewPackage({
        name: '',
        price: 0,
        description: '',
        features: [''],
        recommended: false
      });
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
        marketing_packages: updatedPackages
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
        marketing_packages: updatedPackages
      });

      setPackages(updatedPackages);
    } catch (err) {
      console.error('Error updating recommended:', err);
    }
  };

  const handlePackageSelect = async (packageId: string) => {
    if (!id || user?.role !== 'customer') return;

    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;

    try {
      await projectsService.update(id, {
        selected_marketing_package: {
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

  const handleRecommendedPackageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0] || !id) return;

    const file = e.target.files[0];
    setUploadingRecommended(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${id}/recommended_package_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('project-files')
        .getPublicUrl(fileName);

      await projectsService.update(id, {
        recommended_package_url: urlData.publicUrl,
        recommended_package_name: file.name
      });

      setRecommendedPackageFile(urlData.publicUrl);
      setRecommendedPackageFileName(file.name);
      alert('Recommended package uploaded successfully!');
    } catch (err) {
      console.error('Error uploading recommended package:', err);
      alert('Failed to upload file. Please try again.');
    } finally {
      setUploadingRecommended(false);
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
          <p className="text-sm text-gray-500 mt-1">Marketing Plan</p>
        </div>
      </div>
      <ModuleNavigation project={project} />

      {user?.role === 'admin' && id && (
        <AdminStatusControl projectId={id} currentStatus={project.status} />
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Marketing Plan</h2>
          <p className="text-sm text-gray-500">Develop a strategy to launch your product</p>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {/* Marketing Plan Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">Target Audience</label>
                  <textarea
                    id="targetAudience"
                    name="targetAudience"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Describe your ideal customer"
                    value={formData.targetAudience}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="brandDescription" className="block text-sm font-medium text-gray-700">Brand Description</label>
                  <textarea
                    id="brandDescription"
                    name="brandDescription"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Describe your brand's voice, values, and personality"
                    value={formData.brandDescription}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="competitors" className="block text-sm font-medium text-gray-700">Competitors</label>
                  <textarea
                    id="competitors"
                    name="competitors"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="List your main competitors and what makes your product different"
                    value={formData.competitors}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700">Marketing Goals</label>
                  <textarea
                    id="goals"
                    name="goals"
                    rows={3}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="What are your key marketing objectives?"
                    value={formData.goals}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="marketingBudget" className="block text-sm font-medium text-gray-700">Marketing Budget</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="text"
                      name="marketingBudget"
                      id="marketingBudget"
                      className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                      placeholder="0.00"
                      value={formData.marketingBudget}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                </div>
                {/* Website URL Inspiration */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">Website URL Inspiration</label>
                    <button type="button" onClick={handleAddUrl} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200">
                      + Add URL
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.websiteUrls.map((url, index) => (
                      <div key={index} className="flex items-center">
                        <div className="flex-grow relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LinkIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            value={url}
                            onChange={e => handleUrlChange(index, e.target.value)}
                            className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
                >
                  {saving ? 'Saving...' : 'Save Information'}
                </button>
              </div>
            </form>

            {/* Brand Inspiration Upload */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Upload Brand Inspiration</h3>
              <p className="text-sm text-gray-500 mb-4">Share brand assets, inspiration, or examples to help us understand your brand identity.</p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input type="file" multiple className="hidden" id="brand-upload" onChange={handleFileChange} />
                <label htmlFor="brand-upload" className="cursor-pointer flex flex-col items-center justify-center">
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">Drag and drop files here or click to browse</p>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF, or DOC files</p>
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
                          <span className="text-xs text-gray-500">FILE</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-gray-900 truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handleBrandUpload}
                    disabled={uploadingBrand}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
                  >
                    {uploadingBrand ? 'Uploading...' : 'Upload Files'}
                  </button>
                </div>
              )}
              {brandInspirationFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Brand Files ({brandInspirationFiles.length})</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {brandInspirationFiles.map((url, index) => (
                      <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="border rounded-lg p-2 flex items-center hover:bg-gray-50">
                        <FileIcon className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-xs text-gray-700 truncate">File {index + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Marketing Packages */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-900">Marketing Packages</h3>
                {user?.role === 'admin' && (
                  <button
                    onClick={() => setShowAddPackageForm(true)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Package
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4">Select a marketing package that fits your launch needs.</p>

              {packages.length === 0 ? (
                <div className="bg-gray-50 border rounded-md p-6 text-center">
                  <p className="text-sm text-gray-500">
                    {user?.role === 'admin' ? 'No packages added yet. Add a package to get started.' : 'Marketing packages will appear here once available.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* Recommended Package File Section */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Recommended Package Document</h3>
              <p className="text-sm text-gray-500 mb-4">
                {user?.role === 'admin'
                  ? 'Upload a customized marketing package recommendation for this client.'
                  : 'Download your personalized marketing package recommendation.'}
              </p>

              {user?.role === 'admin' ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      className="hidden"
                      id="recommended-package-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleRecommendedPackageUpload}
                      disabled={uploadingRecommended}
                    />
                    <label htmlFor="recommended-package-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <UploadIcon className={`h-10 w-10 mb-3 ${uploadingRecommended ? 'text-gray-300' : 'text-gray-400'}`} />
                      <p className="text-sm font-medium text-gray-700">
                        {uploadingRecommended ? 'Uploading...' : 'Click to upload recommended package'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PDF or DOC files</p>
                    </label>
                  </div>
                  {recommendedPackageFile && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <FileIcon className="h-8 w-8 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{recommendedPackageFileName}</p>
                          <p className="text-xs text-green-600">Uploaded successfully</p>
                        </div>
                      </div>
                      <a href={recommendedPackageFile} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-600 hover:text-primary-800">
                        View
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {recommendedPackageFile ? (
                    <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileIcon className="h-10 w-10 text-primary-600 mr-4" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">{recommendedPackageFileName}</p>
                            <p className="text-xs text-gray-500">Your personalized marketing recommendation</p>
                          </div>
                        </div>
                        <a
                          href={recommendedPackageFile}
                          download={recommendedPackageFileName}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                        >
                          <DownloadIcon className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                      <FileIcon className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No recommended package available yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Payment Section */}
            {selectedPackage && user?.role === 'customer' && (
              <div className="border-t border-gray-200 pt-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Selected Package</h3>
                      <p className="text-sm text-gray-500">{packages.find(p => p.id === selectedPackage)?.name}</p>
                    </div>
                    <div className="text-xl font-bold text-gray-900">
                      ${packages.find(p => p.id === selectedPackage)?.price.toFixed(2)}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700">
                      <CreditCardIcon className="mr-2 h-5 w-5" />
                      Make Payment
                    </button>
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
              <h3 className="text-lg font-medium text-gray-900">Add Marketing Package</h3>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  value={newPackage.price}
                  onChange={(e) => setNewPackage(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
                  required
                />
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
    </div>
  );
};

export default Marketing;
