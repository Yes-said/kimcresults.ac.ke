import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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

export default function EditTeacher() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: ''
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }

    const fetchTeacher = async () => {
      try {
        setFetchLoading(true);
        const response = await axios.get(`/manage-teachers/${id}`, {
          withCredentials: true
        });
        
        if (response.data.success) {
          const { name, email, subject } = response.data.data;
          setFormData({ name, email, subject });
        } else {
          setError(response.data.message || 'Failed to fetch teacher data');
        }
      } catch (err) {
        console.error('Error fetching teacher:', err);
        setError(err.response?.data?.message || 'Failed to fetch teacher data');
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchTeacher();
    }
  }, [id, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/manage-teachers/${id}`, formData, {
        withCredentials: true
      });
      
      if (response.data.success) {
        navigate('/manage-teachers');
      } else {
        setError(response.data.message || 'Failed to update teacher');
      }
    } catch (err) {
      console.error('Error updating teacher:', err);
      setError(err.response?.data?.message || 'Failed to update teacher');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/manage-teachers')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
        >
          Back to Teachers
        </button>
        <h1 className="text-2xl font-bold">Edit Teacher</h1>
      </div>

      {error && <Alert>{error}</Alert>}

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter teacher's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter teacher's email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              required
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter teaching subject"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={() => navigate('/manage-teachers')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Teacher'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}