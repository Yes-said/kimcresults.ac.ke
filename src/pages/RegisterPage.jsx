import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [nameError, setNameError] = useState('');
    const [identityError, setIdentityError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false); // New state for toggling the popup

    const navigate = useNavigate();

    const validateIdentity = (identity) => /^[A-Za-z0-9]+$/.test(identity);

    const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);

    async function registerUser(ev) {
        ev.preventDefault();
        let hasError = false;

        setNameError('');
        setIdentityError('');
        setPasswordError('');
        setRoleError('');
        setErrorMessage('');

        if (name === '') {
            setNameError('Name is required.');
            hasError = true;
        }

        if (!validateIdentity(identity)) {
            setIdentityError('Invalid Student No/Employee No format.');
            hasError = true;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long and include an uppercase letter, lowercase letter, and a number.');
            hasError = true;
        }

        if (hasError) return;

        const payload = { name, identity, password, role };

        try {
            await axios.post("/register", payload);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate('/login');
            }, 2000);
        } catch (e) {
            setErrorMessage('Registration failed. Please try again later.');
        }
    }

    const togglePopup = () => {
        setShowPopup(!showPopup); // Toggle the popup visibility
    };

    const closePopup = () => {
        setShowPopup(false); // Close the popup
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            {/* Form Section */}
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">Account Registration</h1>
            <p className="font-bold">To sign up, kindly fill the form below</p>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg w-full md:max-w-xs md:ml-10">
                <form className="space-y-4" onSubmit={registerUser}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={ev => setName(ev.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {nameError && <div className="text-red-500 text-sm">{nameError}</div>}

                    <input 
                        type="text" 
                        placeholder="Student No/Employee No" 
                        value={identity} 
                        onChange={ev => setIdentity(ev.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {identityError && <div className="text-red-500 text-sm">{identityError}</div>}

                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    {passwordError && <div className="text-red-500 text-sm">{passwordError}</div>}

                    {/* Role Selection with Tooltip */}
                    <div className="flex items-center space-x-4">
                        <label className="flex font-bold items-center">
                            <input 
                                type="radio" 
                                name="role" 
                                value="student" 
                                checked={role === "student"} 
                                onChange={ev => setRole(ev.target.value)} 
                                className="form-radio h-4 w-4"
                            />
                            <span className="ml-1 text-gray-700">Student</span>
                        </label>

                        <label className="flex font-bold items-center">
                            <input 
                                type="radio" 
                                name="role" 
                                value="admin" 
                                checked={role === "admin"} 
                                onChange={ev => setRole(ev.target.value)} 
                                className="form-radio h-4 w-4"
                            />
                            <span className="ml-1 text-gray-700">Admin</span>
                        </label>

                        {/* SVG icon for toggling tooltip */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            strokeWidth={1.5} 
                            stroke="currentColor" 
                            className="h-6 w-6 cursor-pointer" 
                            onClick={togglePopup}
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" 
                            />
                        </svg>
                    </div>

                    {roleError && <div className="text-red-500 text-sm">{roleError}</div>}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-900 transition-colors"
                    >
                        Register
                    </button>

                    Already have an account? <Link className="font-bold hover:underline text-blue-600" to={"/login"}>Login</Link>

                    {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}
                    {showSuccessMessage && <div className="text-green-500 text-sm mt-1">Registration successful! Redirecting to login...</div>}
                </form>
            </div>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Role Selection</h2>
                        <p className="font-bold">please enter your name, admission number and 
                            <p className="font-bold">Select your role: "Student" for students and "Admin"</p>
                             for administrative staff to signUp.</p>
                        <button 
                            onClick={closePopup} 
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
