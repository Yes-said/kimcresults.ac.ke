import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function LoginPage() {
    const [identity, setIdentity] = useState('');  // Changed 'email' to 'identity'
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default to student
    const [identityError, setIdentityError] = useState('');  // Changed 'emailError' to 'identityError'
    const [passwordError, setPasswordError] = useState('');
    const [roleError, setRoleError] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setUser } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);

    // New state to handle "Remember Me"
    const [rememberMe, setRememberMe] = useState(false);

    // Identity validation (based on alphanumeric characters for Student No/Employee No)
    const validateIdentity = (identity) => {
        return /^[A-Za-z0-9]+$/.test(identity);  // Example validation: alphanumeric only
    };

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        let hasError = false;

        // Reset all error states
        setIdentityError('');  // Reset identity error
        setPasswordError('');
        setRoleError('');
        setErrorMessage('');

        // Validation logic
        if (!validateIdentity(identity)) {
            setIdentityError('Invalid Student No/Employee No format.');
            hasError = true;
        }

        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long.');
            hasError = true;
        }

        if (hasError) return;

        try {
            const { data } = await axios.post("/login", { identity, password, role });  // Changed 'email' to 'identity'

            // Set user data in context
            setUser(data);

            // Save the token depending on the "Remember Me" selection
            if (rememberMe) {
                localStorage.setItem('token', data.token); // Store token in localStorage if "Remember Me" is checked
            } else {
                sessionStorage.setItem('token', data.token); // Store token in sessionStorage otherwise
            }

            setShowSuccessMessage(true);
            setTimeout(() => {
                setRedirect(true);
            }, 2000);
        } catch (e) {
            if (e.response) {
                switch (e.response.status) {
                    case 404:
                        setErrorMessage('Identity does not exist.');
                        break;
                    case 403:
                        setErrorMessage('Permission denied. Please login with the correct role.');
                        break;
                    case 401:
                        setErrorMessage('Incorrect password.');
                        break;
                    default:
                        setErrorMessage('Login failed. Please check your credentials.');
                }
            } else {
                setErrorMessage('Login failed. Please try again later.');
            }
        }
    }

    if (redirect) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-300">
            
            <h1 className="text-4xl mt-8 font-bold text-center text-blue-700 mb-6">Hi, Welcome back</h1>
            <p className="font-bold">Please fill in your details to login</p>
            <div className="bg-white p-6 shadow-lg rounded-lg w-80"> {/* Adjusted width */}
    <form className="space-y-4" onSubmit={handleLoginSubmit}> {/* Reduced spacing */}
        <div className="relative">
            <input 
                type="text"  
                placeholder="Student No/Employee No"  
                value={identity} 
                onChange={ev => setIdentity(ev.target.value)} 
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {identityError && <div className="text-red-500 text-sm mt-1">{identityError}</div>}   
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
                {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.43a10.046 10.046 0 0 1 0 7.14M3.98 8.43C5.568 5.82 8.5 3.75 12 3.75c3.5 0 6.432 2.07 8.02 4.68M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                )}
            </div>
            {passwordError && <div className="text-red-500 text-sm mt-1">{passwordError}</div>}
        </div>

        {/* Role selection */}
        <div className="relative">
            <div className="flex items-center justify-center space-x-2"> {/* Reduced space */}
                <label className="flex items-center">
                    <input 
                        type="radio" 
                        name="role" 
                        value="student" 
                        checked={role === "student"} 
                        onChange={ev => setRole(ev.target.value)} 
                        className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-1 text-gray-700">Student</span> {/* Reduced margin */}
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
                    <span className="ml-1 text-gray-700">Admin</span> {/* Reduced margin */}
                </label>
            </div>
            {roleError && <div className="text-red-500 text-sm mt-1">{roleError}</div>}
        </div>

        {/* Remember Me checkbox */}
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={rememberMe}
                onChange={(ev) => setRememberMe(ev.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block font-bold text-black text-sm">Remember Me</label> {/* Reduced text size */}
        </div>

        <button 
            type="submit" 
            className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-300" // Reduced padding
        >
            Login
        </button>

        <div className="text-center py-2 text-gray-500 text-sm"> {/* Reduced text size */}
            <Link to={"/forgot-password"} className="hover:underline">Forgot your password?</Link>
        </div>

        <div className="text-center py-2 font-bold text-black text-sm"> {/* Reduced text size */}
            Don't have an account yet?{" "}
            <Link to={"/register"} className="underline font-bold text-blue-600">
                Register now
            </Link>
        </div>
        
        {errorMessage && (
            <div className="text-center text-red-500 mt-2">{errorMessage}</div>
        )}
        {showSuccessMessage && (
            <div className="text-center text-green-500 mt-2">Login successful. Redirecting...</div>
        )}
    </form>
</div>

        </div>
    );
}
