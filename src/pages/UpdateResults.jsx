import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateResults() {
    const { id } = useParams(); // Get the ID from the route parameter
    const [result, setResult] = useState({
        studentName: '',
        registrationNumber: '',
        course: '',
        units: '',
        marks: '',
        pdf: '' // This will hold the current PDF URL, or you can opt to allow file uploads
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [pdfFile, setPdfFile] = useState(null); // To handle new PDF file uploads
    const navigate = useNavigate();

    // Fetch the existing result data by ID
    useEffect(() => {
        axios.get(`http://localhost:4000/result/${id}`)
            .then(response => setResult(response.data))  // Populate form fields
            .catch(err => setError(err.response?.data || 'Error fetching result data'));
    }, [id]);  // Fetch result data when component mounts or id changes

    // Handle form input changes
    const handleChange = (e) => {
        setResult({ ...result, [e.target.name]: e.target.value });  // Update form values in state
    };

    // Handle file changes (for PDF upload)
    const handleFileChange = (e) => {
        setPdfFile(e.target.files[0]);  // Set the selected PDF file
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();  // Create FormData to handle file uploads

        // Append all fields to the form data
        formData.append("studentName", result.studentName);
        formData.append("registrationNumber", result.registrationNumber);
        formData.append("course", result.course);
        formData.append("units", result.units);
        formData.append("marks", result.marks);

        if (pdfFile) {
            formData.append("pdfFile", pdfFile);  // If a new PDF is uploaded, append it
        }

        axios.put(`http://localhost:4000/update-result/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',  // Set header for file upload
            },
        })
        .then(() => {
            setSuccessMessage('Result updated successfully');
            setTimeout(() => {
                navigate("/result");  // Redirect to results page after 2 seconds
            }, 2000);
        })
        .catch(err => setError(err.response?.data || 'Error updating result'));
    };

    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold my-4 text-center">Update Results</h3>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg">
                {/* Form fields with current values */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Student Name</label>
                    <input
                        type="text"
                        name="studentName"
                        value={result.studentName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Registration Number</label>
                    <input
                        type="text"
                        name="registrationNumber"
                        value={result.registrationNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Course</label>
                    <input
                        type="text"
                        name="course"
                        value={result.course}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Units</label>
                    <input
                        type="text"
                        name="units"
                        value={result.units}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Marks</label>
                    <input
                        type="number"
                        name="marks"
                        value={result.marks}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Upload PDF (optional)</label>
                    <input
                        type="file"
                        name="pdfFile"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    {result.pdf && (
                        <a href={`http://localhost:4000/${result.pdf}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline mt-2 block">
                            View existing PDF
                        </a>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                    Update Result
                </button>
            </form>
        </div>
    );
}
