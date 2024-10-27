import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();

    async function registerUser(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post("/register", {
                name,
                identity,
                password,
                role
            });
            console.log("User registered successfully:", response.data);
            alert("Registration successful. Now login");
            navigate("/login"); // Redirect to login page after successful registration
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            alert("Registration failed.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <h1 className="text-4xl font-bold text-center text-blue-700 mb-4">Account Registration</h1>
            <p className="font-bold">To sign up, kindly fill the form below</p>
            <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg w-80 md:h-auto md:max-h-screen md:min-w-[20rem]">
                <form className="space-y-4" onSubmit={registerUser}>
                    <input 
                        type="text" 
                        placeholder="Full Name" 
                        value={name} 
                        onChange={ev => setName(ev.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input 
                        type="text" 
                        placeholder="Student No/Employee No" 
                        value={identity} 
                        onChange={ev => setIdentity(ev.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={ev => setPassword(ev.target.value)} 
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
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
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-900 transition-colors"
                    >
                        Register
                    </button>
                    Already have an account? <Link className="font-bold hover:underline text-blue-600" to={"/login"}>Login</Link>
                </form>
            </div>
        </div>
    );
}
