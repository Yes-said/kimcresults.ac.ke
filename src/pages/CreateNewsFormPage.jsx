import axios from "axios";
import { useState } from "react";
import AccountNav from "../AccountNav";

export default function CreateNewsFormPage() {

    const [news, setNews] = useState({
        title: '',
        description: '',
        date: '',
        createdBy: '',
    });

    const handleChange = (e) => {
        setNews({ ...news, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const token = localStorage.getItem('token');
          console.log('Token:', token); // Log the token to check if it's being retrieved correctly
          
          const response = await axios.post("/news", news, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        
  
          alert('News created successfully!');
          console.log('Response from server:', response.data); // Log the response data
        } catch (error) {
          console.error('Failed to create news', error);

 if (error.response) {
            console.log('Error response data:', error.response.data); // Log error response data
            console.log('Error response status:', error.response.status); // Log error response status
            console.log('Error response headers:', error.response.headers); // Log error response headers
        } 
        alert('Failed to create news');         
      }
  };
  

    return (
      <>
      <AccountNav />
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Create News</h1>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <input
                        name="title"
                        placeholder="Title"
                        value={news.title}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={news.description}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        required
                    ></textarea>
                    <input
                        name="date"
                        type="date"
                        value={news.date}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        required
                    />
                    <input
                        name="createdBy"
                        placeholder="Created By"
                        value={news.createdBy}
                        onChange={handleChange}
                        className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        required
                    />
                    <button type="submit" className="primary mt-4">Create News</button>
                </form>
            </div>
        </div>
        </>
    );
}
