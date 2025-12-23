import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { projectsService } from '../services/projects.service';
import { useAuth } from '../context/AuthContext';
const ProjectCreation: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    targetMarket: '',
    estimatedBudget: ''
  });
  const [customCategory, setCustomCategory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      // Use custom category if "other" is selected
      const finalCategory = formData.category === 'other' ? customCategory : formData.category;

      await projectsService.create({
        name: formData.name,
        description: formData.description,
        category: finalCategory,
        target_market: formData.targetMarket,
        estimated_budget: formData.estimatedBudget,
        customer_id: user.id,
        status: 'draft'
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div>
      <button onClick={() => navigate(-1)} className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeftIcon className="h-4 w-4 mr-1" />
        Back
      </button>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Project
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Project Name *
              </label>
              <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Brief Description
              </label>
              <textarea name="description" id="description" rows={3} value={formData.description} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Product Category
              </label>
              <select id="category" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="">Select a category</option>
                <option value="beauty-personal-care">Beauty & Personal Care</option>
                <option value="home-kitchen">Home & Kitchen</option>
                <option value="electronics-tech">Electronics & Tech</option>
                <option value="sports-outdoors">Sports & Outdoors</option>
                <option value="health-wellness">Health & Wellness</option>
                <option value="toys-games">Toys & Games</option>
                <option value="fashion-accessories">Fashion & Accessories</option>
                <option value="other">Other</option>
              </select>
              {formData.category === 'other' && (
                <div className="mt-2">
                  <label htmlFor="customCategory" className="block text-sm font-medium text-gray-700">
                    Please specify your category *
                  </label>
                  <input
                    type="text"
                    id="customCategory"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Enter your product category"
                  />
                </div>
              )}
            </div>
            <div>
              <label htmlFor="targetMarket" className="block text-sm font-medium text-gray-700">
                Target Market
              </label>
              <input type="text" name="targetMarket" id="targetMarket" value={formData.targetMarket} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., Young professionals, Parents, etc." />
            </div>
            <div>
              <label htmlFor="estimatedBudget" className="block text-sm font-medium text-gray-700">
                Estimated Budget
              </label>
              <input type="text" name="estimatedBudget" id="estimatedBudget" value={formData.estimatedBudget} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="e.g., $5,000 - $10,000" />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button type="button" onClick={() => navigate(-1)} className="mr-4 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting || !formData.name || (formData.category === 'other' && !customCategory.trim())} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default ProjectCreation;