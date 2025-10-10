import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon, StarIcon, CalendarIcon, UserIcon, TagIcon } from 'lucide-react';
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  featured: boolean;
  published: boolean;
}
const BlogManagement: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  // Categories for filter
  const categories = ['Product Development', 'Manufacturing', 'Sourcing', 'Photography', 'Marketing', 'Sustainability', 'Business Tips'];
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use mock data
    setTimeout(() => {
      setBlogPosts([{
        id: '1',
        title: 'How to Validate Your Product Idea Before Manufacturing',
        excerpt: 'Learn effective strategies to test your product concept and gather valuable feedback before investing in manufacturing.',
        author: 'Sarah Johnson',
        date: '2023-06-15',
        category: 'Product Development',
        featured: true,
        published: true
      }, {
        id: '2',
        title: '5 Ways to Reduce Manufacturing Costs Without Sacrificing Quality',
        excerpt: 'Discover practical approaches to optimize your production budget while maintaining high product standards.',
        author: 'Michael Chen',
        date: '2023-05-28',
        category: 'Manufacturing',
        featured: false,
        published: true
      }, {
        id: '3',
        title: 'Navigating Supply Chain Challenges in 2023',
        excerpt: 'Insights on how to overcome current supply chain disruptions and ensure smooth production for your product.',
        author: 'Jessica Martinez',
        date: '2023-04-12',
        category: 'Sourcing',
        featured: false,
        published: true
      }, {
        id: '4',
        title: 'The Power of Professional Product Photography',
        excerpt: 'Why investing in high-quality product images can dramatically increase your conversion rates and sales.',
        author: 'David Wilson',
        date: '2023-03-05',
        category: 'Photography',
        featured: false,
        published: true
      }, {
        id: '5',
        title: 'Creating an Effective Marketing Strategy for Product Launch',
        excerpt: 'A step-by-step guide to building a marketing plan that will maximize visibility for your new product.',
        author: 'Emily Roberts',
        date: '2023-02-18',
        category: 'Marketing',
        featured: false,
        published: true
      }, {
        id: '6',
        title: 'Sustainable Manufacturing: Practices for Eco-Conscious Brands',
        excerpt: "How to implement environmentally friendly production methods that appeal to today's conscious consumers.",
        author: 'Alex Thompson',
        date: '2023-01-25',
        category: 'Sustainability',
        featured: false,
        published: true
      }, {
        id: '7',
        title: 'Choosing the Right Materials for Your Product',
        excerpt: 'A comprehensive guide to selecting materials that balance cost, durability, and sustainability.',
        author: 'Ryan Miller',
        date: '2023-07-02',
        category: 'Product Development',
        featured: false,
        published: false
      }]);
      setLoading(false);
    }, 500);
  }, []);
  const handleDeleteClick = (id: string) => {
    setPostToDelete(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    if (postToDelete) {
      // In a real app, this would send a delete request to the API
      setBlogPosts(prevPosts => prevPosts.filter(post => post.id !== postToDelete));
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };
  const toggleFeatured = (id: string) => {
    setBlogPosts(prevPosts => prevPosts.map(post => post.id === id ? {
      ...post,
      featured: !post.featured
    } : post));
  };
  const togglePublished = (id: string) => {
    setBlogPosts(prevPosts => prevPosts.map(post => post.id === id ? {
      ...post,
      published: !post.published
    } : post));
  };
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  if (loading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016E4E]"></div>
      </div>;
  }
  return <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#434C54]">Blog Management</h2>
        <Link to="/admin/blogs/new" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E]">
          <PlusIcon className="h-4 w-4 mr-2" />
          New Post
        </Link>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="w-full md:w-1/3">
            <input type="text" placeholder="Search posts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]" />
          </div>
          <div className="w-full md:w-1/4">
            <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]">
              <option value="">All Categories</option>
              {categories.map(category => <option key={category} value={category}>
                  {category}
                </option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPosts.map(post => <tr key={post.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {post.featured && <StarIcon className="h-4 w-4 text-yellow-500 mr-2" />}
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <UserIcon className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <TagIcon className="h-4 w-4 mr-1" />
                      {post.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => toggleFeatured(post.id)} className={`p-1 rounded-md ${post.featured ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`} title={post.featured ? 'Remove from featured' : 'Mark as featured'}>
                        <StarIcon className="h-4 w-4" />
                      </button>
                      <button onClick={() => togglePublished(post.id)} className={`p-1 rounded-md ${post.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`} title={post.published ? 'Unpublish' : 'Publish'}>
                        <span className="text-xs font-bold">
                          {post.published ? 'P' : 'D'}
                        </span>
                      </button>
                      <Link to={`/admin/blogs/edit/${post.id}`} className="p-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-md" title="Edit">
                        <PencilIcon className="h-4 w-4" />
                      </Link>
                      <button onClick={() => handleDeleteClick(post.id)} className="p-1 bg-red-100 text-red-700 hover:bg-red-200 rounded-md" title="Delete">
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>)}
              {filteredPosts.length === 0 && <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No blog posts found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this blog post? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </div>}
    </div>;
};
export default BlogManagement;