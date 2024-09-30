import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { IoMdSearch } from 'react-icons/io';
import NewsUs from './NewsUs';
import NewsKo from './NewsKo';

const categories = [
  { name: '스포츠', us: 'sports', kr: 'sports' },
  { name: '연예', us: 'entertainment', kr: 'entertainment' },
  { name: '날씨', us: 'weather', kr: 'weather' },
  { name: '주식', us: 'business', kr: 'business' },
  { name: '게임', us: 'technology', kr: 'gaming' },
  { name: '의료', us: 'health', kr: 'health' },
  { name: '자동차', us: 'automobile', kr: 'automobile' },
  { name: '부동산', us: 'real estate', kr: 'real estate' },
  { name: '건강', us: 'health', kr: 'health' },
  { name: '요리', us: 'cooking', kr: 'cooking' },
  { name: '교통', us: 'traffic', kr: 'traffic' },
  { name: '과학', us: 'science', kr: 'science' },
  { name: '기술', us: 'technology', kr: 'tech' },
  { name: '법률', us: 'law', kr: 'law' },
  { name: '여행', us: 'travel', kr: 'travel' },
  { name: '쇼핑', us: 'shopping', kr: 'shopping' },
  { name: '금융', us: 'finance', kr: 'finance' },
  { name: '교육', us: 'education', kr: 'education' },
  { name: '예술', us: 'arts', kr: 'arts' },
  { name: '환율', us: 'currency', kr: 'currency' },
];

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [item, setItem] = useState(localStorage.getItem('item') || '국내'); // 기본값 설정
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, [item]); // item이 변경될 때마다 fetchNews 호출

  const fetchNews = async (category = '') => {
    setLoading(true);
    try {
      const response = await axios.get('https://newsapi.org/v2/top-headlines', {
        params: {
          country: item === '해외' ? 'kr' : 'us', // 토글된 값에 따라 country 변경
          category: category ? category.toLowerCase() : '',
          apiKey: 'd50ed0d686d34342a5038b6d2fa4f832',
          pageSize: 100,
        },
      });
      setArticles(response.data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = index => {
    navigate(`/${index}`, { state: { articles } });
  };

  const toggleCategory = category => {
    if (selectedCategories.includes(category.name)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category.name));
    } else if (selectedCategories.length < 5) {
      setSelectedCategories([...selectedCategories, category.name]);
    }
  };

  const handleCategoryClick = category => {
    const selectedCategory = categories.find(c => c.name === category);
    const categoryForSearch = item === '해외' ? selectedCategory.kr : selectedCategory.us;
    fetchNews(categoryForSearch);
    setActiveCategory(category);
  };

  // 검색어에 맞는 뉴스 필터링
  const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) return <div className="w-9/12 mx-auto">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto">
      <div className="flex items-center w-9/12 px-4 mx-auto mt-16 ">
        <button className="px-4 py-2 text-lg text-white rounded-xl bg-blue-950" onClick={() => setIsModalOpen(true)}>
          관심사
        </button>
        <div className="flex ml-4 space-x-4 text-sm">
          {selectedCategories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 fontBold ${activeCategory === category ? 'bg-blue-950 text-white rounded-lg' : ''}`}
              onClick={() => handleCategoryClick(category)}>
              {category}
            </button>
          ))}
        </div>

        {/* 검색바 */}
        <div className="relative flex items-center ml-auto">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)} // 검색어 상태 업데이트
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <IoMdSearch className="absolute text-gray-500 right-3" />
        </div>
      </div>

      {/* 카테고리 설정 모달 */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="px-10 py-8 bg-white shadow-lg rounded-2xl ">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold">카테고리 선택 (최대 5개)</h2>
            </div>
            <div className="grid grid-cols-5 gap-4 p-2">
              {categories.map(category => (
                <button
                  key={category.name}
                  className={`px-4 py-2 text-sm rounded fontBold whitespace-nowrap hover:bg-blue-950 hover:text-white ${
                    selectedCategories.includes(category.name) ? 'bg-blue-950 text-white' : ''
                  }`}
                  onClick={() => toggleCategory(category)}
                  disabled={!selectedCategories.includes(category.name) && selectedCategories.length >= 5}>
                  {category.name}
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 text-white rounded-lg bg-blue-950" onClick={() => setIsModalOpen(false)}>
                확인
              </button>
              <button className="px-4 py-2 ml-2 border-[1px] rounded-lg " onClick={() => setIsModalOpen(false)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* 뉴스 컴포넌트 렌더링 */}
      {item === '국내' ? <NewsUs articles={filteredArticles} onArticleClick={handleArticleClick} /> : <NewsKo />}
    </div>
  );
};

export default News;
