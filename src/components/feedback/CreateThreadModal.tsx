import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { feedbackService, FeedbackThread } from '../../services/feedback.service';
import { useAuth } from '../../context/AuthContext';

interface CreateThreadModalProps {
  projectId: string;
  onClose: () => void;
  onCreated: (thread: FeedbackThread) => void;
}

const CreateThreadModal: React.FC<CreateThreadModalProps> = ({ projectId, onClose, onCreated }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [feedback, setFeedback] = useState('');
  const [category, setCategory] = useState('general');
  const [creating, setCreating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id || !title.trim() || !feedback.trim()) return;

    setCreating(true);
    try {
      const thread = await feedbackService.createThread({
        project_id: projectId,
        title: title.trim(),
        initial_feedback: feedback.trim(),
        category,
        created_by: user.id
      });

      onCreated(thread);
    } catch (err) {
      console.error('Error creating thread:', err);
      alert('Failed to create thread. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Start New Feedback Thread</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Brief summary of your feedback"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            >
              <option value="general">General</option>
              <option value="design">Design</option>
              <option value="quality">Quality</option>
              <option value="shipping">Shipping</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
              Feedback Details *
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Describe your feedback, questions, or concerns in detail..."
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={creating || !title.trim() || !feedback.trim()}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
            >
              {creating ? 'Creating...' : 'Create Thread'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateThreadModal;
