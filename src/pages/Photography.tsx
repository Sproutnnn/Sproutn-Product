import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, UploadIcon, DownloadIcon, CreditCardIcon, FileTextIcon, CheckIcon } from 'lucide-react';
import ProjectSteps from '../components/ProjectSteps';
import ModuleNavigation from '../components/ModuleNavigation';
import { useAuth } from '../context/AuthContext';
import { projectsService } from '../services/projects.service';
const Photography: React.FC = () => {
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
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedQuestionnaire, setUploadedQuestionnaire] = useState<File | null>(null);
  const [completedAssets, setCompletedAssets] = useState([{
    id: '1',
    name: 'Product_Front.jpg',
    type: 'image',
    size: 2.4
  }, {
    id: '2',
    name: 'Product_Side.jpg',
    type: 'image',
    size: 1.8
  }, {
    id: '3',
    name: 'Product_Detail.jpg',
    type: 'image',
    size: 2.1
  }]);
  const [packages, setPackages] = useState([{
    id: 'standard',
    name: 'Standard Package',
    price: 599,
    imageCount: 7,
    description: 'High-quality product shots from multiple angles',
    features: ['7 professional product photos', 'White background', 'Detail shots', 'Digital delivery'],
    recommended: false
  }, {
    id: 'premium',
    name: 'Premium Package',
    price: 899,
    imageCount: 8,
    videoIncluded: true,
    description: 'Complete solution with product shots and promotional video',
    features: ['8 professional product photos', '1 promotional video (15+ seconds)', 'White background', 'Detail shots', 'Digital delivery'],
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

        // TODO: Load photography data (packages, assets) from database when migration is ready
        // For now, packages and completed assets use mock data
      } catch (err) {
        console.error('Error loading project:', err);
        setError('Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles(prev => [...prev, ...filesArray]);
    }
  };
  const handleQuestionnaireUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedQuestionnaire(e.target.files[0]);
    }
  };
  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
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
      <ProjectSteps currentStep={project.status} />
      <div className="bg-white shadow rounded-lg overflow-hidden mt-4 mb-6">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <p className="text-sm text-gray-500 mt-1">Photography</p>
        </div>
      </div>
      {/* Module Navigation */}
      <ModuleNavigation project={project} />
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Product Photography
          </h2>
          <p className="text-sm text-gray-500">
            Professional photos to showcase your product
          </p>
        </div>
        <div className="p-6">
          <div className="space-y-8">
            {/* Photo Inspiration Upload */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Upload Photo Inspiration
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Share examples of product photography you like to help our
                photographers understand your vision.
              </p>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input type="file" multiple accept="image/*" className="hidden" id="photo-upload" onChange={handleFileChange} />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center justify-center">
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
            {/* Photography Questionnaire */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Photography Questionnaire
              </h3>
              {user?.role === 'admin' ? <div>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload the photography questionnaire for customers to
                    download.
                  </p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="questionnaire-upload" onChange={handleQuestionnaireUpload} />
                    <label htmlFor="questionnaire-upload" className="cursor-pointer flex flex-col items-center justify-center">
                      <UploadIcon className="h-10 w-10 text-gray-400 mb-3" />
                      <p className="text-sm font-medium text-gray-700">
                        Upload questionnaire document
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PDF, DOC, or DOCX files
                      </p>
                    </label>
                  </div>
                  {uploadedQuestionnaire && <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          Questionnaire uploaded successfully
                        </p>
                        <p className="text-xs text-green-700">
                          {uploadedQuestionnaire.name} (
                          {(uploadedQuestionnaire.size / 1024).toFixed(1)} KB)
                        </p>
                      </div>
                    </div>}
                </div> : <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <DownloadIcon className="mr-2 h-5 w-5 text-gray-500" />
                    Download Questionnaire
                  </button>
                  <div className="flex-1">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="completed-questionnaire" onChange={handleQuestionnaireUpload} />
                      <label htmlFor="completed-questionnaire" className="cursor-pointer flex flex-col items-center justify-center">
                        <UploadIcon className="h-6 w-6 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                          Upload completed questionnaire
                        </p>
                      </label>
                    </div>
                  </div>
                </div>}
            </div>
            {/* Photography Packages */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Choose Your Package
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Select a photography package that fits your needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            {/* Completed Assets (for customer) */}
            {user?.role === 'customer' && <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Completed Assets
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Download your completed photography assets when they're ready.
                </p>
                {completedAssets.length > 0 ? <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="space-y-3">
                      {completedAssets.map(asset => <div key={asset.id} className="flex items-center justify-between p-2 bg-white rounded border border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-primary-100 rounded flex items-center justify-center mr-3">
                              <FileTextIcon className="h-5 w-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">
                                {asset.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {asset.size} MB
                              </p>
                            </div>
                          </div>
                          <button className="text-primary-600 hover:text-primary-800 text-sm font-medium flex items-center">
                            <DownloadIcon className="h-4 w-4 mr-1" />
                            Download
                          </button>
                        </div>)}
                    </div>
                    <div className="mt-4">
                      <button className="w-full inline-flex items-center justify-center py-2 px-4 border border-primary-500 text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                        <DownloadIcon className="mr-2 h-5 w-5" />
                        Download All Assets
                      </button>
                    </div>
                  </div> : <div className="bg-gray-50 border rounded-md p-4 text-center">
                    <p className="text-sm text-gray-500">
                      Your photography assets will appear here once they're
                      ready for download.
                    </p>
                  </div>}
              </div>}
            {/* Payment Section */}
            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Photography Package
                    </h3>
                    <p className="text-sm text-gray-500">
                      {selectedPackage ? packages.find(p => p.id === selectedPackage)?.name + ' - ' + packages.find(p => p.id === selectedPackage)?.imageCount + ' photos' + (packages.find(p => p.id === selectedPackage)?.videoIncluded ? ' + 1 video' : '') : 'No package selected'}
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
export default Photography;