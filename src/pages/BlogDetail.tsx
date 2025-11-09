import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeftIcon, CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import { blogService } from '../services/blog.service';
import ReactMarkdown from 'react-markdown';

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
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016E4E]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-[#434C54] mb-4">Blog Post Not Found</h1>
            <p className="text-[#434C54] mb-6">{error || 'The blog post you are looking for does not exist.'}</p>
            <Link
              to="/blog"
              className="inline-flex items-center text-[#016E4E] font-medium hover:underline"
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
    <div className="bg-white min-h-screen">
      <Navigation />

      {/* Header */}
      <div className="bg-[#859CB6] bg-opacity-10 py-8">
        <div className="container mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center text-[#016E4E] font-medium hover:underline mb-4"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>

      {/* Article */}
      <article className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="inline-block bg-[#016E4E] text-white text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#434C54] mb-6">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center text-sm text-[#859CB6] mb-8 gap-4">
          <div className="flex items-center">
            <UserIcon className="h-4 w-4 mr-1" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-1" />
            <span>{formatDate(post.created_at)}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-1" />
            <span>{post.read_time}</span>
          </div>
        </div>

        {/* Featured Image */}
        {post.image_url && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        )}

        {/* Excerpt */}
        <div className="text-xl text-[#434C54] mb-8 font-medium border-l-4 border-[#016E4E] pl-4">
          {post.excerpt}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            className="text-[#434C54]"
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-[#434C54]" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-[#434C54]" {...props} />,
              h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 text-[#434C54]" {...props} />,
              p: ({ node, ...props }) => <p className="mb-4 text-[#434C54] leading-relaxed" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-[#434C54]" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-[#434C54]" {...props} />,
              li: ({ node, ...props }) => <li className="mb-2" {...props} />,
              a: ({ node, ...props }) => <a className="text-[#016E4E] hover:underline" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-[#859CB6] pl-4 italic my-4 text-[#434C54]" {...props} />
              ),
              code: ({ node, ...props }) => (
                <code className="bg-gray-100 px-2 py-1 rounded text-sm" {...props} />
              ),
              pre: ({ node, ...props }) => (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Footer */}
      <footer className="bg-[#434C54] text-white py-12 mt-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <img src="/IMG_8337.png" alt="Sprout'n Logo" className="h-10 mb-4" />
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
                      Sampling
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/sourcing" className="text-gray-400 hover:text-white transition-colors">
                      Manufacturing & Freight
                    </Link>
                  </li>
                  <li>
                    <Link to="/services/photography" className="text-gray-400 hover:text-white transition-colors">
                      Product Shots
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
    </div>
  );
};

export default BlogDetail;
