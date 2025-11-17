import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import EngagementBar from './EngagementBar';
import RelatedArticles from './RelatedArticles';
import CommentsSection from './CommentsSection';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import newsApi from '../services/newsApi';

const ArticleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(location.state?.article || null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(!article);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!article) {
      navigate('/');
      return;
    }

    const fetchRelatedArticles = async () => {
      try {
        const searchTerm = article.title?.split(' ').slice(0, 3).join(' ') || '';
        if (searchTerm) {
          const data = await newsApi.searchArticles(searchTerm, 10);
          const filtered = data.articles?.filter(
            (a) => a.url !== article.url
          ) || [];
          setRelatedArticles(filtered);
        }
      } catch (err) {
        console.error('Error fetching related articles:', err);
      }
    };

    fetchRelatedArticles();
  }, [article, navigate]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </main>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategory = () => {
    const sourceName = article.source?.name?.toLowerCase() || '';
    if (sourceName.includes('tech') || article.title?.toLowerCase().includes('tech')) {
      return 'Technology';
    }
    return 'News';
  };

  const getAuthor = () => {
    return article.author || 'News Today Staff';
  };

  const formatContent = (content) => {
    if (!content) return '';
    return content.replace(/\[\+\d+\s\w+\]/g, '').trim();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="text-sm text-gray-500 mb-4">
            <a href="/" className="hover:text-blue-600" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              News
            </a>
            {' / '}
            <span className="text-gray-700">{getCategory()}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="text-gray-600 mb-6">
            By <span className="font-semibold">{getAuthor()}</span>
            {' · '}
            Published on {formatDate(article.publishedAt)}
          </div>

          <div className="mb-8 rounded-lg overflow-hidden">
            {article.urlToImage ? (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="w-full h-96 bg-gradient-to-br from-teal-400 via-blue-400 to-blue-600 flex items-center justify-center">
                <svg
                  className="w-24 h-24 text-white opacity-50"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none mb-8">
            {article.description && (
              <p className="text-xl text-gray-700 font-medium mb-6 leading-relaxed">
                {article.description}
              </p>
            )}
            
            {article.content ? (
              <div className="text-gray-700 leading-relaxed space-y-4">
                {formatContent(article.content).split('\n').map((paragraph, index) => {
                  if (paragraph.trim()) {
                    return (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            ) : (
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p>
                  {article.description || 'No additional content available.'}
                </p>
                <p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Read the full article on {article.source?.name || 'the source website'} →
                  </a>
                </p>
              </div>
            )}
          </div>

          <EngagementBar />

          {relatedArticles.length > 0 && (
            <RelatedArticles articles={relatedArticles} />
          )}

          <CommentsSection />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;

