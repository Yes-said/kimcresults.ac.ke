import { useContext } from "react";
import { UserContext } from "./UserContextProvider";
import { Link, Navigate, useParams } from "react-router-dom";

export default function AccountPage() {
    const { ready, user } = useContext(UserContext);
    const { subPage } = useParams();

    // Redirect if data isn't ready or if user is not logged in
    if (!ready) {
        return "Loading...";
    }
    if (ready && !user) {
        return <Navigate to={"/login"} />;
    }

    // Default to "profile" if subPage is not provided
    const currentPage = subPage || "profile";

    // Function to apply classes based on active link
    function linkClasses(type) {
        let classes = "py-2 px-6";
        if (type === currentPage || (subPage === undefined && type === "profile")) {
            classes += " bg-blue-500 text-white rounded-full";
        } else {
            classes += " bg-gray-200 text-black rounded-full";
        }
        return classes;
    }

    return (
        <div>
            <nav className="w-full flex gap-2 justify-center mt-8">
                <Link className={linkClasses("profile")} to={"/account/profile"}>My Profile</Link>
                <Link className={linkClasses("course")} to={"/account/course"}>My Course</Link>
                <Link className={linkClasses("units")} to={"/account/units"}>My Units</Link>
            </nav>
            <div className="mt-8">
                {/* Placeholder for subpage content */}
                {currentPage === "profile" && <div>Profile Content</div>}
                {currentPage === "course" && <div>Course Content</div>}
                {currentPage === "units" && <div>Units Content</div>}
            </div>
        </div>
    );
}
