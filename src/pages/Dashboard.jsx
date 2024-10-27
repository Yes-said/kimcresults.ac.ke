import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

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
};

export default Dashboard;
