import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import News from "./News";

export default function IndexPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/courses")
            .then(({ data }) => {
                setCourses(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setError("Failed to fetch courses.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p className="text-center mt-8 text-lg">Loading courses...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <>
            {/* Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 mt-8 text-white text-center py-8 shadow-lg">
                <h2 className="text-2xl font-bold tracking-wider">Students Enrolled</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-8 px-4">
                <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200 text-left">
                            <th className="px-6 py-3 text-sm font-semibold border">Name</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Course Name</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Department</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Year</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Units</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Phone</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Admission</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Units Enrolled</th>
                            <th className="px-6 py-3 text-sm font-semibold border">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course._id} className={`hover:bg-blue-50 transition-colors ${courses.indexOf(course) % 2 === 0 ? "bg-gray-50" : ""}`}>
                                    <td className="px-6 py-3 border">{course.name}</td>
                                    <td className="px-6 py-3 border">{course.courseName}</td>
                                    <td className="px-6 py-3 border">{course.department}</td>
                                    <td className="px-6 py-3 border">{course.year}</td>
                                    <td className="px-6 py-3 border">{course.units}</td>
                                    <td className="px-6 py-3 border">{course.phone}</td>
                                    <td className="px-6 py-3 border">{course.admission}</td>
                                    <td className="px-6 py-3 border">{course.unitsEnrolled}</td>
                                    <td className="px-6 py-3 border">{course.gender}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-6 py-3 border text-center" colSpan="9">No courses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

           {/* Link to About Page */}
<div className="text-center my-8">
    <Link 
        to="/about" 
        className="relative inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200 transform hover:scale-105"
    >
        Learn More About Us
        <span className="ml-2 inline-block transition-transform duration-200 transform group-hover:translate-x-1">→</span>
    </Link>
</div>


            {/* News Section */}
            <div className="my-8 px-4">
                <News />
            </div>
        </>
    );
}
