import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticleDetail from './components/ArticleDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article" element={<ArticleDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

