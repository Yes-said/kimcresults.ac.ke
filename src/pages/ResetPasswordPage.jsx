import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ResetPasswordPage() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleResetPasswordSubmit(ev) {
        ev.preventDefault();

        try {
            const { data } = await axios.post(`/reset-password/${token}`, { password });
            setMessage(data.message);
        } catch (e) {
            setMessage("Failed to reset password. Please try again later.");
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Reset Password</h1>
                <form className="max-w-md mx-auto" onSubmit={handleResetPasswordSubmit}>
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} 
                        required 
                    />
                    <button className="primary mt-4">Reset Password</button>
                </form>
                {message && (
                    <div className="mt-8 p-3 bg-green-500 text-white text-center rounded-md">
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}
