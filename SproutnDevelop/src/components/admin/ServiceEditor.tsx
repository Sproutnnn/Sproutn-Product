import React, { useEffect, useState, Component } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveIcon, PlusIcon, XIcon, CodeIcon, SmartphoneIcon, ServerIcon, CloudIcon, BrainIcon } from 'lucide-react';
interface ServiceData {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  benefits: string[];
  process: {
    title: string;
    description: string;
  }[];
  caseStudies: {
    title: string;
    description: string;
    imageUrl: string;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
  status: 'published' | 'draft';
}
interface ServiceEditorProps {
  editMode?: boolean;
}
const ServiceEditor: React.FC<ServiceEditorProps> = ({
  editMode = false
}) => {
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [service, setService] = useState<ServiceData>({
    id: '',
    title: '',
    slug: '',
    description: '',
    icon: 'code',
    shortDescription: '',
    longDescription: '',
    features: [''],
    benefits: [''],
    process: [{
      title: 'Discovery',
      description: 'Understanding your requirements'
    }, {
      title: 'Planning',
      description: 'Creating a roadmap'
    }, {
      title: 'Execution',
      description: 'Building your solution'
    }, {
      title: 'Delivery',
      description: 'Launching your product'
    }],
    caseStudies: [{
      title: '',
      description: '',
      imageUrl: ''
    }],
    faq: [{
      question: '',
      answer: ''
    }],
    status: 'draft'
  });
  useEffect(() => {
    if (editMode && id) {
      setLoading(true);
      // In a real app, this would fetch from an API
      setTimeout(() => {
        // Mock data for editing
        setService({
          id: '1',
          title: 'Web Development',
          slug: 'web-development',
          description: 'Create powerful, responsive web applications using modern frameworks and technologies.',
          icon: 'code',
          shortDescription: 'Build modern web applications that scale.',
          longDescription: 'Our web development services focus on creating robust, scalable, and user-friendly web applications that help businesses achieve their goals. We use the latest technologies and frameworks to ensure your web application is fast, secure, and maintainable.',
          features: ['Custom web applications', 'E-commerce websites', 'Progressive web apps', 'Content management systems'],
          benefits: ['Improved user experience', 'Increased conversion rates', 'Better performance', 'Enhanced security'],
          process: [{
            title: 'Discovery',
            description: 'We analyze your requirements and business goals'
          }, {
            title: 'Design',
            description: 'We create wireframes and prototypes'
          }, {
            title: 'Development',
            description: 'We build your web application'
          }, {
            title: 'Testing',
            description: 'We ensure quality and performance'
          }, {
            title: 'Deployment',
            description: 'We launch your application'
          }, {
            title: 'Maintenance',
            description: 'We provide ongoing support'
          }],
          caseStudies: [{
            title: 'E-commerce Platform',
            description: 'We built a custom e-commerce platform for a retail client that increased their online sales by 45%.',
            imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
          }, {
            title: 'Healthcare Portal',
            description: 'A patient management system that improved administrative efficiency by 30%.',
            imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692'
          }],
          faq: [{
            question: 'How long does it take to develop a web application?',
            answer: 'The timeline varies depending on the complexity of the project. Simple websites can take 2-4 weeks, while complex web applications might take 3-6 months or more.'
          }, {
            question: 'What technologies do you use?',
            answer: 'We primarily use React, Node.js, and other modern JavaScript frameworks. We also work with PHP, Python, and Ruby depending on project requirements.'
          }],
          status: 'published'
        });
        setLoading(false);
      }, 500);
    }
  }, [editMode, id]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setService(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleArrayChange = (index: number, field: 'features' | 'benefits', value: string) => {
    setService(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  const addArrayItem = (field: 'features' | 'benefits') => {
    setService(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
  const removeArrayItem = (index: number, field: 'features' | 'benefits') => {
    setService(prev => {
      const newArray = [...prev[field]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };
  const handleProcessChange = (index: number, field: 'title' | 'description', value: string) => {
    setService(prev => {
      const newProcess = [...prev.process];
      newProcess[index] = {
        ...newProcess[index],
        [field]: value
      };
      return {
        ...prev,
        process: newProcess
      };
    });
  };
  const addProcessStep = () => {
    setService(prev => ({
      ...prev,
      process: [...prev.process, {
        title: '',
        description: ''
      }]
    }));
  };
  const removeProcessStep = (index: number) => {
    setService(prev => {
      const newProcess = [...prev.process];
      newProcess.splice(index, 1);
      return {
        ...prev,
        process: newProcess
      };
    });
  };
  const handleCaseStudyChange = (index: number, field: 'title' | 'description' | 'imageUrl', value: string) => {
    setService(prev => {
      const newCaseStudies = [...prev.caseStudies];
      newCaseStudies[index] = {
        ...newCaseStudies[index],
        [field]: value
      };
      return {
        ...prev,
        caseStudies: newCaseStudies
      };
    });
  };
  const addCaseStudy = () => {
    setService(prev => ({
      ...prev,
      caseStudies: [...prev.caseStudies, {
        title: '',
        description: '',
        imageUrl: ''
      }]
    }));
  };
  const removeCaseStudy = (index: number) => {
    setService(prev => {
      const newCaseStudies = [...prev.caseStudies];
      newCaseStudies.splice(index, 1);
      return {
        ...prev,
        caseStudies: newCaseStudies
      };
    });
  };
  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    setService(prev => {
      const newFaq = [...prev.faq];
      newFaq[index] = {
        ...newFaq[index],
        [field]: value
      };
      return {
        ...prev,
        faq: newFaq
      };
    });
  };
  const addFaq = () => {
    setService(prev => ({
      ...prev,
      faq: [...prev.faq, {
        question: '',
        answer: ''
      }]
    }));
  };
  const removeFaq = (index: number) => {
    setService(prev => {
      const newFaq = [...prev.faq];
      newFaq.splice(index, 1);
      return {
        ...prev,
        faq: newFaq
      };
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    // Validate required fields
    if (!service.title || !service.slug || !service.description) {
      setError('Please fill in all required fields');
      setSaving(false);
      return;
    }
    // In a real app, this would send data to an API
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/services');
      }, 2000);
    }, 1000);
  };
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <CodeIcon className="h-6 w-6" />;
      case 'smartphone':
        return <SmartphoneIcon className="h-6 w-6" />;
      case 'server':
        return <ServerIcon className="h-6 w-6" />;
      case 'paintBrush':
        return <div className="h-6 w-6" />;
      case 'cloud':
        return <CloudIcon className="h-6 w-6" />;
      case 'brain':
        return <BrainIcon className="h-6 w-6" />;
      default:
        return <CodeIcon className="h-6 w-6" />;
    }
  };
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016E4E]"></div>
      </div>;
  }
  return <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#434C54]">
          {editMode ? 'Edit Service' : 'Create New Service'}
        </h2>
        {success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
            Service {editMode ? 'updated' : 'created'} successfully!
          </div>}
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-4">
            {error}
          </div>}
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-medium text-[#434C54] mb-4">
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#434C54] mb-1">
                  Service Title *
                </label>
                <input type="text" id="title" name="title" value={service.title} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="e.g. Web Development" />
              </div>
              <div>
                <label htmlFor="slug" className="block text-sm font-medium text-[#434C54] mb-1">
                  URL Slug *
                </label>
                <input type="text" id="slug" name="slug" value={service.slug} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="e.g. web-development" />
                <p className="mt-1 text-xs text-gray-500">
                  This will be used in the URL: https://yoursite.com/services/
                  {service.slug || 'service-slug'}
                </p>
              </div>
              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-[#434C54] mb-1">
                  Icon
                </label>
                <div className="flex items-center space-x-2">
                  <select id="icon" name="icon" value={service.icon} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]">
                    <option value="code">Code</option>
                    <option value="smartphone">Smartphone</option>
                    <option value="server">Server</option>
                    <option value="paintBrush">Paint Brush</option>
                    <option value="cloud">Cloud</option>
                    <option value="brain">Brain</option>
                  </select>
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getIconComponent(service.icon)}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-[#434C54] mb-1">
                  Status
                </label>
                <select id="status" name="status" value={service.status} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-[#434C54] mb-1">
                  Short Description *
                </label>
                <input type="text" id="description" name="description" value={service.description} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Brief description of the service" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="shortDescription" className="block text-sm font-medium text-[#434C54] mb-1">
                  Tagline
                </label>
                <input type="text" id="shortDescription" name="shortDescription" value={service.shortDescription} onChange={handleInputChange} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Catchy one-liner about the service" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="longDescription" className="block text-sm font-medium text-[#434C54] mb-1">
                  Detailed Description
                </label>
                <textarea id="longDescription" name="longDescription" value={service.longDescription} onChange={handleInputChange} rows={4} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Comprehensive description of the service" />
              </div>
            </div>
          </div>
          {/* Features */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#434C54]">Features</h3>
              <button type="button" onClick={() => addArrayItem('features')} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none">
                <PlusIcon className="h-3 w-3 mr-1" />
                Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {service.features.map((feature, index) => <div key={index} className="flex items-center space-x-2">
                  <input type="text" value={feature} onChange={e => handleArrayChange(index, 'features', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder={`Feature ${index + 1}`} />
                  <button type="button" onClick={() => removeArrayItem(index, 'features')} className="p-2 text-red-600 hover:text-red-800" disabled={service.features.length <= 1}>
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>)}
            </div>
          </div>
          {/* Benefits */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#434C54]">Benefits</h3>
              <button type="button" onClick={() => addArrayItem('benefits')} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none">
                <PlusIcon className="h-3 w-3 mr-1" />
                Add Benefit
              </button>
            </div>
            <div className="space-y-3">
              {service.benefits.map((benefit, index) => <div key={index} className="flex items-center space-x-2">
                  <input type="text" value={benefit} onChange={e => handleArrayChange(index, 'benefits', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder={`Benefit ${index + 1}`} />
                  <button type="button" onClick={() => removeArrayItem(index, 'benefits')} className="p-2 text-red-600 hover:text-red-800" disabled={service.benefits.length <= 1}>
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>)}
            </div>
          </div>
          {/* Process Steps */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#434C54]">
                Process Steps
              </h3>
              <button type="button" onClick={addProcessStep} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none">
                <PlusIcon className="h-3 w-3 mr-1" />
                Add Step
              </button>
            </div>
            <div className="space-y-4">
              {service.process.map((step, index) => <div key={index} className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Step {index + 1}
                    </span>
                    <button type="button" onClick={() => removeProcessStep(index)} className="p-1 text-red-600 hover:text-red-800" disabled={service.process.length <= 1}>
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <input type="text" value={step.title} onChange={e => handleProcessChange(index, 'title', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Step title" />
                    </div>
                    <div>
                      <input type="text" value={step.description} onChange={e => handleProcessChange(index, 'description', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Step description" />
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          {/* Case Studies */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#434C54]">
                Case Studies
              </h3>
              <button type="button" onClick={addCaseStudy} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none">
                <PlusIcon className="h-3 w-3 mr-1" />
                Add Case Study
              </button>
            </div>
            <div className="space-y-4">
              {service.caseStudies.map((caseStudy, index) => <div key={index} className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Case Study {index + 1}
                    </span>
                    <button type="button" onClick={() => removeCaseStudy(index)} className="p-1 text-red-600 hover:text-red-800" disabled={service.caseStudies.length <= 1}>
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <input type="text" value={caseStudy.title} onChange={e => handleCaseStudyChange(index, 'title', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Case study title" />
                    </div>
                    <div>
                      <textarea value={caseStudy.description} onChange={e => handleCaseStudyChange(index, 'description', e.target.value)} rows={2} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Case study description" />
                    </div>
                    <div>
                      <input type="text" value={caseStudy.imageUrl} onChange={e => handleCaseStudyChange(index, 'imageUrl', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Image URL" />
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
          {/* FAQs */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#434C54]">FAQs</h3>
              <button type="button" onClick={addFaq} className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none">
                <PlusIcon className="h-3 w-3 mr-1" />
                Add FAQ
              </button>
            </div>
            <div className="space-y-4">
              {service.faq.map((faq, index) => <div key={index} className="border border-gray-200 rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      FAQ {index + 1}
                    </span>
                    <button type="button" onClick={() => removeFaq(index)} className="p-1 text-red-600 hover:text-red-800" disabled={service.faq.length <= 1}>
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <input type="text" value={faq.question} onChange={e => handleFaqChange(index, 'question', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Question" />
                    </div>
                    <div>
                      <textarea value={faq.answer} onChange={e => handleFaqChange(index, 'answer', e.target.value)} rows={2} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Answer" />
                    </div>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-3">
          <button type="button" onClick={() => navigate('/admin/services')} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#434C54] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E]">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E] disabled:bg-gray-400 disabled:cursor-not-allowed">
            {saving ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {editMode ? 'Updating...' : 'Creating...'}
              </> : <>
                <SaveIcon className="h-4 w-4 mr-2" />
                {editMode ? 'Update Service' : 'Create Service'}
              </>}
          </button>
        </div>
      </form>
    </div>;
};
export default ServiceEditor;