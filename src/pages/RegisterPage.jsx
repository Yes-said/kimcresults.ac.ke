import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post("/register", {
                name,
                email,
                password,
            });
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 2000); // Hide the success message after 2 seconds
        } catch (e) {
            setShowErrorMessage(true);

            setTimeout(() => {
                setShowErrorMessage(false);
            }, 1500); // Hide the error message after 1.5 seconds
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <input 
                        type="name"
                        placeholder="Martin Luther" 
                        value={name}
                        onChange={ev => setName(ev.target.value)} 
                    />
                    <input 
                        type="email" 
                        placeholder="your@gmail.com" 
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} 
                    />
                    <button className="primary">Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text-black" to={"/login"}>Login</Link>
                    </div>
                </form>
                {showSuccessMessage && (
                    <div className="mt-8 p-3 bg-green-500 text-white text-center rounded-md success-message">
                        Registration successful! Now you can login.
                    </div>
                )}
                {showErrorMessage && (
                    <div className="mt-8 p-3 bg-red-500 text-white text-center rounded-md error-message">
                        Registration failed. Please try again later.
                    </div>
                )}
            </div>
        </div>
    );
}
