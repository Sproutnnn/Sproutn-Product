import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import { blogService } from '../services/blog.service';
import 'react-quill/dist/quill.snow.css';
import '../styles/quill-custom.css';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  created_at: string;
  read_time: string;
  category: string;
  image_url: string;
  slug: string;
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slug) {
      loadBlogPost();
    }
  }, [slug]);

  const loadBlogPost = async () => {
    try {
      setLoading(true);
      setError('');
      const blogPost = await blogService.getBySlug(slug!);
      if (!blogPost) {
        setError('Blog post not found');
      } else {
        setPost(blogPost);
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
      setError('Failed to load blog post');
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

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 min-h-screen text-white">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 min-h-screen text-white">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Blog Post Not Found</h1>
            <p className="text-gray-300 mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
            <Link
              to="/blog"
              className="inline-flex items-center text-primary-400 font-medium hover:text-primary-300"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="bg-gradient-to-br from-charcoal-800 to-charcoal-900 text-white">
        {/* Header with Back Button */}
        <div className="relative py-6 border-b border-charcoal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-primary-400 font-medium hover:text-primary-300 transition-colors"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Main Content Column */}
          <article className="lg:col-span-3">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Featured Image */}
            {post.image_url && (
              <div className="mb-10 rounded-lg overflow-hidden shadow-xl">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 md:h-64 object-cover"
                  loading="lazy"
                />
              </div>
            )}

            {/* Excerpt */}
            <div className="text-xl md:text-2xl text-gray-200 mb-12 leading-relaxed font-light italic">
              {post.excerpt}
            </div>

            {/* Content */}
            <div className="prose prose-lg prose-invert max-w-none ql-editor text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>

          {/* Sidebar Column */}
          <aside className="lg:col-span-1">
            <div>
              {/* Combined Author & Post Details Card */}
              <div className="bg-charcoal-800 rounded-lg p-6 border border-charcoal-700">
                {/* Author Section */}
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  About the Author
                </h3>

                {/* Author Image Placeholder */}
                <div className="flex items-center mb-6 pb-6 border-b border-charcoal-700">
                  <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center text-2xl font-bold text-white">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-white">{post.author}</p>
                  </div>
                </div>

                {/* Post Details Section */}
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Post Details
                </h3>

                {/* Meta Information */}
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CalendarIcon className="h-5 w-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Published</p>
                      <p className="text-sm text-gray-300">{formatDate(post.created_at)}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <ClockIcon className="h-5 w-5 text-primary-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Read Time</p>
                      <p className="text-sm text-gray-300">{post.read_time}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
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
      </div>
    </>
  );
};

export default BlogDetail;
