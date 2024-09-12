import React, { useRef, useState, useContext } from 'react';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { UserContext } from '../UserContext';

const ResultsFormPage = () => {
    const [studentName, setStudentName] = useState('');
    const [registrationNumber, setRegistrationNumber] = useState('');
    const [course, setCourse] = useState('');
    const [units, setUnits] = useState('');
    const [marks, setMarks] = useState('');
    const [pdfFile, setPdfFile] = useState(null);
    const formRef = useRef(null);

    const { user } = useContext(UserContext); // Access user context

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = user?.token; // Ensure token is retrieved from user context
    
       
    
        const formData = new FormData();
        formData.append("studentName", studentName);
        formData.append("registrationNumber", registrationNumber);
        formData.append("course", course);
        formData.append("units", units);
        formData.append("marks", marks);
        formData.append("pdfFile", pdfFile);
    
        try {
            const response = await axios.post("http://localhost:4000/upload-results", formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Include the token here
                },
            });
    
            if (response.data.success) {
                alert("Results uploaded successfully");
                setStudentName('');
                setRegistrationNumber('');
                setCourse('');
                setUnits('');
                setMarks('');
                setPdfFile(null);
                formRef.current.reset();
            } else {
                alert("Failed to upload results");
            }
        } catch (error) {
            console.error("Error uploading results:", error);
            alert("An error occurred. Please try again.");
        }
    };
    
    
    return (
        <>
            <AccountNav />
            <div className="mt-4 grow flex items-center justify-around">
                <div className="mb-64">
                    <h1 className="text-4xl text-center mb-4">Upload Results</h1>
                    <form ref={formRef} onSubmit={handleSubmit} className="max-w-md mx-auto">
                        <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="Student Name"
                            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            value={registrationNumber}
                            onChange={(e) => setRegistrationNumber(e.target.value)}
                            placeholder="Registration Number"
                            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            value={course}
                            onChange={(e) => setCourse(e.target.value)}
                            placeholder="Course"
                            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            value={units}
                            onChange={(e) => setUnits(e.target.value)}
                            placeholder="Units"
                            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="text"
                            value={marks}
                            onChange={(e) => setMarks(e.target.value)}
                            placeholder="Marks"
                            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <input
                            type="file"
                            onChange={(e) => setPdfFile(e.target.files[0])}
                            className="block w-full p-2 border border-gray-300 rounded-md mb-2"
                        />
                        <button type="submit" className="primary mt-4">Submit</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ResultsFormPage;
