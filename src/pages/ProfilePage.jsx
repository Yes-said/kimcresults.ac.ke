import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    let { subpage } = useParams();
    if (!subpage) {
        subpage = "profile";
    }

    useEffect(() => {
        if (!user) {
            axios.get("/profile").then(({ data }) => {
                setUser(data);
                setLoading(false);
            });
        } else {
            setLoading(false);
            setFormData({
                name: user.name || "",
                email: user.email || "",
                password: "",
            });
        }
    }, [user, setUser]);

    async function Logout() {
        await axios.post("/logout");
        setRedirect("/");
        setUser(null);
    }

    const handleDelete = async () => {
        try {
            await axios.delete("/delete-profile");
            setRedirect("/"); // Redirect to homepage or login page
        } catch (error) {
            console.error("Failed to delete profile", error);
            alert("Failed to delete profile.");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("/update-profile", formData);
            setUser(response.data);
            alert("Profile updated successfully.");
        } catch (error) {
            console.error("Failed to update profile", error);
        }
    };

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
        <div className="min-h-screen bg-gray-300 p-6">
            {user && <AccountNav user={user} />}
            {subpage === "profile" && (
                <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Update Profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password (leave blank if unchanged):</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="block w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="flex justify-between">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Update Profile
                            </button>
                            <button
        type="button"
        onClick={handleDelete}
        className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
    >
        Delete Profile
    </button>
                            
                            <button
                                type="button"
                                onClick={Logout}
                                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            >
                                Logout
                            </button>
                        </div>
                    </form>
                </div>
            )}
            {/* Other content based on subpage */}
        </div>
    );
}
