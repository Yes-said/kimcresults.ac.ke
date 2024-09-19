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
            <div className="mt-8 flex flex-col items-center justify-center min-h-screen bg-gray-300 py-6">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
                    <h1 className="text-3xl font-bold text-gray-700 text-center mb-6">Create News</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="title">Title</label>
                            <input
                                name="title"
                                id="title"
                                placeholder="Title"
                                value={news.title}
                                onChange={handleChange}
                                className="block w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Description"
                                value={news.description}
                                onChange={handleChange}
                                className="block w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="date">Date</label>
                            <input
                                name="date"
                                id="date"
                                type="date"
                                value={news.date}
                                onChange={handleChange}
                                className="block w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700" htmlFor="createdBy">Created By</label>
                            <input
                                name="createdBy"
                                id="createdBy"
                                placeholder="Created By"
                                value={news.createdBy}
                                onChange={handleChange}
                                className="block w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
                        >
                            Create News
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
