import { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { fetchNews } from "../services/newsApi";

const Newsboard = ({ category }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await fetchNews(category);

        setArticles(data);
      } catch (error) {
        console.error("News fetching error:", error);

        setArticles([]);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [category]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        Latest <span className="badge bg-danger">News</span>
      </h2>

      {loading && <h5 className="text-center">Loading news...</h5>}

      {error && <div className="alert alert-danger text-center">{error}</div>}

      {!loading && !error && articles.length === 0 && (
        <h5 className="text-center">No news articles found.</h5>
      )}

      <div className="row">
        {articles.map((news) => (
          <div className="col-md-3 col-sm-6 mb-4" key={news.id}>
            <NewsItem
              title={news.webTitle}
              description={news.fields?.trailText}
              url={news.webUrl}
              src={news.fields?.thumbnail}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newsboard;
