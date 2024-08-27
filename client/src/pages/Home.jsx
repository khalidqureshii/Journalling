import React, { useState } from "react";
import {Navigate, useNavigate} from "react-router-dom";
import { useAuth } from "../store/Auth";

function Home() {
    const navigate = useNavigate();
    const [isLoggedIn, changeLogin] = useState(hasLoggedIn);

    const newEntryButton = <button className="mb-2 mx-2 w-40" onClick={()=>navigate("/newEntry")}>New Entry</button>;
    const logoutButton = <><br /><button className="mb-2  mt-3 w-32" onClick={()=>navigate("/logout")}>Logout</button><br /></>;
    const loginButton = <button className="mb-2 mx-2" onClick={()=>navigate("/login")}>Login</button>;
    const registerButton = <button className="mb-2 mx-2" onClick={()=>navigate("/register")}>Register</button>;
    const viewEntriesButton = <button className="mb-2 mx-2 w-40" onClick={()=>navigate("/viewEntries")}>View Entries</button>;

    function hasLoggedIn() {
        const currToken = localStorage.getItem("token");
        if (currToken == null) return false;
        else return true;
    }
    const {user } = useAuth();
    const displayName = (isLoggedIn)?(`, ${user.username}`):(``);

    return <>
        <h1 className="mb-5">Welcome To Home Page{displayName}</h1>
        {(isLoggedIn) ? (
        <>{newEntryButton}{viewEntriesButton}</>):(<>{loginButton}{registerButton}</>) }    
    </>
}   

export default Home;