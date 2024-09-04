import axios from "axios";
import { useEffect, useState } from "react";

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
        return <p>Loading courses...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            {/* Banner */}
            <div className="bg-blue-500 mt-8 text-white text-center py-4">
                <h2 className="text-lg font-semibold">Students Enrolled</h2>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-300">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">CourseName</th>
                            <th className="px-4 py-2 border">Department</th>
                            <th className="px-4 py-2 border">Year</th>
                            <th className="px-4 py-2 border">Units</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Admission</th>
                            <th className="px-4 py-2 border">Units Enrolled</th>
                            <th className="px-4 py-2 border">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length > 0 ? (
                            courses.map((course) => (
                                <tr key={course._id} className={courses.indexOf(course) % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="px-4 py-2 border">{course.name}</td>
                                    <td className="px-4 py-2 border">{course.courseName}</td>
                                    <td className="px-4 py-2 border">{course.department}</td>
                                    <td className="px-4 py-2 border">{course.year}</td>
                                    <td className="px-4 py-2 border">{course.units}</td>
                                    <td className="px-4 py-2 border">{course.phone}</td>
                                    <td className="px-4 py-2 border">{course.admission}</td>
                                    <td className="px-4 py-2 border">{course.unitsEnrolled}</td>
                                    <td className="px-4 py-2 border">{course.gender}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="px-4 py-2 border text-center" colSpan="9">No courses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
