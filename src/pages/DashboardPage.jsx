import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContextProvider';
import axios from 'axios';

export default function DashboardPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const checkAdmin = async () => {
            try {
                // First check if user is already known to be admin
                if (user && user.role !== 'admin') {
                    throw new Error('Not authorized');
                }

                // Verify with backend
                const response = await axios.get('http://localhost:4000/api/check-admin', {
                    withCredentials: true
                });
                
                if (!response.data.success) {
                    throw new Error('Not authorized');
                }
                
                setIsLoading(false);
            } catch (error) {
                console.error('Access denied:', error);
                navigate('/login', { 
                    state: { message: 'Admin access required' }
                });
            }
        };

        checkAdmin();
    }, [navigate, user]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }
    return (
        <div className="flex flex-nowrap justify-center p-10 space-x-4">
            {/* Manage Students Card */}
            <div
                onClick={() => navigate('/manage-students')}
                className="w-60 h-40 bg-blue-500 text-white flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300"
            >
                <h2 className="text-xl font-bold">Manage Students</h2>
            </div>

            {/* Manage Teachers Card */}
            <div
                onClick={() => navigate('/manage-teachers')}
                className="w-60 h-40 bg-green-500 text-white flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-green-600 transition duration-300"
            >
                <h2 className="text-xl font-bold">Manage Teachers</h2>
            </div>

            {/* Manage Courses Card */}
            <div
                onClick={() => navigate('/manage-courses')}
                className="w-60 h-40 bg-yellow-500 text-white flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-yellow-600 transition duration-300"
            >
                <h2 className="text-xl font-bold">Manage Courses</h2>
            </div>

            {/* Manage Results Card */}
            <div
                onClick={() => navigate('/manage-results')}
                className="w-60 h-40 bg-red-500 text-white flex flex-col justify-center items-center rounded-lg cursor-pointer hover:bg-red-600 transition duration-300"
            >
                <h2 className="text-xl font-bold">Manage Results</h2>
            </div>
        </div>
    );
}