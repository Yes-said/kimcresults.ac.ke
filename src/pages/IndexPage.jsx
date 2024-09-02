import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
    const [courses, setCourses] = useState([]);
    
    useEffect(() => {
        axios.get("/courses").then(response => {
           setCourses(response.data);
        });
    }, []);
    
    return(
        <div className="mt-8">
            {courses.length > 0 && courses.map(course => (
                <div key={course.id}> {/* Add a unique key here */}
                    {course.name}<br/>
                    {course.title}<br/>
                    {course.department}
                </div>
            ))}
        </div>
    );
}
