import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaLock, FaUser, FaUserGraduate } from "react-icons/fa";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default to student
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(''); // General error message
    const navigate = useNavigate();

    // Email validation function
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Password validation function
    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password); // Must contain at least 8 characters, one uppercase, one lowercase, and one number
    };

    async function registerUser(ev) {
        ev.preventDefault();
        let hasError = false;

        if (name === '') {
            setNameError('Name is required.');
            hasError = true;
        } else {
            setNameError('');
        }

        if (!validateEmail(email)) {
            setEmailError('Invalid email format.');
            hasError = true;
        } else {
            setEmailError('');
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.');
            hasError = true;
        } else {
            setPasswordError('');
        }

        if (hasError) return;

        try {
            await axios.post("/register", { name, email, password, role });
            setShowSuccessMessage(true);
            setErrorMessage(''); // Clear any previous error messages

            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate('/login'); // Redirect to login after 2 seconds
            }, 2000);
        } catch (e) {
            setErrorMessage('Registration failed. Please try again later.');
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h1>
                <form className="space-y-6" onSubmit={registerUser}>
                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="     Your full name" 
                            value={name} 
                            onChange={ev => setName(ev.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        {nameError && <div className="text-red-500 text-sm mt-1">{nameError}</div>}
                    </div>

                    <div className="relative">
                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="email" 
                            placeholder="     your@gmail.com" 
                            value={email} 
                            onChange={ev => setEmail(ev.target.value)} 
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            required
                        />
                        {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
                    </div>

                    <div className="relative">
                        <FaLock className="absolute left-3 top-3 text-gray-400" />
                        <input 
                            type="password" 
                            placeholder="     Password" 
                            value={password} 
                            onChange={ev => setPassword(ev.target.value)} 
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            minLength={8}
                            required
                        />
                        {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
                    </div>

                    <div className="relative">
                        <FaUserGraduate className="absolute left-3 top-3 text-gray-400" />
                        <select 
                            value={role} 
                            onChange={ev => setRole(ev.target.value)} 
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="student">Student</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button 
                        className="w-full bg-blue-500 hover:bg-purple-700 text-white font-bold py-3 rounded-md transition duration-300 ease-in-out"
                    >
                        Register
                    </button>

                    <div className="text-center py-2 text-gray-500">
                        Already have an account? <Link className="underline text-purple-600" to={"/login"}>Login</Link>
                    </div>
                </form>

                {showSuccessMessage && (
                    <div className="mt-8 p-3 bg-green-500 text-white text-center rounded-md success-message">
                        Registration successful!
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
