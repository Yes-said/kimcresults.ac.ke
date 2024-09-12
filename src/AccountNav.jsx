import { Link, useLocation } from "react-router-dom";

export default function AccountNav({ user }) {
    const { pathname } = useLocation();
    let subpage = pathname.split("/")?.[2];
    if (!subpage) {
        subpage = "profile";
    }

    function linkClasses(type = null) {
        let classes = "inline-flex gap-1 py-2 px-6 rounded-full";
        if (type === subpage) {
            classes += " bg-blue-500 text-white";
        } else {
            classes += " bg-gray-200";
        }
        return classes;
    }

    return (
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses("profile")} to={"/account"}>
                My profile
            </Link>
            {user?.role === 'student' && (
                <>
                    <Link className={linkClasses("courses")} to={"/account/courses"}>
                        My courses
                    </Link>
                    <Link className={linkClasses("results")} to={"/account/results"}>
                        My results
                    </Link>
                </>
            )}
            {user?.role === 'admin' && (
                <>
                    <Link className={linkClasses("admin-controls")} to={"/account/admin-controls"}>
                        Add results
                    </Link>
                    <Link className={linkClasses("view")} to={"/account/view"}>
                        View results
                    </Link>
                    <Link className={linkClasses("post")} to={"/account/post"}>
                        Post news
                    </Link>
                </>
            )}
        </nav>
    );
}
