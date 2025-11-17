import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import HeroSection from '../components/HeroSection';
import ArticleGrid from '../components/ArticleGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Footer from '../components/Footer';
import newsApi from '../services/newsApi';

// Map category IDs to NewsAPI category values
const categoryMap = {
  all: null,
  top: null,
  world: null,
  politics: 'politics',
  business: 'business',
  technology: 'technology',
};

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Fetch news data
  const fetchNews = async (category = null, search = null) => {
    setLoading(true);
    setError(null);

    try {
      let data;
      
      if (search && search.trim() !== '') {
        // Search mode
        data = await newsApi.searchArticles(search);
        setIsSearchMode(true);
      } else {
        // Category/headlines mode
        const apiCategory = categoryMap[category] || null;
        data = await newsApi.getTopHeadlines({ country: 'us', category: apiCategory });
        setIsSearchMode(false);
      }

      if (data.articles && data.articles.length > 0) {
        setArticles(data.articles);
      } else {
        setArticles([]);
        setError('No articles found. Try a different search or category.');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError(err.message || 'Failed to load news. Please check your API key and try again.');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchNews(activeCategory);
  }, []);

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchQuery(''); // Clear search when changing category
    fetchNews(category);
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      // If search is empty, go back to category view
      fetchNews(activeCategory);
    } else {
      fetchNews(null, searchQuery);
    }
  };

  // Handle search input change
  const handleSearchChange = (value) => {
    setSearchQuery(value);
    if (value.trim() === '') {
      // If search is cleared, go back to category view
      fetchNews(activeCategory);
    }
  };

  // Get hero article (first article) and grid articles (rest)
  const heroArticle = articles.length > 0 ? articles[0] : null;
  const gridArticles = articles.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearch}
        />
        
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} onRetry={() => fetchNews(activeCategory, searchQuery)} />
        ) : (
          <>
            {heroArticle && !isSearchMode && (
              <HeroSection article={heroArticle} />
            )}
            <ArticleGrid articles={isSearchMode ? articles : gridArticles} />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;




