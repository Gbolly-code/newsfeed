import React from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ article }) => {
  const navigate = useNavigate();

  if (!article) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleReadMore = () => {
    navigate('/article', { state: { article } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700"
          style={{
            backgroundImage: article.urlToImage
              ? `url(${article.urlToImage})`
              : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        {/* Content */}
        <div className="relative p-8 md:p-12 lg:p-16 text-white">
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold bg-red-600 rounded-full">
              BREAKING
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-200 leading-relaxed">
              {article.description || article.content?.substring(0, 200) || ''}
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-300">
                {formatDate(article.publishedAt)}
              </div>
              <button
                onClick={handleReadMore}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

