import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function MyResults() {
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/result")
            .then(response => setResult(response.data))
            .catch(err => setError(err.response?.data || "An error occurred while fetching results."));
    }, []);

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <AccountNav />
            <h3 className="text-2xl font-semibold my-4 text-center">My Results</h3>
            {result.length > 0 ? (
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white mt-8 mb-8 border border-gray-200 divide-y divide-gray-300 shadow-lg rounded-lg">
                        <thead className="bg-gray-700 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Student Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Year</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Registration Number</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Units & Marks</th>
                                <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">PDF</th>
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
