import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default to student
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        let hasError = false;

        // Reset all error states
        setEmailError('');
        setPasswordError('');
        setRoleError('');
        setErrorMessage('');

        // Validation logic
        if (!validateEmail(email)) {
            setEmailError('Invalid email format.');
            hasError = true;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            hasError = true;
        }

        if (hasError) return;

        try {
            const { data } = await axios.post("/login", { email, password, role });
            setUser(data);
            setShowSuccessMessage(true);
            
            setTimeout(() => {
                setRedirect(true);
            }, 2000);
        } catch (e) {
            if (e.response) {
                switch (e.response.status) {
                    case 404:
                        setErrorMessage('Email does not exist.');
                        break;
                    case 403:
                        setErrorMessage('Permission denied. Please login with the correct role.');
                        break;
                    case 401:
                        setErrorMessage('Incorrect password.');
                        break;
                    default:
                        setErrorMessage('Login failed. Please check your credentials.');
                }
            } else {
                setErrorMessage('Login failed. Please try again later.');
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
                        <input 
                            type="email" 
                            placeholder="your@email.com" 
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)} 
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
                    </div>

                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} // Toggle password visibility
                            placeholder="Password" 
                            value={password} 
                            onChange={ev => setPassword(ev.target.value)} 
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            className="absolute cursor-pointer inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-blue-500 transition-colors duration-300"
                        >
                            {/* Eye icon for toggling password visibility */}
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.43a10.046 10.046 0 0 1 0 7.14M3.98 8.43C5.568 5.82 8.5 3.75 12 3.75c3.5 0 6.432 2.07 8.02 4.68M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            )}
                        </div>
                        {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
                    </div>

                    <div className="relative">
                        <div className="flex items-center justify-center space-x-4">
                            <label className="flex items-center">
                                <input 
                                    type="radio" 
                                    name="role" 
                                    value="student" 
                                    checked={role === "student"} 
                                    onChange={ev => setRole(ev.target.value)} 
                                    className="form-radio h-4 w-4 text-blue-600"
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
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="ml-2 text-gray-700">Admin</span>
                            </label>
                        </div>
                        {roleError && <div className="text-red-500 text-sm mt-1">{roleError}</div>}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
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
                    <div className="mt-4 p-3 bg-green-500 text-white text-center rounded-md">
                        Login successful!
                    </div>
                )}

                {errorMessage && (
                    <div className="mt-4 p-3 bg-red-500 text-white text-center rounded-md">
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
}
