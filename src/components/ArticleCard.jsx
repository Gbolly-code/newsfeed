import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleClick = () => {
    navigate('/article', { state: { article } });
  };

  return (
    <article
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description || article.content?.substring(0, 150) || 'No description available.'}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{article.source?.name || 'Unknown Source'}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;

