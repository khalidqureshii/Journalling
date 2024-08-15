import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "../store/Auth";

function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, changeLogin] = useState(hasLoggedIn);

    const newEntryButton = <><button onClick={()=>navigate("/newEntry")}>New Entry</button><br /></>;
    const logoutButton = <><button onClick={()=>navigate("/logout")}>Logout</button><br /></>;
    const loginButton = <><button onClick={()=>navigate("/login")}>Login</button><br /></>;
    const registerButton = <><button onClick={()=>navigate("/register")}>Register</button><br /></>
    const viewEntriesButton = <><button onClick={()=>navigate("/viewEntries")}>View Entries</button><br /></>

    function hasLoggedIn() {
        const currToken = localStorage.getItem("token");
        if (currToken == null) return false;
        else return true;
    }
    const {user } = useAuth();
    const displayName = (isLoggedIn)?(`, ${user.username}`):(``);

    return <>
        <h1>Welcome To Home Page{displayName}</h1>
        {(isLoggedIn) ? (
        <>{newEntryButton}{viewEntriesButton}{logoutButton}</>):(<>{loginButton}{registerButton}</>) }    
    </>
}   

export default Home;