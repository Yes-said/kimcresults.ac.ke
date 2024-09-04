import { useContext, useState } from "react";
import { UserContext } from "../UserContext.jsx";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import CoursesPage from "./CoursesPage.jsx";
import AccountNav from "../AccountNav.jsx";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const {ready,user, setUser} = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined ) {
        subpage = "profile";
    }

async function Logout() {
   await axios.post("/logout");
setRedirect("/");
setUser(null);
}

if(!ready) {
    return "Loading...";
}


if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />
}

if (redirect) {
    return <Navigate to={redirect} />
}

    return(
 <div>
<AccountNav />
{subpage === "profile" && (
    <div className="text-center ">
        logged in as {user.name} ({user.email})<br />
        <button onClick={Logout} className="bg-blue-500 text-white mt-2 rounded-2xl px-8 py-1">Logout</button>
    </div>
)}

{subpage === "courses" && (
    <CoursesPage />
)}

        </div>
    );
}


