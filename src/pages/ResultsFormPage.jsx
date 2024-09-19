import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import AccountNav from '../AccountNav';

const ResultsFormPage = () => {
    const [studentName, setStudentName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [course, setCourse] = useState('');
    const [units, setUnits] = useState([{ unit: '', marks: '' }]);
    const [pdfFile, setPdfFile] = useState(null);
    const formRef = useRef(null);

    const { user } = useContext(UserContext); // Access user context

    const handleUnitChange = (index, event) => {
        const newUnits = [...units];
        newUnits[index][event.target.name] = event.target.value;
        setUnits(newUnits);
    };

    const addUnitField = () => {
        setUnits([...units, { unit: '', marks: '' }]);
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        // Limit file size to 5MB
        if (file && file.size > 5 * 1024 * 1024) {
            alert('File size should not exceed 5MB');
        } else {
            setPdfFile(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = user?.token;

        const formData = new FormData();
        formData.append('studentName', studentName);
        formData.append('registrationNumber', registrationNumber);
        formData.append('course', course);
        formData.append('pdfFile', pdfFile);
        units.forEach((unit, index) => {
            formData.append(`units[${index}][unit]`, unit.unit);
            formData.append(`units[${index}][marks]`, unit.marks);
        });

        try {
            const response = await axios.post('http://localhost:4000/upload-results', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                alert('Results uploaded successfully');
                setStudentName('');
                setRegistrationNumber('');
                setCourse('');
                setUnits([{ unit: '', marks: '' }]);
                setPdfFile(null);
                formRef.current.reset(); // Reset the form
            } else {
                alert('Failed to upload results');
            }
        } catch (error) {
            console.error('Error uploading results:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <>
            <AccountNav />
            <div className="min-h-screen flex flex-col">
                <div className="flex-grow flex items-center justify-center bg-gray-300">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Upload Student Results</h1>
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <label className="block text-sm font-medium text-gray-700">Student Name</label>
                            <input
                                type="text"
                                value={studentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                placeholder="Enter student's full name"
                                className="block w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                            />

                            <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                            <input
                                type="text"
                                value={registrationNumber}
                                onChange={(e) => setRegistrationNumber(e.target.value)}
                                placeholder="Enter registration number"
                                className="block w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                            />

                            <label className="block text-sm font-medium text-gray-700">Course</label>
                            <input
                                type="text"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                placeholder="Enter course name"
                                className="block w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                            />

                            <label className="block text-sm font-medium text-gray-700">Units and Marks</label>
                            {units.map((unit, index) => (
                                <div key={index} className="flex gap-4 mb-2">
                                    <input
                                        type="text"
                                        name="unit"
                                        value={unit.unit}
                                        onChange={(e) => handleUnitChange(index, e)}
                                        placeholder={`Unit ${index + 1}`}
                                        className="block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="marks"
                                        value={unit.marks}
                                        onChange={(e) => handleUnitChange(index, e)}
                                        placeholder="Marks"
                                        className="block w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addUnitField}
                                className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mb-2 hover:bg-blue-600 transition"
                            >
                                Add Unit
                            </button>

                            <label className="block text-sm font-medium text-gray-700">Upload PDF File</label>
                            <input
                                type="file"
                                onChange={handlePdfChange}
                                className="block w-full px-4 py-2 mt-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 mb-2"
                            />

                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResultsFormPage;
