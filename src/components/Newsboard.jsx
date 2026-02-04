import { useEffect,useState } from "react";
import NewsItem from "./NewsItem";


const Newsboard = ({category}) => {
    const [articles,setArticles] = useState([]);
    useEffect(()=>{
        let url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`;   
        fetch(url).then(response=> response.json()).then(data=> setArticles(data.articles || []));
    },[category]);
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
}

export default Newsboard;