import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader2, ChevronLeft } from 'lucide-react';
import axios from 'axios';
import { UserContext } from "../UserContextProvider";

const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md transition-colors ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Alert = ({ children }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
    {children}
  </div>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default function ManageCourses() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    fetchCourses();
  }, [user, navigate]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/courses', {
        withCredentials: true
      });
      setCourses(response.data.data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!courseToDelete?._id) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`/courses/${courseToDelete._id}`, {
        withCredentials: true
      });
      
      // Remove the deleted course from state
      setCourses(prevCourses => 
        prevCourses.filter(course => course._id !== courseToDelete._id)
      );
      setShowDeleteDialog(false);
    } catch (err) {
      console.error('Error deleting course:', err);
      setError(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button 
            onClick={() => navigate('/dashboard')} 
            className="mr-4 bg-green-100 hover:bg-gray-200 text-gray-800 flex items-center"
          >
            <ChevronLeft className="mr-2" size={16} />
            Dashboard
          </Button>
          <h1 className="text-2xl font-bold">Manage Courses</h1>
        </div>
        <Button 
          onClick={() => navigate('/courses/new')} 
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add New Course
        </Button>
      </div>

      {error && (
        <Alert>{error}</Alert>
      )}

      {courses.length === 0 && !error ? (
        <div className="text-center py-8 text-gray-500">
          No courses found. Click "Add New Course" to create one.
        </div>
      ) : (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                  <td className="px-6 py-4">{course.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button
                      onClick={() => {
                        setCourseToDelete(course);
                        setShowDeleteDialog(true);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal 
        isOpen={showDeleteDialog} 
        onClose={() => setShowDeleteDialog(false)}
        title="Delete Course"
      >
        <p className="mb-4">
          Are you sure you want to delete the course "{courseToDelete?.name}"?
          This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button 
            onClick={() => setShowDeleteDialog(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={deleteLoading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDeleteCourse}
            className="bg-red-500 hover:bg-red-600 text-white flex items-center"
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete'
            )}
          </Button>
        </div>
      </Modal>
    </div>
  );
}