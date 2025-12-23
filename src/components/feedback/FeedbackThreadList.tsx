import React, { useState, useEffect } from 'react';
import { MessageSquareIcon, PlusIcon, CheckCircleIcon, ClockIcon, AlertCircleIcon } from 'lucide-react';
import { feedbackService, FeedbackThread } from '../../services/feedback.service';
import { useAuth } from '../../context/AuthContext';
import FeedbackThreadView from './FeedbackThreadView';
import CreateThreadModal from './CreateThreadModal';

interface FeedbackThreadListProps {
  projectId: string;
}

const FeedbackThreadList: React.FC<FeedbackThreadListProps> = ({ projectId }) => {
  const { user } = useAuth();
  const [threads, setThreads] = useState<FeedbackThread[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState<FeedbackThread | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadThreads();
  }, [projectId]);

  const loadThreads = async () => {
    try {
      setLoading(true);
      const data = await feedbackService.getThreadsByProject(projectId);
      setThreads(data);
    } catch (err) {
      console.error('Error loading threads:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleThreadCreated = (newThread: FeedbackThread) => {
    setThreads(prev => [newThread, ...prev]);
    setShowCreateModal(false);
  };

  const handleThreadUpdated = () => {
    loadThreads();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'resolved':
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircleIcon className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'resolved':
        return 'Resolved';
      case 'pending':
        return 'Pending';
      default:
        return 'Open';
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      general: 'General',
      design: 'Design',
      quality: 'Quality',
      shipping: 'Shipping',
      other: 'Other'
    };
    return labels[category] || category;
  };

  if (selectedThread) {
    return (
      <FeedbackThreadView
        thread={selectedThread}
        onBack={() => setSelectedThread(null)}
        onThreadUpdated={handleThreadUpdated}
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium text-gray-900">Feedback & Conversations</h3>
          <p className="text-sm text-gray-500">Track feedback and discussions about this project</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <PlusIcon className="h-4 w-4 mr-1" />
          New Thread
        </button>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : threads.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquareIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">No feedback threads yet</h4>
            <p className="text-sm text-gray-500 mb-4">
              Start a conversation about this project by creating a new thread.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              Create First Thread
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {threads.map(thread => (
              <div
                key={thread.id}
                onClick={() => setSelectedThread(thread)}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(thread.status)}
                      <h4 className="text-sm font-medium text-gray-900 truncate">{thread.title}</h4>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">
                        {getCategoryLabel(thread.category)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2">{thread.initial_feedback}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>By {thread.creator?.name || 'Unknown'}</span>
                      <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                      <span>{thread.replies_count || 0} replies</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      thread.status === 'resolved' ? 'bg-green-100 text-green-800' :
                      thread.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {getStatusLabel(thread.status)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateThreadModal
          projectId={projectId}
          onClose={() => setShowCreateModal(false)}
          onCreated={handleThreadCreated}
        />
      )}
    </div>
  );
};

export default FeedbackThreadList;
