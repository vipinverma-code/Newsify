import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const Newsboard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
        );

        const data = await response.json();

        if (data.status === "ok") {
          setArticles(data.articles);
        } else {
          console.error("NewsAPI Error:", data.message);
        }
      } catch (error) {
        console.error("News fetching error:", error);
      }
    };

    fetchNews();
  }, [category]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      <div className="row">
        {articles.map((news, index) => (
          <div className="col-md-3 col-sm-6 mb-4" key={index}>
            <NewsItem
              title={news.title}
              description={news.description}
              url={news.url}
              src={news.urlToImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsboard;
