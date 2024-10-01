import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { FaLock, } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student"); // Default to student
    const [redirect, setRedirect] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const { setUser } = useContext(UserContext);

    // Function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to handle email validation on blur
    function handleEmailBlur() {
        if (!email) {
            setErrorMessage("Email is required.");
        } else if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
        } else {
            setErrorMessage(""); // Clear error message if valid
        }
    }

    // Function to handle password validation on blur
    function handlePasswordBlur() {
        if (!password) {
            setErrorMessage("Password is required.");
        } else if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
        } else {
            setErrorMessage(""); // Clear error message if valid
        }
    }

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
    
        try {
            const { data } = await axios.post("/login", { email, password, role });
            setUser(data);
            setShowSuccessMessage(true);
            setErrorMessage(""); // Clear any existing error messages
    
            setTimeout(() => {
                setRedirect(true);
            }, 2000); // Wait for 2 seconds before redirecting
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setErrorMessage("Email does not exist.");
            } else if (e.response && e.response.status === 403) {
                setErrorMessage("Permission denied. Please login with the correct role.");
            } else if (e.response && e.response.status === 401) {
                setErrorMessage("Incorrect password. Please try again later.");
            } else {
                setErrorMessage("Login failed. Please check your email, password, and role.");
            }
        }
    }
    
    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <form className="space-y-6" onSubmit={handleLoginSubmit}>
                    <div className="relative">
                        <MdEmail  className="absolute left-3 top-5 text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="     your@gmail.com" 
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)} 
                            onBlur={handleEmailBlur}
                            className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FaLock className="absolute left-3 top-4 text-gray-400" />
                        <input 
                            type="password" 
                            placeholder="     password" 
                            value={password} 
                            onChange={ev => setPassword(ev.target.value)} 
                            onBlur={handlePasswordBlur}
                            className="w-full p-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            minLength={6}
                            required
                        />
                    </div>
                    <div className="relative">
                        <div className="relative">
    <div className="flex items-center justify-center space-x-4">
        <label className="flex items-center">
            <input 
                type="radio" 
                name="role" 
                value="student" 
                checked={role === "student"} 
                onChange={ev => setRole(ev.target.value)} 
                className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="ml-2 text-gray-700">Student</span>
        </label>
        <label className="flex items-center">
            <input 
                type="radio" 
                name="role" 
                value="admin" 
                checked={role === "admin"} 
                onChange={ev => setRole(ev.target.value)} 
                className="form-radio h-4 w-4 text-blue-500"
            />
            <span className="ml-2 text-gray-700">Admin</span>
        </label>
    </div>
</div>

                    </div>
                    <button 
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-md transition duration-300 ease-in-out mt-6"
                        >
                        Login
                    </button>
                    <div className="text-center py-2 text-gray-500">
                        <Link to={"/forgot-password"} className="underline text-black">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text-black" to={"/register"}>Register now</Link>
                    </div>
                </form>
                {showSuccessMessage && (
                    <div className="mt-8 p-3 bg-green-500 text-white text-center rounded-md success-message">
                        Login successful!
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-8 p-3 bg-red-500 text-white text-center rounded-md error-message">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
