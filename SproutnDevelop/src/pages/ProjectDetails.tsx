import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, UploadIcon, XIcon, PlusIcon } from 'lucide-react';
import ModuleNavigation from '../components/ModuleNavigation';
import { useAuth } from '../context/AuthContext';
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
  const [project, setProject] = useState({
    id: '',
    name: '',
    status: 'requirements' as const,
    description: '',
    keyFeatures: ['', '', ''],
    targetMarket: '',
    createdAt: '',
    updatedAt: '',
    customer: {
      name: 'John Doe',
      email: 'john@example.com'
    }
  });
  const [formData, setFormData] = useState({
    description: '',
    keyFeatures: ['', '', ''],
    targetMarket: ''
  });
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      const mockProject = {
        id: id || '1',
        name: 'E-Commerce Platform',
        status: 'requirements' as const,
        description: 'An e-commerce platform with user authentication, product catalog, shopping cart, and payment processing capabilities.',
        keyFeatures: ['User authentication and profiles', 'Product catalog with search and filtering', 'Shopping cart and checkout process'],
        targetMarket: 'Small to medium-sized retail businesses',
        createdAt: '2023-05-15T10:30:00Z',
        updatedAt: '2023-05-20T14:45:00Z',
        customer: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      };
      setProject(mockProject);
      setFormData({
        description: mockProject.description,
        keyFeatures: mockProject.keyFeatures,
        targetMarket: mockProject.targetMarket
      });
      setLoading(false);
    }, 500);
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
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to an API
    // For demo purposes, we'll simulate an API call
    setTimeout(() => {
      // Navigate to the next step
      navigate(`/project/${id}/design`);
    }, 500);
  };
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
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
            Created on {new Date(project.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {/* Module Navigation */}
      <ModuleNavigation project={project} />
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
              {project.keyFeatures.length > 0 && project.keyFeatures[0] !== '' && <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700">
                      Key Features
                    </h4>
                    <ul className="mt-1 list-disc list-inside text-sm text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200">
                      {project.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
                    </ul>
                  </div>}
              {project.targetMarket && <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700">
                    Target Market
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200">
                    {project.targetMarket}
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
                  <input type="file" multiple accept="image/*" className="hidden" id="product-upload" onChange={handleFileChange} />
                  <label htmlFor="product-upload" className="cursor-pointer flex flex-col items-center justify-center">
                    <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                    <p className="text-sm font-medium text-gray-700">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      JPG, PNG or GIF, up to 10MB each
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
                            <span className="text-xs text-gray-500">IMG</span>
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
            </div>}
          {user?.role === 'admin' && <form onSubmit={handleSubmit}>
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
                    {formData.keyFeatures.map((feature, index) => <input key={index} type="text" required value={feature} onChange={e => handleFeatureChange(index, e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" placeholder={`Feature ${index + 1}`} />)}
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
                <div className="flex justify-end">
                  <button type="submit" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    Save and Continue
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>}
          {user?.role === 'customer' && <div className="flex justify-end mt-6">
              <button onClick={() => navigate(`/project/${id}/design`)} className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Continue to Design
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </button>
            </div>}
        </div>
      </div>
    </div>;
};
export default ProjectDetails;