import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CoursesPage() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("/user-courses")
            .then(({ data }) => {
                setCourses(data);
            })
            .catch((err) => {
                console.error("Error fetching courses:", err);
                setError("Failed to load courses. Please try again later.");
            });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <AccountNav />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center mb-8">
                    <Link className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition duration-300" to={"/account/courses/new"}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Course
                    </Link>
                </div>
                <div className="mt-4">
                    {error && <p className="text-center text-red-500 mb-4">{error}</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.length > 0 && courses.map(course => (
                            <Link
                                key={course._id}
                                to={"/account/courses/" + course._id}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
                            >
                                <div>
                                    <h1 className="text-lg font-bold mb-2">{course.name}</h1>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-1">{course.courseName}</h2>
                                    <p className="text-gray-600">{course.department}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
