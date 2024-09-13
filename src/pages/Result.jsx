import { useEffect, useState } from "react";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function Result() {
    const [result, setResult] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:4000/result")
            .then(response => setResult(response.data))
            .catch(err => setError(err.response.data));
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <AccountNav />
            <h3 className="text-2xl font-semibold my-4">Results</h3>
            {result.length > 0 ? (
                <div className="overflow-x-auto mt-4">
                    <table className="min-w-full bg-white mt-8 mb-8 border border-gray-200 divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-2 border">Student Name</th>
                                <th className="px-4 py-2 border">Registration Number</th>
                                <th className="px-4 py-2 border">Course</th>
                                <th className="px-4 py-2 border">Units</th>
                                <th className="px-4 py-2 border">Marks</th>
                                <th className="px-4 py-2 border">PDF</th> {/* New column for PDF link */}
                            </tr>
                        </thead>
                        <tbody>
                            {result.map(result => (
                                <tr key={result._id} className={result.index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="px-4 py-2 border">{result.studentName}</td>
                                    <td className="px-4 py-2 border">{result.registrationNumber}</td>
                                    <td className="px-4 py-2 border">{result.course}</td>
                                    <td className="px-4 py-2 border">{result.units}</td>
                                    <td className="px-4 py-2 border">{result.marks}</td>
                                    <td className="px-4 py-2 border">
                                        <a href={`http://localhost:4000/${result.pdf}`} target="_blank" rel="noopener noreferrer">
                                            Download PDF
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="text-center py-4">No results found</div>
            )}
        </div>
    );
}