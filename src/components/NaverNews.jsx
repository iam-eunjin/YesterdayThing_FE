import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NaverNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/news', {
          params: { query: '기술' },
        });

        setNews(response.data.items);
        setLoading(false);
        console.log(response.data.items);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>네이버 뉴스 검색 결과</h1>
      <ul>
        {news.map(item => (
          <li key={item.link}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {item.title.replace(/<[^>]+>/g, '')}
            </a>
            <p>{item.description.replace(/<[^>]+>/g, '')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NaverNews;
