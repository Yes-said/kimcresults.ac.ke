import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default to student
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate function

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        // Example: at least 8 characters, one uppercase, one lowercase, one number
        const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        return re.test(password);
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

        if (hasError) {
            return;
        }

        try {
            await axios.post("/register", {
                name,
                email,
                password,
                role, // Send role with registration request
            });
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
                navigate('/login'); // Redirect to the login page after 2 seconds
            }, 2000);
        } catch (e) {
            setEmailError('Registration failed. Please try again later.');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <div className="mb-4">
                        <input 
                            type="text"
                            placeholder="Martin Luther" 
                            value={name}
                            onChange={ev => setName(ev.target.value)} 
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {nameError && (
                            <div className="text-red-500 text-sm mt-1">{nameError}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <input 
                            type="email" 
                            placeholder="your@gmail.com" 
                            value={email}
                            onChange={ev => setEmail(ev.target.value)} 
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {emailError && (
                            <div className="text-red-500 text-sm mt-1">{emailError}</div>
                        )}
                    </div>
                    <div className="mb-4">
                        <input 
                            type="password" 
                            placeholder="password" 
                            value={password}
                            onChange={ev => setPassword(ev.target.value)} 
                            className="block w-full p-2 border border-gray-300 rounded-md"
                        />
                        {passwordError && (
                            <div className="text-red-500 text-sm mt-1">{passwordError}</div>
                        )}
                        <select value={role} onChange={ev => setRole(ev.target.value)} className="block w-full p-2 border border-gray-300 rounded-md">
                <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-200">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={"/login"}>Login</Link>
                    </div>
                </form>
                {showSuccessMessage && (
                    <div className="mt-8 p-3 bg-green-500 text-white text-center rounded-md success-message">
                        Registration successful!
                    </div>
                )}
            </div>
        </div>
    );
}
