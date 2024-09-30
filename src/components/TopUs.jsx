import React, { useEffect, useState } from 'react';
import images from '../utils/importAll';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function TopUs(props) {
  const [articles, setArticles] = useState([]);
  const category = props.category;

  useEffect(() => {
    const fetchTopNews = async () => {
      const response = await fetch(`http://localhost:8080/news/top?category=${category}`);
      const data = await response.json();
      setArticles(data);
    };
    fetchTopNews();
  }, [category]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="slider-container">
        <Slider {...settings}>
          {articles.map((article, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full mx-auto">
                <img
                  src={article.urlToImage ? article.urlToImage : images['technology.jpg']}
                  alt={article.title}
                  className="object-cover w-5/6 h-64 mx-auto rounded-lg"
                />
                <div className="w-5/6 mx-auto mt-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-900 ">
                    {article.title}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
