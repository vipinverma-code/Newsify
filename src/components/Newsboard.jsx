import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
const Newsboard = ({ category }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchNews = async () => {
      try {
        const response = await fetch(
          `/.netlify/functions/news?category=${encodeURIComponent(category)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }

        const data = await response.json();
        setArticles(data.articles || []);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("News fetching error:", error);
        }
      }
    };

    fetchNews();

    return () => controller.abort();
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
