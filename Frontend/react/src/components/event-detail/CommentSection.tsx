import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaReply, FaUserCircle, FaSpinner } from 'react-icons/fa';

interface Comment {
  id: number;
  user: string;
  content: string;
  created_at: string;
  replies: Comment[];
}

interface CommentSectionProps {
  eventId: number;
  darkMode: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({ eventId, darkMode }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments
  const fetchComments = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/comments/`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError('Failed to load comments');
    }
  };

  useEffect(() => {
    fetchComments();
  }, [eventId]);

  // Post new comment
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) throw new Error('Failed to post comment');

      setNewComment('');
      fetchComments(); // Refresh comments
    } catch (err) {
      setError('Failed to post comment');
    } finally {
      setIsLoading(false);
    }
  };

  // Post reply
  const handleSubmitReply = async (parentId: number) => {
    if (!replyContent.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: replyContent,
          parent_comment: parentId,
        }),
      });

      if (!response.ok) throw new Error('Failed to post reply');

      setReplyContent('');
      setReplyTo(null);
      fetchComments(); // Refresh comments
    } catch (err) {
      setError('Failed to post reply');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`p-8 rounded-xl ${darkMode ? 'bg-gray-800/95' : 'bg-white/95'} shadow-xl backdrop-blur-sm`}>
      <h2 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-white' : 'text-gray-900'} border-b pb-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        Comments
      </h2>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-10">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts..."
          className={`w-full p-4 rounded-xl transition-all duration-200 ${
            darkMode
              ? 'bg-gray-700/50 text-white placeholder-gray-400 border-gray-600'
              : 'bg-gray-50 text-gray-900 placeholder-gray-400 border-gray-200'
          } border-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400`}
          rows={3}
        />
        <div className="mt-3 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2.5 rounded-xl transition-all duration-200 ${
              darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' 
                : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
            } text-white font-medium flex items-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading && <FaSpinner className="animate-spin" />}
            Post Comment
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-red-100/90 border border-red-400 text-red-700 backdrop-blur-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Comments List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'} border-b pb-6`}
          >
            {/* Comment */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <FaUserCircle className={`w-12 h-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {comment.user}
                  </span>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(comment.created_at)}
                  </span>
                </div>
                <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                  {comment.content}
                </p>
                <button
                  onClick={() => setReplyTo(comment.id)}
                  className={`mt-3 text-sm flex items-center gap-2 transition-colors duration-200 ${
                    darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'
                  }`}
                >
                  <FaReply />
                  Reply
                </button>
              </div>
            </div>

            {/* Reply Form */}
            {replyTo === comment.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="ml-16 mt-4"
              >
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className={`w-full p-3 rounded-xl transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700/50 text-white placeholder-gray-400 border-gray-600'
                      : 'bg-gray-50 text-gray-900 placeholder-gray-400 border-gray-200'
                  } border-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-blue-400`}
                  rows={2}
                />
                <div className="mt-2 flex justify-end gap-3">
                  <button
                    onClick={() => setReplyTo(null)}
                    className={`px-4 py-2 rounded-xl transition-colors duration-200 ${
                      darkMode ? 'text-gray-300 hover:text-gray-100' : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-xl transition-all duration-200 ${
                      darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white font-medium flex items-center gap-2 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading && <FaSpinner className="animate-spin" />}
                    Reply
                  </button>
                </div>
              </motion.div>
            )}

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-16 mt-4 space-y-4">
                {comment.replies.map((reply) => (
                  <motion.div
                    key={reply.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700/30' : 'bg-gray-50'
                    } flex items-start gap-3`}
                  >
                    <FaUserCircle className={`w-10 h-10 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {reply.user}
                        </span>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {formatDate(reply.created_at)}
                        </span>
                      </div>
                      <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {reply.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;