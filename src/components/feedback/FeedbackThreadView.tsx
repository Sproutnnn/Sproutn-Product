import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, SendIcon, CheckCircleIcon, ClockIcon, ImageIcon, UploadIcon, XIcon, TrashIcon } from 'lucide-react';
import { feedbackService, FeedbackThread, FeedbackReply } from '../../services/feedback.service';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface FeedbackThreadViewProps {
  thread: FeedbackThread;
  onBack: () => void;
  onThreadUpdated: () => void;
}

const FeedbackThreadView: React.FC<FeedbackThreadViewProps> = ({ thread, onBack, onThreadUpdated }) => {
  const { user } = useAuth();
  const [replies, setReplies] = useState<FeedbackReply[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadReplies();
  }, [thread.id]);

  const loadReplies = async () => {
    try {
      setLoading(true);
      const data = await feedbackService.getRepliesByThread(thread.id);
      setReplies(data);
    } catch (err) {
      console.error('Error loading replies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendReply = async () => {
    if (!user?.id || (!newMessage.trim() && uploadedImages.length === 0)) return;

    setSending(true);
    try {
      const reply = await feedbackService.addReply({
        thread_id: thread.id,
        user_id: user.id,
        message: newMessage.trim(),
        images: uploadedImages
      });

      setReplies(prev => [...prev, reply]);
      setNewMessage('');
      setUploadedImages([]);
      onThreadUpdated();
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Failed to send reply. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    setUploading(true);
    try {
      const newUrls: string[] = [];

      for (const file of Array.from(e.target.files)) {
        const fileExt = file.name.split('.').pop();
        const fileName = `feedback/${thread.id}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('project-files')
          .getPublicUrl(fileName);

        newUrls.push(urlData.publicUrl);
      }

      setUploadedImages(prev => [...prev, ...newUrls]);
    } catch (err) {
      console.error('Error uploading images:', err);
      alert('Failed to upload images.');
    } finally {
      setUploading(false);
    }
  };

  const handleStatusChange = async (newStatus: 'open' | 'resolved' | 'pending') => {
    try {
      await feedbackService.updateThreadStatus(thread.id, newStatus);
      onThreadUpdated();
      alert(`Thread marked as ${newStatus}`);
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status.');
    }
  };

  const handleDeleteThread = async () => {
    if (!window.confirm('Are you sure you want to delete this thread? This cannot be undone.')) return;

    try {
      await feedbackService.deleteThread(thread.id);
      onThreadUpdated();
      onBack();
    } catch (err) {
      console.error('Error deleting thread:', err);
      alert('Failed to delete thread.');
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to threads
          </button>
          <div className="flex items-center gap-2">
            {user?.role === 'admin' && (
              <>
                <select
                  value={thread.status}
                  onChange={(e) => handleStatusChange(e.target.value as 'open' | 'resolved' | 'pending')}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value="open">Open</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                </select>
                <button
                  onClick={handleDeleteThread}
                  className="p-1 text-red-500 hover:text-red-700"
                  title="Delete thread"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-900">{thread.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <span>Started by {thread.creator?.name || 'Unknown'}</span>
            <span>-</span>
            <span>{formatDate(thread.created_at)}</span>
            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
              thread.status === 'resolved' ? 'bg-green-100 text-green-800' :
              thread.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {thread.status.charAt(0).toUpperCase() + thread.status.slice(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Initial feedback */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-primary-700">
              {(thread.creator?.name || 'U')[0].toUpperCase()}
            </span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{thread.creator?.name || 'Unknown'}</p>
            <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{thread.initial_feedback}</p>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="px-6 py-4 max-h-96 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : replies.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No replies yet. Be the first to respond!</p>
        ) : (
          <div className="space-y-4">
            {replies.map(reply => (
              <div key={reply.id} className="flex items-start">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  reply.user?.role === 'admin' ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <span className={`text-sm font-medium ${
                    reply.user?.role === 'admin' ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {(reply.user?.name || 'U')[0].toUpperCase()}
                  </span>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-gray-900">{reply.user?.name || 'Unknown'}</p>
                    {reply.user?.role === 'admin' && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">Admin</span>
                    )}
                    <span className="text-xs text-gray-400">{formatDate(reply.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">{reply.message}</p>
                  {reply.images && reply.images.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {reply.images.map((img, idx) => (
                        <a key={idx} href={img} target="_blank" rel="noopener noreferrer">
                          <img src={img} alt={`Attachment ${idx + 1}`} className="h-20 w-20 object-cover rounded border" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reply input */}
      {thread.status !== 'resolved' && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          {uploadedImages.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {uploadedImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img src={img} alt={`Upload ${idx + 1}`} className="h-16 w-16 object-cover rounded border" />
                  <button
                    onClick={() => setUploadedImages(prev => prev.filter((_, i) => i !== idx))}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5"
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply..."
                rows={2}
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm resize-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="cursor-pointer p-2 text-gray-400 hover:text-gray-600">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400"></div>
                ) : (
                  <ImageIcon className="h-5 w-5" />
                )}
              </label>
              <button
                onClick={handleSendReply}
                disabled={sending || (!newMessage.trim() && uploadedImages.length === 0)}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
              >
                {sending ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <SendIcon className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {thread.status === 'resolved' && (
        <div className="px-6 py-4 border-t border-gray-200 bg-green-50">
          <div className="flex items-center justify-center text-green-700">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">This thread has been resolved</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackThreadView;
