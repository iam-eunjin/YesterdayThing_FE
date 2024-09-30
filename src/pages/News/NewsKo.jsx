import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NewsKo = ({ category }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 16;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://api-v2.deepsearch.com/v1/articles?date_from=2024-09-30&date_to=2024-09-30&&page=1&page_size=100&api_key=ee553f51ee2f42aaaad33550453af46c`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        setNews(response.data.data || []);
      } catch (error) {
        setError('뉴스를 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(news.length / articlesPerPage);
  const maxPageNumbersToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleArticleClick = index => {
    navigate(`/${index}`, { state: { articles: news } });
  };

  if (loading) return <div className="w-8/12 mx-auto my-16 text-2xl font-bold text-center">페이지 로딩 중...</div>;
  if (error) return <div className="w-8/12 mx-auto my-16 text-2xl font-bold text-center">{error}</div>;

  return (
    <div className="container w-9/12 p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">국내 뉴스</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentArticles.map((article, index) => (
          <div
            className="p-4 bg-white rounded shadow cursor-pointer"
            key={index}
            onClick={() => handleArticleClick(indexOfFirstArticle + index)}>
            {article.image_url ? (
              <img src={article.image_url} alt={article.title} className="object-cover w-full h-48 mb-2 rounded" />
            ) : (
              <div className="flex items-center justify-center w-full h-48 mb-2 bg-gray-200 rounded">
                <span className="text-sm text-gray-500">이미지가 없는 뉴스입니다</span>
              </div>
            )}
            <h2 className="text-lg font-semibold truncate">{article.title}</h2>
            <p className="text-gray-600 truncate">{article.summary}</p>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-20">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-2 mx-1 text-gray-400">
          <MdKeyboardDoubleArrowLeft />
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(pageNumber => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`mx-1 px-3 py-2 ${pageNumber === currentPage ? 'text-blue-500' : 'text-gray-400'}`}>
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-2 mx-1 text-gray-400">
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>
    </div>
  );
};

export default NewsKo;
