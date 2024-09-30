import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsList from './NewsList';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 사용

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: 'd50ed0d686d34342a5038b6d2fa4f832',
            pageSize: 100,
          },
        });
        setArticles(response.data.articles || []); // 결과가 없을 경우 빈 배열 설정
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // 뉴스 기사를 클릭했을 때 상세 페이지로 이동하며, articles와 해당 기사 인덱스를 전달
  const handleArticleClick = index => {
    // 페이지 이동 시 articles와 선택한 index를 함께 전달
    navigate(`/news/${index}`, { state: { articles } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <NewsList articles={articles} onArticleClick={handleArticleClick} />;
};

export default News;
