import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";
import { useNavigate } from "react-router-dom"; // For navigation after updating

export default function Result() {
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Navigation hook

    useEffect(() => {
        axios.get("http://localhost:4000/result")
            .then(response => setResult(response.data))
            .catch(err => setError(err.response?.data || "An error occurred while fetching results."));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this result?")) {
            axios.delete(`http://localhost:4000/delete-result/${id}`)
                .then(() => {
                    setResult(result.filter(res => res._id !== id)); // Update state after deletion
                })
                .catch(err => setError(err.response?.data || "Failed to delete result."));
        }
    };

    const handleUpdate = (id) => {
        // Navigate to the update form page where the user can edit the result
        navigate(`/update-result/${id}`);
    };

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <AccountNav />
            <h3 className="text-2xl font-semibold my-4 text-center">Results</h3>
            {result.length > 0 ? (
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white mt-8 mb-8 border border-gray-200 divide-y divide-gray-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Registration Number</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Year</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Units & Marks</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">PDF</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {result.map((result, index) => (
                                <tr key={result._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                    <td className="px-6 py-4 text-left border whitespace-nowrap">{result.student.name}</td>
                                    <td className="px-6 py-4 text-left border whitespace-nowrap">{result.student.admission}</td>
                                    <td className="px-6 py-4 text-left border whitespace-nowrap">{result.course.courseName}</td>
                                    <td className="px-6 py-4 text-left border whitespace-nowrap">{result.course.department}</td>
                                    <td className="px-6 py-4 text-left border whitespace-nowrap">{result.course.year}</td>
                                    <td className="px-6 py-4 text-left border whitespace-nowrap">
                                        {result.units.map((unit, i) => (
                                            <div key={i} className="mb-2">
                                                <strong>{unit.unit}:</strong> {unit.marks}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <a 
                                            href={`http://localhost:4000/${result.pdf}`} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                                        >
                                            Download PDF
                                        </a>
                                    </td>
                                    <td className="px-6 py-4 text-center border">
                                        <button
                                            onClick={() => handleUpdate(result._id)}
                                            className="inline-block px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition duration-300 mx-1"
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(result._id)}
                                            className="inline-block px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 mx-1"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-8 text-gray-600 text-lg">No results found</div>
            )}
        </div>
    );
}
