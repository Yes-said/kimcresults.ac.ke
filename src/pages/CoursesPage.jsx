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
        <div>
            <AccountNav />
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-blue-500 text-white py-2 px-6 rounded-full" to={"/account/courses/new"}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new course
                </Link>
            </div>
            <div className="mt-4">
                {error && <p className="text-red-500">{error}</p>}
                {courses.length > 0 && courses.map(course => (
                    <Link
                        key={course._id}
                        to={"/account/courses/" + course._id}
                        className="bg-gray-200 cursor-pointer p-4 rounded-2xl"
                    >
                        <div>
                            <h1>{course.name}</h1>
                            <h2 className="text-xl">{course.courseName}</h2>
                            <p>{course.department}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
