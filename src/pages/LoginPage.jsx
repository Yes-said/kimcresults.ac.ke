import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false); // State for the error message
    const { setUser } = useContext(UserContext);

    async function handleloginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post("/login", { email, password });
            setUser(data);
            setShowSuccessMessage(true);

            setTimeout(() => {
                setRedirect(true);
            }, 2000); // Wait for 2 seconds before redirecting
        } catch (e) {
            setShowErrorMessage(true);

            setTimeout(() => {
                setShowErrorMessage(false);
            }, 1500); // Hide the error message after 1.5 seconds
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
                    />
                    <input 
                        type="password" 
                        placeholder="password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} 
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
                {showErrorMessage && (
                    <div className="mt-8 p-3 bg-red-500 text-white text-center rounded-md error-message">
                        Login failed. Please try again.
                    </div>
                )}
            </div>
        </div>
    );
}
