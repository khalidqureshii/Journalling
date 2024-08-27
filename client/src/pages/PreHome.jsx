import { useState, useEffect } from "react";
import react from  "react";
import { useNavigate } from "react-router-dom";

function PreHome() {
    const [isLoggedIn, changeLogin] = useState(hasLoggedIn());
    const loginButton = <button className="mx-2" onClick={()=>navigate("/login")}>Login</button>;
    const registerButton = <button className="mx-2" onClick={()=>navigate("/register")}>Register</button>;
    const navigate = useNavigate();

    function hasLoggedIn() {
        const currToken = localStorage.getItem("token");
        if (currToken == null) return false;
        else return true;
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");
        }
    }, [isLoggedIn]);

    return <>
        <h1 className="mb-5">Welcome To MindFul Moments</h1>
        {loginButton}{registerButton}
    </>
}

export default PreHome;