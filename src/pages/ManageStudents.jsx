import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';
import axios from 'axios';
import { UserContext } from "../UserContextProvider";

const Button = ({ children, className, disabled, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md transition-colors ${className} ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    }`}
    disabled={disabled}
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

const Modal = ({ isOpen, title, children }) => {
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

export default function ManageStudents() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    // Redirect if not logged in or not admin
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    fetchStudents();
  }, [user, navigate]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/students', {
        withCredentials: true
      });
      // Filter users to only include students
      const studentUsers = response.data.data.filter(user => user.role === 'student');
      setStudents(studentUsers);
    } catch (err) {
      console.error('Error fetching students:', err);
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async () => {
    if (!studentToDelete?._id) return;

    try {
      setDeleteLoading(true);
      await axios.delete(`/api/users/${studentToDelete._id}`, {
        withCredentials: true
      });
      
      // Remove the deleted student from state
      setStudents(prevStudents => 
        prevStudents.filter(student => student._id !== studentToDelete._id)
      );
      setShowDeleteDialog(false);
    } catch (err) {
      console.error('Error deleting student:', err);
      setError(err.response?.data?.message || 'Failed to delete student');
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
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
          >
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Student Management</h1>
        </div>
        <Button 
          onClick={() => navigate('/manage-students/create')} 
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
        >
          <Plus className="mr-2" size={16} />
          Add New Student
        </Button>
      </div>

      {error && <Alert>{error}</Alert>}

      {students.length === 0 && !error ? (
        <div className="text-center py-8 text-gray-500">
          No students found. Click "Add New Student" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{student._id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.identity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Button
                      onClick={() => navigate(`/students/edit/${student._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        setStudentToDelete(student);
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
        title="Delete Student"
      >
        <p className="mb-4">
          Are you sure you want to delete the student "{studentToDelete?.name}"?
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
            onClick={handleDeleteStudent}
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