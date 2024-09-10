import axios from "axios";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleForgotPasswordSubmit(ev) {
        ev.preventDefault();

        try {
            const { data } = await axios.post("/forgot-password", { email });
            setMessage(data.message);
        } catch (e) {
            setMessage("Failed to send reset link. Please try again later.");
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Forgot Password</h1>
                <form className="max-w-md mx-auto" onSubmit={handleForgotPasswordSubmit}>
                    <input 
                        type="email" 
                        placeholder="your@gmail.com" 
                        value={email} 
                        onChange={ev => setEmail(ev.target.value)} 
                        required 
                    />
                    <button className="primary mt-4">Send Reset Link</button>
                </form>
                {message && (
                    <div className="mt-8 p-3 bg-blue-500 text-white text-center rounded-md">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
