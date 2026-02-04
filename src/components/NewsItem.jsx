import newsimage from "../assets/news.jpg";
const NewsItem = ({ title, description, url, image }) => {
  return (
    <div className="card bg-dark text-light h-100">   
     <img src={image || newsimage} className="card-img-top" alt="news" style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null; 
          e.target.src = newsimage;
        }}
     />

      <div className="card-body">
        <h5 className="card-title">{title?.slice(0, 50)}</h5>
        <p className="card-text">
          {description
            ? description.slice(0, 90)
            : "News is the current information about something happened"}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary btn-sm"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;
