import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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

    async function handleloginSubmit(ev) {
        ev.preventDefault();

        try {
            const { data } = await axios.post("/login", { email, password });
            setUser(data);
            setShowSuccessMessage(true);
            setErrorMessage(""); // Clear any existing error messages

            setTimeout(() => {
                setRedirect(true);
            }, 2000); // Wait for 2 seconds before redirecting
        } catch (e) {
            if (e.response && e.response.status === 401) { // Assuming 401 is the status code for incorrect password
                setErrorMessage("Incorrect password. Please try again later.");
            } else {
                setErrorMessage("Login failed. Please check your email and password.");
            }
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleloginSubmit}>
                    <input 
                        type="email" 
                        placeholder="your@gmail.com" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} 
                        onBlur={handleEmailBlur}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} 
                        onBlur={handlePasswordBlur}
                        minLength={6}
                        required
                    />
                    <button className="primary">Login</button>
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
