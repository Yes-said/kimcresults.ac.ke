import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState('student');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    };

    async function registerUser(ev) {
        ev.preventDefault();
        let hasError = false;
    
        // Reset errors
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setRoleError('');
        setErrorMessage('');
    
        // Validate inputs
        if (name === '') {
            setNameError('Name is required.');
            hasError = true;
        }
    
        if (!validateEmail(email)) {
            setEmailError('Invalid email format.');
            hasError = true;
        }
    
        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.');
            hasError = true;
        }
    
        if (hasError) return;
    
        // Create payload
        const payload = { name, email, password, role };
    
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-300">
            <div className="bg-white p-8 shadow-lg rounded-lg w-96">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Register</h1>
                <form className="space-y-6" onSubmit={registerUser}>
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Your full name" 
                            value={name} 
                            onChange={ev => setName(ev.target.value)}
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {nameError && <div className="text-red-500 text-sm mt-1">{nameError}</div>}
                    </div>

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
                            type={showPassword ? "text" : "password"} 
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
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
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
                    </div>

                    {roleError && <div className="text-red-500 text-sm mt-1">{roleError}</div>}

                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors duration-300"
                    >
                        Register
                    </button>

                    {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}
                    {showSuccessMessage && <div className="text-green-500 text-sm mt-1">Registration successful! Redirecting to login...</div>}
                </form>

                <div className="mt-4 text-center">
                    <Link to="/login" className="text-blue-600 hover:underline">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    );
}
