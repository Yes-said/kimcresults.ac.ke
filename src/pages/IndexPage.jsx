import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("/courses")
            .then(({ data }) => {
                setCourses(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading courses...</p>;
    }

    return (
        <>
            <div className="overflow-x-auto mt-8">
                <table className="min-w-full bg-white border border-gray-200 divide-y divide-gray-300">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 border">Name</th>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Department</th>
                            <th className="px-4 py-2 border">Year</th>
                            <th className="px-4 py-2 border">Units</th>
                            <th className="px-4 py-2 border">Phone</th>
                            <th className="px-4 py-2 border">Admission</th>
                            <th className="px-4 py-2 border">UnitsEnrolled</th>
                            <th className="px-4 py-2 border">Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length > 0 ? (
                            courses.map((course, index) => (
                                <tr key={course.id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                                    <td className="px-4 py-2 border">{course.name}</td>
                                    <td className="px-4 py-2 border">{course.title}</td>
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
                                <td className="px-4 py-2 border text-center" colSpan="10">No courses found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
