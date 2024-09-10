import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import CoursesPage from "./CoursesPage";
import AccountNav from "../AccountNav";
import Result from "./Result";
import ResultsFormPage from "./ResultsFormPage";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    let { subpage } = useParams();
    if (!subpage) {
        subpage = "profile";
    }

    useEffect(() => {
        // Fetch user data to ensure it's available after a refresh
        if (!user) {
            axios.get("/profile").then(({ data }) => {
                setUser(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [user, setUser]);

    async function Logout() {
        await axios.post("/logout");
        setRedirect("/");
        setUser(null);
    }

    if (loading || !ready) {
        return "Loading...";
    }

    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            {ready && <AccountNav user={user} />} {/* Ensure AccountNav is rendered only when ready */}
            {subpage === "profile" && (
                <div className="text-center">
                    logged in as {user.name} ({user.email})<br />
                    <button onClick={Logout} className="bg-blue-500 text-white mt-2 rounded-2xl px-8 py-1">Logout</button>
                </div>
            )}
            {subpage === "courses" && user?.role === 'student' && (
                <CoursesPage />
            )}
            {subpage === "view" && user?.role === 'admin' && (
                <Result />
            )}
            {user?.role === 'admin' && subpage === "admin-controls" && (
                <ResultsFormPage />
            )}
        </div>
    );
}
