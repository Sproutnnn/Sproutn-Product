import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveIcon, ImageIcon, LayoutIcon } from 'lucide-react';
interface PageContent {
  id: string;
  title: string;
  slug: string;
  content: string;
  sections: {
    id: string;
    type: 'hero' | 'content' | 'cta' | 'features';
    title?: string;
    subtitle?: string;
    content?: string;
    image?: string;
    backgroundColor?: string;
    buttons?: Array<{
      text: string;
      url: string;
      primary: boolean;
    }>;
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  }[];
}
interface PageEditorProps {
  editMode?: boolean;
}
const PageEditor: React.FC<PageEditorProps> = ({
  editMode = false
}) => {
  const navigate = useNavigate();
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const [page, setPage] = useState<PageContent>({
    id: '',
    title: '',
    slug: '',
    content: '',
    sections: []
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const pageTypes = ['Home', 'About', 'Services', 'Service Detail', 'Contact', 'Custom'];
  useEffect(() => {
    if (editMode && slug) {
      // In a real app, this would fetch from an API
      setLoading(true);
      setTimeout(() => {
        // Mock data for editing
        setPage({
          id: '1',
          title: 'About Us',
          slug: 'about',
          content: '',
          sections: [{
            id: '1',
            type: 'hero',
            title: "About Sprout'n",
            subtitle: 'We help entrepreneurs bring their product ideas to life',
            backgroundColor: '#434C54',
            image: 'https://images.unsplash.com/photo-1581092335397-9fa73e7d0d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
          }, {
            id: '2',
            type: 'content',
            title: 'Our Mission',
            content: "At Sprout'n, we're dedicated to helping entrepreneurs navigate the complex journey from concept to market. We provide comprehensive product development and launch services that streamline the process, reduce risks, and increase your chances of success.",
            backgroundColor: '#FFFFFF'
          }, {
            id: '3',
            type: 'features',
            title: 'Our Values',
            backgroundColor: '#D1CDC2',
            items: [{
              title: 'Innovation',
              description: 'We embrace creative solutions and cutting-edge approaches to help your product stand out.'
            }, {
              title: 'Integrity',
              description: 'We operate with honesty and transparency in all our business relationships.'
            }, {
              title: 'Excellence',
              description: 'We strive for the highest quality in everything we do, from prototyping to marketing.'
            }]
          }, {
            id: '4',
            type: 'cta',
            title: 'Ready to bring your product idea to life?',
            subtitle: 'Get started today and let our experts guide you through the journey.',
            backgroundColor: '#016E4E',
            buttons: [{
              text: 'Contact Us',
              url: '/contact',
              primary: true
            }, {
              text: 'Learn More',
              url: '/services',
              primary: false
            }]
          }]
        });
        setLoading(false);
      }, 500);
    }
  }, [editMode, slug]);
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(prev => ({
      ...prev,
      title: e.target.value
    }));
  };
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(prev => ({
      ...prev,
      slug: e.target.value
    }));
  };
  const handleSectionChange = (sectionId: string, field: string, value: any) => {
    setPage(prev => ({
      ...prev,
      sections: prev.sections.map(section => section.id === sectionId ? {
        ...section,
        [field]: value
      } : section)
    }));
  };
  const handleItemChange = (sectionId: string, itemIndex: number, field: string, value: string) => {
    setPage(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionId && section.items) {
          const newItems = [...section.items];
          newItems[itemIndex] = {
            ...newItems[itemIndex],
            [field]: value
          };
          return {
            ...section,
            items: newItems
          };
        }
        return section;
      })
    }));
  };
  const handleButtonChange = (sectionId: string, buttonIndex: number, field: string, value: any) => {
    setPage(prev => ({
      ...prev,
      sections: prev.sections.map(section => {
        if (section.id === sectionId && section.buttons) {
          const newButtons = [...section.buttons];
          newButtons[buttonIndex] = {
            ...newButtons[buttonIndex],
            [field]: value
          };
          return {
            ...section,
            buttons: newButtons
          };
        }
        return section;
      })
    }));
  };
  const addSection = (type: 'hero' | 'content' | 'cta' | 'features') => {
    const newSection = {
      id: Date.now().toString(),
      type,
      title: 'New Section Title',
      backgroundColor: '#FFFFFF'
    };
    if (type === 'features') {
      newSection.items = [{
        title: 'Feature 1',
        description: 'Description for feature 1'
      }, {
        title: 'Feature 2',
        description: 'Description for feature 2'
      }, {
        title: 'Feature 3',
        description: 'Description for feature 3'
      }];
    }
    if (type === 'cta') {
      newSection.buttons = [{
        text: 'Primary Button',
        url: '/',
        primary: true
      }, {
        text: 'Secondary Button',
        url: '/',
        primary: false
      }];
    }
    setPage(prev => ({
      ...prev,
      sections: [...prev.sections, newSection]
    }));
  };
  const removeSection = (sectionId: string) => {
    setPage(prev => ({
      ...prev,
      sections: prev.sections.filter(section => section.id !== sectionId)
    }));
  };
  const moveSectionUp = (index: number) => {
    if (index === 0) return;
    const newSections = [...page.sections];
    const temp = newSections[index];
    newSections[index] = newSections[index - 1];
    newSections[index - 1] = temp;
    setPage(prev => ({
      ...prev,
      sections: newSections
    }));
  };
  const moveSectionDown = (index: number) => {
    if (index === page.sections.length - 1) return;
    const newSections = [...page.sections];
    const temp = newSections[index];
    newSections[index] = newSections[index + 1];
    newSections[index + 1] = temp;
    setPage(prev => ({
      ...prev,
      sections: newSections
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // In a real app, this would send data to an API
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/pages');
      }, 2000);
    }, 1000);
  };
  if (loading && editMode) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016E4E]"></div>
      </div>;
  }
  return <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#434C54]">
          {editMode ? 'Edit Page' : 'Create New Page'}
        </h2>
        {success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
            Page {editMode ? 'updated' : 'created'} successfully!
          </div>}
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-4">
            {error}
          </div>}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[#434C54] mb-1">
                Page Title *
              </label>
              <input type="text" id="title" value={page.title} onChange={handleTitleChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Enter page title" />
            </div>
            <div>
              <label htmlFor="slug" className="block text-sm font-medium text-[#434C54] mb-1">
                URL Slug *
              </label>
              <input type="text" id="slug" value={page.slug} onChange={handleSlugChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="page-url-slug" />
              <p className="mt-1 text-xs text-gray-500">
                This will be used in the URL: https://yoursite.com/
                {page.slug || 'page-slug'}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-[#434C54]">
                Page Sections
              </h3>
              <div className="flex space-x-2">
                <button type="button" onClick={() => addSection('hero')} className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  + Hero
                </button>
                <button type="button" onClick={() => addSection('content')} className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  + Content
                </button>
                <button type="button" onClick={() => addSection('features')} className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  + Features
                </button>
                <button type="button" onClick={() => addSection('cta')} className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  + CTA
                </button>
              </div>
            </div>
            {page.sections.length === 0 ? <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <LayoutIcon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  No sections added yet. Add a section to start building your
                  page.
                </p>
              </div> : <div className="space-y-6">
                {page.sections.map((section, index) => <div key={section.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium mr-2">
                          {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                        </span>
                        <h4 className="text-md font-medium text-[#434C54]">
                          {section.title || 'Untitled Section'}
                        </h4>
                      </div>
                      <div className="flex space-x-2">
                        <button type="button" onClick={() => moveSectionUp(index)} disabled={index === 0} className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}>
                          ↑
                        </button>
                        <button type="button" onClick={() => moveSectionDown(index)} disabled={index === page.sections.length - 1} className={`p-1 rounded ${index === page.sections.length - 1 ? 'text-gray-300' : 'text-gray-500 hover:bg-gray-100'}`}>
                          ↓
                        </button>
                        <button type="button" onClick={() => removeSection(section.id)} className="p-1 rounded text-red-500 hover:bg-red-50">
                          ×
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-[#434C54] mb-1">
                          Section Title
                        </label>
                        <input type="text" value={section.title || ''} onChange={e => handleSectionChange(section.id, 'title', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" />
                      </div>
                      {(section.type === 'hero' || section.type === 'cta') && <div>
                          <label className="block text-sm font-medium text-[#434C54] mb-1">
                            Subtitle
                          </label>
                          <input type="text" value={section.subtitle || ''} onChange={e => handleSectionChange(section.id, 'subtitle', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" />
                        </div>}
                      <div>
                        <label className="block text-sm font-medium text-[#434C54] mb-1">
                          Background Color
                        </label>
                        <div className="flex items-center">
                          <input type="color" value={section.backgroundColor || '#FFFFFF'} onChange={e => handleSectionChange(section.id, 'backgroundColor', e.target.value)} className="h-8 w-8 rounded border border-gray-300 mr-2" />
                          <input type="text" value={section.backgroundColor || '#FFFFFF'} onChange={e => handleSectionChange(section.id, 'backgroundColor', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" placeholder="#FFFFFF" />
                        </div>
                      </div>
                      {section.type === 'hero' && <div>
                          <label className="block text-sm font-medium text-[#434C54] mb-1">
                            Image URL
                          </label>
                          <input type="text" value={section.image || ''} onChange={e => handleSectionChange(section.id, 'image', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" placeholder="https://example.com/image.jpg" />
                        </div>}
                    </div>
                    {section.type === 'content' && <div>
                        <label className="block text-sm font-medium text-[#434C54] mb-1">
                          Content
                        </label>
                        <textarea value={section.content || ''} onChange={e => handleSectionChange(section.id, 'content', e.target.value)} rows={4} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" />
                      </div>}
                    {section.type === 'features' && section.items && <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-[#434C54]">
                            Features
                          </label>
                          <button type="button" onClick={() => {
                    const newItems = [...(section.items || []), {
                      title: 'New Feature',
                      description: 'Feature description'
                    }];
                    handleSectionChange(section.id, 'items', newItems);
                  }} className="text-xs text-[#016E4E] hover:underline">
                            + Add Feature
                          </button>
                        </div>
                        <div className="space-y-3 mt-2">
                          {section.items.map((item, itemIndex) => <div key={itemIndex} className="border border-gray-200 rounded p-3">
                              <div className="flex justify-between mb-2">
                                <span className="text-xs font-medium text-gray-500">
                                  Feature {itemIndex + 1}
                                </span>
                                <button type="button" onClick={() => {
                        const newItems = section.items?.filter((_, i) => i !== itemIndex);
                        handleSectionChange(section.id, 'items', newItems);
                      }} className="text-xs text-red-500 hover:underline">
                                  Remove
                                </button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                <input type="text" value={item.title} onChange={e => handleItemChange(section.id, itemIndex, 'title', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" placeholder="Feature title" />
                                <input type="text" value={item.description} onChange={e => handleItemChange(section.id, itemIndex, 'description', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" placeholder="Feature description" />
                              </div>
                            </div>)}
                        </div>
                      </div>}
                    {section.type === 'cta' && section.buttons && <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="block text-sm font-medium text-[#434C54]">
                            Buttons
                          </label>
                          <button type="button" onClick={() => {
                    const newButtons = [...(section.buttons || []), {
                      text: 'New Button',
                      url: '/',
                      primary: false
                    }];
                    handleSectionChange(section.id, 'buttons', newButtons);
                  }} className="text-xs text-[#016E4E] hover:underline">
                            + Add Button
                          </button>
                        </div>
                        <div className="space-y-3 mt-2">
                          {section.buttons.map((button, buttonIndex) => <div key={buttonIndex} className="border border-gray-200 rounded p-3">
                              <div className="flex justify-between mb-2">
                                <span className="text-xs font-medium text-gray-500">
                                  Button {buttonIndex + 1}
                                </span>
                                <button type="button" onClick={() => {
                        const newButtons = section.buttons?.filter((_, i) => i !== buttonIndex);
                        handleSectionChange(section.id, 'buttons', newButtons);
                      }} className="text-xs text-red-500 hover:underline">
                                  Remove
                                </button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                <input type="text" value={button.text} onChange={e => handleButtonChange(section.id, buttonIndex, 'text', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" placeholder="Button text" />
                                <input type="text" value={button.url} onChange={e => handleButtonChange(section.id, buttonIndex, 'url', e.target.value)} className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] text-sm" placeholder="Button URL" />
                                <div className="flex items-center">
                                  <input type="checkbox" id={`primary-${section.id}-${buttonIndex}`} checked={button.primary} onChange={e => handleButtonChange(section.id, buttonIndex, 'primary', e.target.checked)} className="h-4 w-4 text-[#016E4E] focus:ring-[#016E4E] border-gray-300 rounded" />
                                  <label htmlFor={`primary-${section.id}-${buttonIndex}`} className="ml-2 block text-sm text-gray-700">
                                    Primary Button
                                  </label>
                                </div>
                              </div>
                            </div>)}
                        </div>
                      </div>}
                  </div>)}
              </div>}
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={() => navigate('/admin/pages')} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#434C54] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E]">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E] disabled:bg-gray-400 disabled:cursor-not-allowed">
            {loading ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {editMode ? 'Updating...' : 'Creating...'}
              </> : <>
                <SaveIcon className="h-4 w-4 mr-2" />
                {editMode ? 'Update Page' : 'Create Page'}
              </>}
          </button>
        </div>
      </form>
    </div>;
};
export default PageEditor;