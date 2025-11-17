const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '1036a209a79a470f8f9c6a473a89e0d4';
const BASE_URL = 'https://newsapi.org/v2';

/**
 * NewsAPI Service
 * Handles all API calls to NewsAPI
 */
class NewsApiService {
  /**
   * Fetch top headlines
   * @param {Object} params - Query parameters
   * @param {string} params.country - Country code (default: 'us')
   * @param {string} params.category - Category filter (optional)
   * @returns {Promise<Object>} API response
   */
  async getTopHeadlines({ country = 'us', category = null }) {
    try {
      let url = `${BASE_URL}/top-headlines?country=${country}&apiKey=${API_KEY}`;
      
      if (category && category !== 'all') {
        url += `&category=${category}`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'API Error');
      }

      return data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  }

  /**
   * Search for articles
   * @param {string} query - Search query
   * @param {number} pageSize - Number of results (default: 20)
   * @returns {Promise<Object>} API response
   */
  async searchArticles(query, pageSize = 20) {
    try {
      if (!query || query.trim() === '') {
        // If empty search, return top headlines
        return this.getTopHeadlines({ country: 'us' });
      }

      const url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status === 'error') {
        throw new Error(data.message || 'API Error');
      }

      return data;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  }
}

export default new NewsApiService();

