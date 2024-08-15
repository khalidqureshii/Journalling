import React, { useState } from "react";
import InputEntry from "../components/InputEntry";
import useAuth from "../store/Auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

function Register() {
    const navigate = useNavigate();
    const currToken = localStorage.getItem("token");
    const {storeTokenInLS}  = useAuth();
    const [user,setUser] = useState({username: "", email: "", phone: "", password: "", confirmPassword: "", match: true});


    React.useEffect(() => {
        if (currToken) {
            navigate("/"); 
        }
    }, [currToken, navigate]);

    function updateUser(event) {
        const { name, value } = event.target;
        setUser(prevUser => { 
            const updatedUser = {
                ...prevUser,
                [name]: value,
            }
            updatedUser.match = (updatedUser.password == updatedUser.confirmPassword);
            return updatedUser;
        });
    }

    async function storeData() {
        if (!user.match) return;
        const response = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }); 

        if (response.ok) {
            toast("Successfully Registered");
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
        {currToken == null && (<>
        <h1>Welcome To Register Page</h1>
        <InputEntry changeFunction={updateUser} name="username" text="Username: " placeholder="Enter Your Name" value={user.username} /> 
        <InputEntry changeFunction={updateUser} name="email" text="Email: " placeholder="Enter Your Email" value={user.email} />
        <InputEntry changeFunction={updateUser} name="phone" text="Phone Number: " placeholder="Enter Your Phone Number" value={user.phone} />
        <InputEntry changeFunction={updateUser} name="password" text="Password: " placeholder="Enter Your Password" value={user.password} />
        <InputEntry changeFunction={updateUser} name="confirmPassword" text="Confirm Password: " placeholder="Re-Enter Your Password" value={user.confirmPassword} />
        <button type="submit" onClick={storeData}>Submit</button>
        {(!user.match) ? <h3>Passwords Do Not Match</h3> : null}

        <h2 className="text-2xl">Already have an Account?</h2>
        <button onClick={()=>navigate("/login")}>Register</button>
        </>)}
    </>
}   

export default Register;