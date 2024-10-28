import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                // Make sure to send credentials to include cookies
                const { data } = await axios.get("/profile", { withCredentials: true });
                if (data.success) {
                    setUser(data.user);  // Set user in context if profile fetch is successful
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }

        fetchProfile(); // Fetch user profile on component mount
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}
