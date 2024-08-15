import React, { useState } from "react";
import InputEntry from "../components/InputEntry";
import {useAuth} from "../store/Auth"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Login() {
    const navigate = useNavigate();
    const currToken = localStorage.getItem("token");
    console.log(currToken)
    const [user,setUser] = useState({email: "", password: ""});
    const {storeTokenInLS} = useAuth();
    
    React.useEffect(() => {
        if (currToken) {
            navigate("/"); // Navigate if the token exists
        }
    }, [currToken, navigate]);

    function updateUser(event) {
        const { name, value } = event.target;
        setUser(prevUser => { 
            const updatedUser = {
                ...prevUser,
                [name]: value,
            }
            return updatedUser;
        });
    }
    
    async function storeData() {
        console.log(user);
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }); 
        
        if (response.ok) {
            toast("Successfully Logged in");
            const resp_data = await response.json();
            await storeTokenInLS(resp_data.token);
            navigate("/");
        }
        else {
            const res_data = await response.json();
            console.log(res_data.extraDetails);
            toast(res_data.extraDetails);
        }
    }

    return <>
        {(currToken == null) && (<>
        <h1>Welcome To Login Page</h1>
        <InputEntry changeFunction={updateUser} name="email" text="Email: " placeholder="Enter Your Email" />
        <InputEntry changeFunction={updateUser} name="password" text="Password: " placeholder="Enter Your Password" />
        <button type="submit" onClick={storeData}>Submit</button>
        </>)}
    </>
}   

export default Login;