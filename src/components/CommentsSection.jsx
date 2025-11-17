import React, { useState } from 'react';

const CommentsSection = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: 'Ethan Carter',
      date: 'July 27, 2024',
      avatar: '👤',
      text: "Great coverage of the conference! It's exciting to see the progress in AI and sustainable tech.",
    },
    {
      id: 2,
      author: 'Olivia Bennett',
      date: 'July 27, 2024',
      avatar: '👤',
      text: 'I agree! The focus on ethical considerations is also very important.',
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const comment = {
      id: comments.length + 1,
      author: 'You',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      avatar: '👤',
      text: newComment,
    };

    setComments([...comments, comment]);
    setNewComment('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Comments ({comments.length})
      </h2>

      <div className="space-y-6 mb-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                {comment.avatar}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-gray-900">{comment.author}</span>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
            👤
          </div>
        </div>
        <div className="flex-grow">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Post Comment
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;

