import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarIcon, UserIcon, ClockIcon, ArrowRightIcon, PencilIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import { useAuth } from '../context/AuthContext';
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}
const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const isAdmin = user?.role === 'admin';
  // Mock blog post data
  const blogPosts: BlogPost[] = [{
    id: '1',
    title: 'How to Validate Your Product Idea Before Manufacturing',
    excerpt: 'Learn effective strategies to test your product concept and gather valuable feedback before investing in manufacturing.',
    author: 'Sarah Johnson',
    date: 'June 15, 2023',
    readTime: '8 min read',
    category: 'Product Development',
    image: 'https://images.unsplash.com/photo-1581092335397-9fa73e7d0d1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featured: true
  }, {
    id: '2',
    title: '5 Ways to Reduce Manufacturing Costs Without Sacrificing Quality',
    excerpt: 'Discover practical approaches to optimize your production budget while maintaining high product standards.',
    author: 'Michael Chen',
    date: 'May 28, 2023',
    readTime: '6 min read',
    category: 'Manufacturing',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }, {
    id: '3',
    title: 'Navigating Supply Chain Challenges in 2023',
    excerpt: 'Insights on how to overcome current supply chain disruptions and ensure smooth production for your product.',
    author: 'Jessica Martinez',
    date: 'April 12, 2023',
    readTime: '10 min read',
    category: 'Sourcing',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }, {
    id: '4',
    title: 'The Power of Professional Product Photography',
    excerpt: 'Why investing in high-quality product images can dramatically increase your conversion rates and sales.',
    author: 'David Wilson',
    date: 'March 5, 2023',
    readTime: '7 min read',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }, {
    id: '5',
    title: 'Creating an Effective Marketing Strategy for Product Launch',
    excerpt: 'A step-by-step guide to building a marketing plan that will maximize visibility for your new product.',
    author: 'Emily Roberts',
    date: 'February 18, 2023',
    readTime: '9 min read',
    category: 'Marketing',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }, {
    id: '6',
    title: 'Sustainable Manufacturing: Practices for Eco-Conscious Brands',
    excerpt: "How to implement environmentally friendly production methods that appeal to today's conscious consumers, by Alex Thompson",
    date: "January 25, 2023'",
    readTime: '8 min read',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
  }];
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);
  return <div className="bg-white min-h-screen">
      <Navigation />
      <div className="bg-[#859CB6] bg-opacity-10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-[#434C54]">Our Blog</h1>
            {isAdmin && <Link to="/admin/blogs" className="bg-[#016E4E] text-white px-4 py-2 rounded-md flex items-center">
                <PencilIcon className="h-4 w-4 mr-2" />
                Manage Blogs
              </Link>}
          </div>
          <p className="text-xl text-[#434C54] mt-4 max-w-2xl">
            Insights, tips, and expert advice to help you navigate the product
            development journey
          </p>
        </div>
      </div>
      <div className="container mx-auto px-6 py-12">
        {/* Featured Post */}
        {featuredPost && <div className="mb-16">
            <div className="flex items-center mb-4">
              <span className="bg-[#016E4E] text-white text-xs font-bold px-3 py-1 rounded-full">
                FEATURED
              </span>
              <span className="ml-3 text-sm text-[#859CB6]">
                {featuredPost.category}
              </span>
              {isAdmin && <button onClick={() => navigate(`/admin/blogs/edit/${featuredPost.id}`)} className="ml-auto bg-gray-100 text-gray-700 p-1 rounded-full hover:bg-gray-200">
                  <PencilIcon className="h-4 w-4" />
                </button>}
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-80 overflow-hidden rounded-lg">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl font-bold text-[#434C54] mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-[#434C54] mb-6">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-sm text-[#859CB6] mb-6">
                  <UserIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{featuredPost.author}</span>
                  <CalendarIcon className="h-4 w-4 mr-1" />
                  <span className="mr-4">{featuredPost.date}</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link to={`/blog/${featuredPost.id}`} className="inline-flex items-center text-[#016E4E] font-medium hover:underline">
                  Read Full Article
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>}
        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map(post => <div key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 relative">
              {isAdmin && <button onClick={() => navigate(`/admin/blogs/edit/${post.id}`)} className="absolute top-2 right-2 bg-white text-gray-700 p-1 rounded-full hover:bg-gray-100 z-10">
                  <PencilIcon className="h-4 w-4" />
                </button>}
              <div className="h-48 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-6">
                <div className="text-sm text-[#859CB6] mb-2">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-[#434C54] mb-3">
                  {post.title}
                </h3>
                <p className="text-[#434C54] mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-[#859CB6] mb-4">
                  <UserIcon className="h-4 w-4 mr-1" />
                  <span className="mr-3">{post.author}</span>
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-[#016E4E] font-medium hover:underline">
                  Read More
                  <ArrowRightIcon className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>)}
        </div>
        {/* Newsletter Signup */}
        <div className="mt-16 bg-[#859CB6] bg-opacity-10 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-[#434C54] mb-4">
            Subscribe to Our Newsletter
          </h3>
          <p className="text-[#434C54] mb-6 max-w-2xl mx-auto">
            Get the latest insights, tips, and expert advice delivered directly
            to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <input type="email" placeholder="Your email address" className="flex-grow px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#016E4E] sm:rounded-r-none" />
            <button className="mt-2 sm:mt-0 px-6 py-2 bg-[#016E4E] text-white font-medium rounded-md sm:rounded-l-none hover:bg-opacity-90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-[#434C54] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8336.png" alt="Sprout'n Logo" className="h-10 mb-4" />
              <p className="text-gray-400 max-w-xs">
                From concept to market, we're with you every step of the way.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/services/prototyping" className="text-gray-400 hover:text-white transition-colors">
                      Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/sourcing" className="text-gray-400 hover:text-white transition-colors">
                      Sourcing
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/manufacturing" className="text-gray-400 hover:text-white transition-colors">
                      Manufacturing
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/photography" className="text-gray-400 hover:text-white transition-colors">
                      Photography
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/marketing" className="text-gray-400 hover:text-white transition-colors">
                      Marketing
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Sprout'n. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>;
};
export default BlogPage;