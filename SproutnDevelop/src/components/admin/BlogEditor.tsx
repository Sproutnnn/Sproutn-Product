import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveIcon, ImageIcon, XIcon, PlusIcon } from 'lucide-react';
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}
interface BlogEditorProps {
  editMode?: boolean;
}
const BlogEditor: React.FC<BlogEditorProps> = ({
  editMode = false
}) => {
  const navigate = useNavigate();
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const [post, setPost] = useState<BlogPost>({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    author: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    category: '',
    image: '',
    featured: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const categories = ['Product Development', 'Manufacturing', 'Sourcing', 'Photography', 'Marketing', 'Sustainability', 'Business Tips'];
  useEffect(() => {
    if (editMode && id) {
      // In a real app, this would fetch from an API
      // For this demo, we'll simulate fetching a blog post
      setLoading(true);
      setTimeout(() => {
        // Mock data for editing
        setPost({
          id,
          title: 'How to Validate Your Product Idea Before Manufacturing',
          excerpt: 'Learn effective strategies to test your product concept and gather valuable feedback before investing in manufacturing.',
          content: "# How to Validate Your Product Idea\n\nProduct validation is a crucial step in the development process. Here are some strategies to help you validate your product idea:\n\n## 1. Conduct Market Research\n\nUnderstand your target market and identify potential customers. Research existing products and competitors to determine how your product can stand out.\n\n## 2. Create a Prototype\n\nDevelop a minimum viable product (MVP) or prototype to demonstrate your concept. This doesn't have to be perfect—it just needs to showcase the core functionality.\n\n## 3. Gather Feedback\n\nShare your prototype with potential customers and collect their feedback. Pay attention to their reactions, questions, and suggestions.\n\n## 4. Test Your Pricing\n\nDetermine if customers are willing to pay your intended price point. You can do this through surveys, pre-orders, or crowdfunding campaigns.\n\n## 5. Analyze the Data\n\nReview all the feedback and data you've collected. Be honest about the results and be prepared to pivot if necessary.",
          author: 'Sarah Johnson',
          date: '2023-06-15',
          readTime: '8 min read',
          category: 'Product Development',
          image: 'https://images.unsplash.com/photo-1581092335397-9fa73e7d0d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          featured: true
        });
        setLoading(false);
      }, 500);
    }
  }, [editMode, id]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      checked
    } = e.target;
    setPost(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // In a real app, this would send data to an API
    // For this demo, we'll simulate saving
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        // Navigate back to blog management
        navigate('/admin/blogs');
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
          {editMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        {success && <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
            Post {editMode ? 'updated' : 'created'} successfully!
          </div>}
      </div>
      <form onSubmit={handleSubmit} className="p-6">
        {error && <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-4">
            {error}
          </div>}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#434C54] mb-1">
              Title *
            </label>
            <input type="text" id="title" name="title" value={post.title} onChange={handleChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Enter blog post title" />
          </div>
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-[#434C54] mb-1">
              Excerpt *
            </label>
            <textarea id="excerpt" name="excerpt" value={post.excerpt} onChange={handleChange} required rows={2} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Brief summary of the blog post" />
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[#434C54] mb-1">
              Content * (Markdown supported)
            </label>
            <textarea id="content" name="content" value={post.content} onChange={handleChange} required rows={15} className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] font-mono" placeholder="Write your blog post content here (Markdown supported)" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-[#434C54] mb-1">
                Author *
              </label>
              <input type="text" id="author" name="author" value={post.author} onChange={handleChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="Author name" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#434C54] mb-1">
                Category *
              </label>
              <select id="category" name="category" value={post.category} onChange={handleChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]">
                <option value="">Select a category</option>
                {categories.map(category => <option key={category} value={category}>
                    {category}
                  </option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-[#434C54] mb-1">
                Publish Date *
              </label>
              <input type="date" id="date" name="date" value={post.date} onChange={handleChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" />
            </div>
            <div>
              <label htmlFor="readTime" className="block text-sm font-medium text-[#434C54] mb-1">
                Read Time *
              </label>
              <input type="text" id="readTime" name="readTime" value={post.readTime} onChange={handleChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="e.g., 5 min read" />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-[#434C54] mb-1">
              Featured Image URL *
            </label>
            <div className="flex space-x-2">
              <input type="url" id="image" name="image" value={post.image} onChange={handleChange} required className="block flex-1 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" placeholder="https://example.com/image.jpg" />
              <button type="button" className="bg-[#859CB6] bg-opacity-10 hover:bg-opacity-20 text-[#434C54] py-2 px-4 rounded-md flex items-center">
                <ImageIcon className="h-5 w-5 mr-1" />
                Browse
              </button>
            </div>
            {post.image && <div className="mt-2">
                <img src={post.image} alt="Preview" className="h-40 object-cover rounded-md" onError={e => {
              e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
            }} />
              </div>}
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="featured" name="featured" checked={post.featured} onChange={handleCheckboxChange} className="h-4 w-4 text-[#016E4E] focus:ring-[#016E4E] border-gray-300 rounded" />
            <label htmlFor="featured" className="ml-2 block text-sm text-[#434C54]">
              Feature this post (appears in the featured section)
            </label>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <button type="button" onClick={() => navigate('/admin/blogs')} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#434C54] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E]">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E] disabled:bg-gray-400 disabled:cursor-not-allowed">
            {loading ? <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {editMode ? 'Updating...' : 'Creating...'}
              </> : <>
                <SaveIcon className="h-4 w-4 mr-2" />
                {editMode ? 'Update Post' : 'Create Post'}
              </>}
          </button>
        </div>
      </form>
    </div>;
};
export default BlogEditor;