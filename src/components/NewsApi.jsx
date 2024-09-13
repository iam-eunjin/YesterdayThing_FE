import React from 'react';

export default function NewsApi() {
  const NewsAPI = require('newsapi');
  const newsapi = new NewsAPI('d50ed0d686d34342a5038b6d2fa4f832');
  // To query /v2/top-headlines
  // All options passed to topHeadlines are optional, but you need to include at least one of them
  newsapi.v2
    .topHeadlines({
      sources: 'bbc-news,the-verge',
      q: 'bitcoin',
      category: 'business',
      language: 'en',
      country: 'kr',
    })
    .then(response => {
      console.log(response);
      /*
    {
      status: "ok",
      articles: [...]
    }
  */
    });
  return <div>NewsApi</div>;
}
