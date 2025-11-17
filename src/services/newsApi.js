class NewsApiService {
  getBaseUrl() {
    if (import.meta.env.PROD) {
      return '/api';
    }
    return 'https://newsapi.org/v2';
  }

  async getTopHeadlines({ country = 'us', category = null }) {
    try {
      const baseUrl = this.getBaseUrl();
      let url;
      
      if (baseUrl === '/api') {
        url = `/api/top-headlines?country=${country}`;
        if (category && category !== 'all') {
          url += `&category=${category}`;
        }
      } else {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        if (!API_KEY) {
          throw new Error('VITE_NEWS_API_KEY is not set. Please add it to your .env file.');
        }
        url = `${baseUrl}/top-headlines?country=${country}&apiKey=${API_KEY}`;
        if (category && category !== 'all') {
          url += `&category=${category}`;
        }
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

  async searchArticles(query, pageSize = 20) {
    try {
      if (!query || query.trim() === '') {
        return this.getTopHeadlines({ country: 'us' });
      }

      const baseUrl = this.getBaseUrl();
      let url;
      
      if (baseUrl === '/api') {
        url = `/api/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}`;
      } else {
        const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
        if (!API_KEY) {
          throw new Error('VITE_NEWS_API_KEY is not set. Please add it to your .env file.');
        }
        url = `${baseUrl}/everything?q=${encodeURIComponent(query)}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=${API_KEY}`;
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
      console.error('Error searching articles:', error);
      throw error;
    }
  }
}

export default new NewsApiService();

