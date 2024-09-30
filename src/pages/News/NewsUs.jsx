import React, { useState } from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const NewsUs = ({ articles = [], onArticleClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 16;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = Array.isArray(articles) ? articles.slice(indexOfFirstArticle, indexOfLastArticle) : [];

  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const maxPageNumbersToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="container w-9/12 p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">뉴스</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentArticles.map((article, index) => (
          <div
            className="p-4 bg-white rounded shadow cursor-pointer"
            key={index}
            onClick={() => onArticleClick(indexOfFirstArticle + index)} // 클릭 시 index 전달
          >
            {article.urlToImage ? (
              <img src={article.urlToImage} alt={article.title} className="object-cover w-full h-48 mb-2 rounded" />
            ) : (
              <div className="flex items-center justify-center w-full h-48 mb-2 bg-gray-200 rounded">
                <span className="text-sm text-gray-500">이미지가 없는 뉴스입니다</span>
              </div>
            )}
            <h2 className="text-lg font-semibold truncate">{article.title}</h2>
            <p className="text-gray-600 truncate">{article.description}</p>
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
            className={`mx-1 px-3 py-2  ${pageNumber === currentPage ? 'text-blue-500 ' : 'text-gray-400'}`}>
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

export default NewsUs;
