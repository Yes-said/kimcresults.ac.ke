import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContextProvider";

export default function LoginPage() {
    const [identity, setIdentity] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();

    const { setUser } = useContext(UserContext);   

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post("/login", 
                { identity, password, role }, 
                { withCredentials: true }
            );
            const data = response.data;
    
            if (data.success) {
                setUser(data.user);  // This now includes the role
                alert("Login Successful.");
                if (data.user.role === 'admin') {
                    navigate("/dashboard");
                } else {
                    navigate("/account"); // Changed from "/" to "/profile" for students
                }
            } else {
                alert("Invalid credentials.");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            alert("Login failed.");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            <h1 className="text-4xl mt-8 font-bold text-center text-blue-700 mb-6">Hi, Welcome back</h1>
            <p className="font-bold">Please fill in your details to login</p>

            <div className="bg-white p-6 shadow-lg rounded-lg w-80">
                <form className="space-y-4" onSubmit={handleLoginSubmit}>
                    <input
                        type="text"
                        placeholder="Student No/Employee No"
                        value={identity}
                        onChange={(ev) => setIdentity(ev.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(ev) => setPassword(ev.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />

                    <div className="flex items-center justify-center space-x-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="student"
                                checked={role === "student"}
                                onChange={(ev) => setRole(ev.target.value)}
                                className="form-radio h-4 w-4"
                            />
                            <span className="ml-1 text-gray-700">Student</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={role === "admin"}
                                onChange={(ev) => setRole(ev.target.value)}
                                className="form-radio h-4 w-4"
                            />
                            <span className="ml-1 text-gray-700">Admin</span>
                        </label>
                    </div>

                    <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                        Login
                    </button>
                </form>
            </div>

            <div className="flex items-center justify-center mt-4 text-sm">
                Don't have an account? <Link to="/register" className="ml-1 text-blue-500 font-semibold hover:underline">Register</Link>
            </div>
        </div>
    );
}