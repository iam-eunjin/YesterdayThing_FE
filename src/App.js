import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import NewsDetail from './pages/News/NewsDetail';
import ScrollToTop from './utils/ScrollToTop';
import News from './pages/News/News';
import './css/index.css';
import TopUs from './components/TopUs';
import TopKr from './components/TopKr';

function App() {
  const navigation = [
    { name: '사회', us: 'general', kr: ['politics', 'society'] },
    { name: '경제', us: 'business', kr: 'economy' },
    { name: '생활/문화', us: 'entertainment', kr: 'entertainment' },
    { name: '기술', us: 'technology', kr: 'tech' },
  ];

  const [item, setItem] = useState('국내');
  const [category, setCategory] = useState(navigation[0].us);
  const currentCategory = navigation.find(nav => nav.us === category || nav.kr.includes(category));

  return (
    <div className="App fontRegular">
      <Nav item={item} setItem={setItem} category={category} setCategory={setCategory}  />
      <Routes>
        <Route path='/'
              element={
                <>
                  {item === '국내' ? (
                    <TopUs currentCategory={currentCategory} />
                  ) : (
                    <TopKr currentCategory={currentCategory} />
                  )}    
                  <News item={item} />
                </>
              }
        />
        <Route path="/:id" element={<NewsDetail />} />
      </Routes>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
