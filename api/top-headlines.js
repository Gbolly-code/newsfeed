export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.VITE_NEWS_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ 
      status: 'error',
      message: 'API key not configured. Please set VITE_NEWS_API_KEY environment variable.' 
    });
  }
  const { country = 'us', category } = req.query;

  try {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${API_KEY}`;
    
    if (category && category !== 'all' && category !== 'null' && category !== 'undefined') {
      url += `&category=${category}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error in top-headlines proxy:', error);
    return res.status(500).json({ 
      status: 'error',
      message: error.message || 'Internal server error' 
    });
  }
}

