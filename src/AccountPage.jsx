import { useContext, useState } from "react";
import { UserContext } from "./UserContextProvider";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        identity: '',
    });
    const { ready, user, setUser } = useContext(UserContext);
    const { subpage } = useParams();

    // Initialize form data when user data is available
    useState(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                identity: user.identity || '',
            });
        }
    }, [user]);

    if (!ready) {
        return <div className="text-center mt-8">Loading...</div>;
    }

    async function logout() {
        await axios.post("/logout");
        setRedirect("/");
        setUser(null);
    }

    async function handleProfileUpdate(ev) {
        ev.preventDefault();
        try {
            setError(null);
            const response = await axios.put('/profile', formData);
            if (response.data.success) {
                setUser(response.data.user);
                setIsEditing(false);
            } else {
                setError(response.data.message);
            }
        } catch (e) {
            setError(e.response?.data?.message || 'Failed to update profile');
        }
    }

    async function handleProfileDelete() {
        try {
            const response = await axios.delete('/profile');
            if (response.data.success) {
                await logout();
            } else {
                setError(response.data.message);
            }
        } catch (e) {
            setError(e.response?.data?.message || 'Failed to delete profile');
        }
    }

    if (ready && !user && !redirect) {
        return <Navigate to={"/login"} />;
    }

    const currentPage = subpage || "profile";

    const linkClasses = (type) => {
        const baseClasses = "py-2 px-6 rounded-full transition-all duration-300";
        return `${baseClasses} ${
            type === currentPage 
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
        }`;
    };

    const tabs = [
        { name: "profile", label: "My Profile" },
        { name: "course", label: "My Course" },
        { name: "units", label: "My Units" },
    ];

    const renderContent = () => {
        switch (currentPage) {
            case "profile":
                return (
                    <div className="p-8 flex flex-col items-center space-y-6">
                        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-500 text-2xl font-semibold">
                                {user.name.charAt(0)}
                            </span>
                        </div>

                        {error && (
                            <div className="text-red-500 text-center">
                                {error}
                            </div>
                        )}
                        
                        {isDeleting ? (
                            // Delete Confirmation Dialog
                            <div className="text-center space-y-4">
                                <h3 className="text-xl font-semibold text-red-600">
                                    Are you sure you want to delete your profile?
                                </h3>
                                <p className="text-gray-600">
                                    This action cannot be undone.
                                </p>
                                <div className="flex gap-4 justify-center mt-4">
                                    <button
                                        onClick={() => setIsDeleting(false)}
                                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleProfileDelete}
                                        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Delete Profile
                                    </button>
                                </div>
                            </div>
                        ) : isEditing ? (
                            // Edit Profile Form
                            <form onSubmit={handleProfileUpdate} className="w-full max-w-md space-y-4">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={e => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2">
                                            Identity
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.identity}
                                            onChange={e => setFormData({...formData, identity: e.target.value})}
                                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-4 justify-center mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        ) : (
                            // Profile View
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-semibold text-gray-800">
                                    {user.name}
                                </h2>
                                <p className="text-gray-600">
                                    {user.identity}
                                </p>
                                <div className="flex gap-4 justify-center mt-6">
                                    <button 
                                        onClick={() => setIsEditing(true)}
                                        className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors duration-300"
                                    >
                                        Edit Profile
                                    </button>
                                    <button 
                                        onClick={logout}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300"
                                    >
                                        Logout
                                    </button>
                                    <button 
                                        onClick={() => setIsDeleting(true)}
                                        className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors duration-300"
                                    >
                                        Delete Profile
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                );
            case "course":
                return <div className="p-4">Course Content</div>;
            case "units":
                return <div className="p-4">Units Content</div>;
            default:
                return null;
        }
    };

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="max-w-3xl mx-auto px-4">
            <nav className="w-full flex gap-4 justify-center mt-8">
                {tabs.map(tab => (
                    <Link
                        key={tab.name}
                        className={linkClasses(tab.name)}
                        to={`/account/${tab.name}`}
                    >
                        {tab.label}
                    </Link>
                ))}
            </nav>
            <div className="mt-8 bg-white rounded-lg shadow-sm min-h-[200px]">
                {renderContent()}
            </div>
        </div>
    );
}