import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user"); // Retrieve the user from localStorage
        if (storedUser) {
            setUser(JSON.parse(storedUser)); // Parse and set user from localStorage
            setReady(true);
        } else {
            axios.get("/profile").then(({ data }) => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data)); // Store the user in localStorage
                setReady(true);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}
