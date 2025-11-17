import React from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedArticles = ({ articles = [] }) => {
  const navigate = useNavigate();

  // Show only first 2 articles as related
  const relatedArticles = articles.slice(0, 2);

  if (relatedArticles.length === 0) {
    return null;
  }

  const handleArticleClick = (article) => {
    navigate('/article', { state: { article } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedArticles.map((article, index) => (
          <article
            key={index}
            onClick={() => handleArticleClick(article)}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
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
                <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
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
              <span className="inline-block px-2 py-1 mb-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded">
                {article.source?.name || 'News'}
              </span>
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {article.description || article.content?.substring(0, 100) || 'No description available.'}
              </p>
              <span className="text-blue-600 text-sm font-medium hover:underline">
                Read More →
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default RelatedArticles;




