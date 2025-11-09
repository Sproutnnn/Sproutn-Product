import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SaveIcon, ImageIcon, XIcon } from 'lucide-react';
import { blogService } from '../../services/blog.service';
import { supabase } from '../../lib/supabase';

interface BlogPost {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  read_time: string;
  featured: boolean;
  published: boolean;
}

interface BlogEditorProps {
  editMode?: boolean;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ editMode = false }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<BlogPost>({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image_url: '',
    read_time: '5 min read',
    featured: false,
    published: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const categories = [
    'Product Development',
    'Manufacturing',
    'Sourcing',
    'Photography',
    'Marketing',
    'Sustainability',
    'Business Tips'
  ];

  useEffect(() => {
    if (editMode && id) {
      loadBlogPost();
    }
  }, [editMode, id]);

  const loadBlogPost = async () => {
    try {
      setLoading(true);
      const blogPost = await blogService.getById(id!);
      if (blogPost) {
        setPost({
          title: blogPost.title,
          excerpt: blogPost.excerpt || '',
          content: blogPost.content || '',
          author: blogPost.author,
          category: blogPost.category,
          image_url: blogPost.image_url || '',
          read_time: blogPost.read_time || '5 min read',
          featured: blogPost.featured || false,
          published: blogPost.published || false
        });
        setImagePreview(blogPost.image_url || '');
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
      setError('Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPost(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return post.image_url || null;

    try {
      setUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Upload image if there's a new one
      let imageUrl = post.image_url;
      if (imageFile) {
        const uploadedUrl = await uploadImage();
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }

      const blogData = {
        ...post,
        image_url: imageUrl
      };

      if (editMode && id) {
        await blogService.update(id, blogData);
      } else {
        await blogService.create(blogData);
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/blogs');
      }, 1500);
    } catch (error) {
      console.error('Error saving blog post:', error);
      setError(error instanceof Error ? error.message : 'Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  if (loading && editMode && !post.title) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#016E4E]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-[#434C54]">
          {editMode ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h2>
        {success && (
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-md text-sm">
            Post {editMode ? 'updated' : 'created'} successfully!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {error && (
          <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#434C54] mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]"
              placeholder="Enter blog post title"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-[#434C54] mb-1">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={post.excerpt}
              onChange={handleChange}
              required
              rows={2}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]"
              placeholder="Brief summary of the blog post"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-[#434C54] mb-1">
              Content * (Markdown supported)
            </label>
            <textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              required
              rows={15}
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E] font-mono"
              placeholder="Write your blog post content here (Markdown supported)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-[#434C54] mb-1">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={post.author}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]"
                placeholder="Author name"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-[#434C54] mb-1">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={post.category}
                onChange={handleChange}
                required
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]"
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="read_time" className="block text-sm font-medium text-[#434C54] mb-1">
              Read Time *
            </label>
            <input
              type="text"
              id="read_time"
              name="read_time"
              value={post.read_time}
              onChange={handleChange}
              required
              className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#016E4E] focus:border-[#016E4E]"
              placeholder="e.g., 5 min read"
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-[#434C54] mb-1">
              Featured Image
            </label>
            <div className="flex space-x-2">
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer bg-[#859CB6] bg-opacity-10 hover:bg-opacity-20 text-[#434C54] py-2 px-4 rounded-md flex items-center"
              >
                <ImageIcon className="h-5 w-5 mr-1" />
                {imageFile ? 'Change Image' : 'Upload Image'}
              </label>
              {imagePreview && (
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview('');
                    setPost(prev => ({ ...prev, image_url: '' }));
                  }}
                  className="bg-red-100 text-red-700 hover:bg-red-200 py-2 px-4 rounded-md flex items-center"
                >
                  <XIcon className="h-5 w-5 mr-1" />
                  Remove
                </button>
              )}
            </div>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-40 object-cover rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={post.featured}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-[#016E4E] focus:ring-[#016E4E] border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-[#434C54]">
                Feature this post
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="published"
                name="published"
                checked={post.published}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-[#016E4E] focus:ring-[#016E4E] border-gray-300 rounded"
              />
              <label htmlFor="published" className="ml-2 block text-sm text-[#434C54]">
                Publish immediately
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/admin/blogs')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#434C54] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading || uploading}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#016E4E] hover:bg-[#015d42] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#016E4E] disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading || uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                {uploading ? 'Uploading...' : editMode ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <SaveIcon className="h-4 w-4 mr-2" />
                {editMode ? 'Update Post' : 'Create Post'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
