import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UploadIcon, CreditCardIcon, LinkIcon, CheckIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ModuleNavigation from '../components/ModuleNavigation';
import { projectsService } from '../services/projects.service';
const Marketing: React.FC = () => {
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
  const [project, setProject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    targetAudience: '',
    brandDescription: '',
    competitors: '',
    goals: '',
    websiteUrls: ['']
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [packages, setPackages] = useState([{
    id: 'basic',
    name: 'Basic Marketing Package',
    price: 599,
    description: 'Essential marketing strategy for product launch',
    features: ['Marketing strategy document', 'Social media launch plan', 'Basic SEO recommendations', 'Content calendar (1 month)'],
    recommended: false
  }, {
    id: 'standard',
    name: 'Standard Marketing Package',
    price: 999,
    description: 'Comprehensive marketing strategy with extended support',
    features: ['Marketing strategy document', 'Social media launch plan', 'Basic SEO recommendations', 'Content calendar (2 months)', 'Ad campaign strategy'],
    recommended: false
  }, {
    id: 'premium',
    name: 'Premium Marketing Package',
    price: 1799,
    description: 'Complete marketing solution with brand development',
    features: ['Detailed marketing strategy document', 'Social media launch plan', 'Basic SEO strategy', 'Content calendar (3 months)', 'Ad campaign strategy', 'Website template', 'Brand identity development', 'Logo design'],
    recommended: true
  }]);
  const toggleRecommended = (packageId: string) => {
    if (user?.role === 'admin') {
      setPackages(packages.map(pkg => ({
        ...pkg,
        recommended: pkg.id === packageId
      })));
    }
  };
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

        // TODO: Load marketing data (packages, form data) from database when migration is ready
        // For now, packages and form data use mock/default values
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
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleUrlChange = (index: number, value: string) => {
    setFormData(prev => {
      const newUrls = [...prev.websiteUrls];
      newUrls[index] = value;
      return {
        ...prev,
        websiteUrls: newUrls
      };
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
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    alert('Marketing plan information submitted successfully!');
  };
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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
        Back
      </button>
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Marketing Plan</p>
        </div>
      </div>
      {/* Module Navigation */}
      <ModuleNavigation project={project} />
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Marketing Plan
          </h2>
          <p className="text-sm text-gray-500">
            Develop a strategy to launch your product
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {/* Marketing Plan Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="targetAudience" className="block text-sm font-medium text-gray-700">
                    Target Audience
                  </label>
                  <textarea id="targetAudience" name="targetAudience" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Describe your ideal customer" value={formData.targetAudience} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="brandDescription" className="block text-sm font-medium text-gray-700">
                    Brand Description
                  </label>
                  <textarea id="brandDescription" name="brandDescription" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="Describe your brand's voice, values, and personality" value={formData.brandDescription} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="competitors" className="block text-sm font-medium text-gray-700">
                    Competitors
                  </label>
                  <textarea id="competitors" name="competitors" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="List your main competitors and what makes your product different" value={formData.competitors} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="goals" className="block text-sm font-medium text-gray-700">
                    Marketing Goals
                  </label>
                  <textarea id="goals" name="goals" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="What are your key marketing objectives?" value={formData.goals} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="marketingBudget" className="block text-sm font-medium text-gray-700">
                    Marketing Budget
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input type="text" name="marketingBudget" id="marketingBudget" className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">USD</span>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Enter your total marketing budget for this product launch
                  </p>
                </div>
                {/* Website URL Inspiration */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Website URL Inspiration
                    </label>
                    <button type="button" onClick={handleAddUrl} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                      + Add URL
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    Share websites that inspire you or have elements you'd like
                    to incorporate in your marketing
                  </p>
                  <div className="space-y-2">
                    {formData.websiteUrls.map((url, index) => <div key={index} className="flex items-center">
                        <div className="flex-grow relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <LinkIcon className="h-4 w-4 text-gray-400" />
                          </div>
                          <input type="url" value={url} onChange={e => handleUrlChange(index, e.target.value)} className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder="https://example.com" />
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Save Information
                </button>
              </div>
            </form>
            {/* Brand Inspiration Upload */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Upload Brand Inspiration
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Share brand assets, inspiration, or examples to help us
                understand your brand identity.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input type="file" multiple className="hidden" id="brand-upload" onChange={handleFileChange} />
                <label htmlFor="brand-upload" className="cursor-pointer flex flex-col items-center justify-center">
                  <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-700">
                    Drag and drop files here or click to browse
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG, PDF, or DOC files
                  </p>
                </label>
              </div>
              {uploadedFiles.length > 0 && <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Uploaded Files ({uploadedFiles.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {uploadedFiles.map((file, index) => <div key={index} className="border rounded-md p-2 flex items-center">
                        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-md flex items-center justify-center mr-2">
                          <span className="text-xs text-gray-500">FILE</span>
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
            {/* Marketing Packages */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Choose Your Marketing Package
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Select a marketing package that fits your launch needs.
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
                    <div className="mt-1 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        ${pkg.price}
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
            {/* Payment Section */}
            <div className="border-t border-gray-200 pt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Marketing Package
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedPackage ? packages.find(p => p.id === selectedPackage)?.name : 'No package selected'}
                    </p>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {selectedPackage ? '$' + packages.find(p => p.id === selectedPackage)?.price.toFixed(2) : '-'}
                  </div>
                </div>
                <div className="mt-4">
                  <button disabled={!selectedPackage} className="w-full inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed">
                    <CreditCardIcon className="mr-2 h-5 w-5" />
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Marketing;