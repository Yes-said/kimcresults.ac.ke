import { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
    const [news, setNews] = useState([]);
    const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/news")
            .then(response => setNews(response.data))
            .catch(err => setError(err.response?.data || "Failed to fetch news"));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentNewsIndex(prevIndex => (prevIndex + 1) % news.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [news.length]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="news-section">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Latest News</h2>
            <div className="news-container">
                <div className="news-wrapper">
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <div
                                key={item._id}
                                className={`news-item ${index === currentNewsIndex ? 'active' : ''}`}
                            >
                                <h4 className="text-2xl font-bold text-blue-800">
                                    {item.title}
                                </h4>
                                <p className="text-gray-600">
                                    Posted by: {item.createdBy}
                                </p>
                                <p className="text-gray-600">
                                    Date: {new Date(item.date).toLocaleDateString()}
                                </p>
                                <p className="mt-2 text-gray-700">
                                    {item.description}
                                </p>
                                <p className="mt-2 text-gray-500">
                                    Updated at: {new Date(item.updatedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-blue-800">No news found</div>
                    )}
                </div>
            </div>
        </div>
    );
}
