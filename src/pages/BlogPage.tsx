import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, UserIcon, ClockIcon, ArrowRightIcon, PencilIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
import { blogService } from '../services/blog.service';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  created_at: string;
  read_time: string;
  category: string;
  image_url: string;
  slug: string;
  featured?: boolean;
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogPosts();
  }, []);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      const posts = await blogService.getPublished();
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  return <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 min-h-screen w-full text-white">
      <Navigation />
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/30 to-charcoal-800/50 z-0"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary-500/10 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Our Blog
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
              Insights, tips, and expert advice to help you navigate the product development journey
            </p>
            {isAdmin && (
              <Link
                to="/admin/blogs"
                className="inline-flex items-center px-8 py-3 bg-primary-500 text-white font-medium rounded-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary-500/30"
              >
                <PencilIcon className="h-5 w-5 mr-2" />
                Manage Blogs
              </Link>
            )}
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <>
            {/* Featured Post */}
            {featuredPost && <div className="mb-16">
                <div className="flex items-center mb-4">
                  <span className="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FEATURED
                  </span>
                  <span className="ml-3 text-sm text-gray-400">
                    {featuredPost.category}
                  </span>
                  {isAdmin && <button onClick={() => navigate(`/admin/blogs/edit/${featuredPost.id}`)} className="ml-auto bg-charcoal-700 text-gray-300 p-1 rounded-full hover:bg-charcoal-600">
                      <PencilIcon className="h-4 w-4" />
                    </button>}
                </div>
                <div className="grid md:grid-cols-2 gap-8 bg-charcoal-800 rounded-lg overflow-hidden">
                  <div className="h-80 overflow-hidden">
                    <img src={featuredPost.image_url || 'https://via.placeholder.com/800x600?text=No+Image'} alt={featuredPost.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center p-6">
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {featuredPost.title}
                    </h2>
                    <p className="text-lg text-gray-300 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center text-sm text-gray-400 mb-6">
                      <UserIcon className="h-4 w-4 mr-1" />
                      <span className="mr-4">{featuredPost.author}</span>
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      <span className="mr-4">{formatDate(featuredPost.created_at)}</span>
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span>{featuredPost.read_time}</span>
                    </div>
                    <Link to={`/blog/${featuredPost.slug}`} className="inline-flex items-center text-primary-400 font-medium hover:text-primary-300">
                      Read Full Article
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>}
            {/* Regular Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.length === 0 && !featuredPost ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-300 text-lg">No blog posts available yet. Check back soon!</p>
                </div>
              ) : (
                regularPosts.map(post => <div key={post.id} className="bg-charcoal-800 rounded-lg overflow-hidden hover:bg-charcoal-700 transition-colors duration-300 relative">
                    {isAdmin && <button onClick={() => navigate(`/admin/blogs/edit/${post.id}`)} className="absolute top-2 right-2 bg-charcoal-700 text-gray-300 p-1 rounded-full hover:bg-charcoal-600 z-10">
                        <PencilIcon className="h-4 w-4" />
                      </button>}
                    <div className="h-48 overflow-hidden">
                      <img src={post.image_url || 'https://via.placeholder.com/400x300?text=No+Image'} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-primary-400 mb-2">
                        {post.category}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-300 mb-4">{post.excerpt}</p>
                      <div className="flex items-center text-sm text-gray-400 mb-4">
                        <UserIcon className="h-4 w-4 mr-1" />
                        <span className="mr-3">{post.author}</span>
                        <ClockIcon className="h-4 w-4 mr-1" />
                        <span>{post.read_time}</span>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-primary-400 font-medium hover:text-primary-300">
                        Read More
                        <ArrowRightIcon className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>)
              )}
            </div>
          </>
        )}
        {/* Newsletter Signup */}
        <div className="mt-16 bg-charcoal-800 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Get the latest insights, tips, and expert advice delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <input type="email" placeholder="Your email address" className="flex-grow px-4 py-2 rounded-md sm:rounded-r-none border border-charcoal-600 bg-charcoal-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
            <button className="mt-2 sm:mt-0 px-6 py-2 bg-primary-500 text-white font-medium rounded-md sm:rounded-l-none hover:bg-primary-600 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-charcoal-900 border-t border-charcoal-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8337.png" alt="Sprout'n Logo" className="h-8 mb-4" />
              <p className="text-gray-500 max-w-xs">
                From concept to market, we're with you every step of the way.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Services
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/services/prototyping" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/sourcing" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Sourcing & Manufacturing
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/photography" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/marketing" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Marketing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Company
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
                  Legal
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-charcoal-700 text-center md:text-left text-gray-500">
            <p>© {new Date().getFullYear()} Sprout'n. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default BlogPage;