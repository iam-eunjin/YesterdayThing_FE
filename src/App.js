import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NewsDetail from './pages/News/NewsDetail';
import ScrollToTop from './utils/ScrollToTop';
import News from './pages/News/News';
import './css/index.css';

function App() {
  const [item, setItem] = useState('국내');

  return (
    <div className="App fontRegular">
      <Nav item={item} setItem={setItem} />
      <Routes>
        <Route path="/" element={<News item={item} />} />
        <Route path="/:id" element={<NewsDetail />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
