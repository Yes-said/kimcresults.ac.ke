// Frontend: Create or update EditStudent component
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

export default function EditStudent () {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        identity: '',
        course: ''
    });

    useEffect(() => {
        fetchStudent();
    }, [id]);

    const fetchStudent = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(`/api/students/${id}`, {
                withCredentials: true
            });
            
            if (response.data.success) {
                const { name, identity, course } = response.data.data;
                setFormData({ name, identity, course });
            }
        } catch (err) {
            console.error('Error fetching student:', err);
            setError(err.response?.data?.message || 'Failed to fetch student');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            
            const response = await axios.put(`/api/students/${id}`, formData, {
                withCredentials: true
            });

            if (response.data.success) {
                navigate('/manage-students');
            }
        } catch (err) {
            console.error('Error updating student:', err);
            setError(err.response?.data?.message || 'Failed to update student');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate('/manage-students')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Back to Students
                </button>
                <h1 className="text-2xl font-bold">Edit Student</h1>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Student Number
                    </label>
                    <input
                        type="text"
                        name="identity"
                        value={formData.identity}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course
                    </label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    >
                        <option value="">Select Course</option>
                        <option value="ict">ICT</option>
                        <option value="nursing">Nursing</option>
                        <option value="clinical medicine">Clinical Medicine</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating...
                        </div>
                    ) : (
                        'Update Student'
                    )}
                </button>
            </form>
        </div>
    );
};
