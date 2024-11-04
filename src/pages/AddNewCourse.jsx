import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Input = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      className={`shadow appearance-none border ${error ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

const TextArea = ({ label, error, ...props }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <textarea
      className={`shadow appearance-none border ${error ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
  </div>
);

export default function AddNewCourse() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if not logged in or not admin
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    ///Assuming role is stored in user object
     if (user?.role !== 'admin') {
       navigate('/');
     }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Course description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post('/courses', formData, {
        withCredentials: true
      });

      if (response.data.success) {
        alert('Course created successfully!');
        navigate('/manage-courses');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      const errorMessage = error.response?.data?.message || 'Failed to create course. Please try again.';
      setErrors(prev => ({
        ...prev,
        submit: errorMessage
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Add New Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
        <Input
          label="Course Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter course name"
          error={errors.name}
        />

        <TextArea
          label="Course Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter course description"
          error={errors.description}
        />

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {errors.submit}
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            onClick={() => navigate('/manage-courses')}
            className="bg-green-200 hover:bg-green-300 text-green-800"
          >
            Back To Manage Course
          </Button>
         
          <Button
            type="submit"
            className={`bg-blue-500 hover:bg-blue-600 text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Course'}
          </Button>
        </div>
      </form>
    </div>
  );
}