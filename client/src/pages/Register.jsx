import React, { useState } from "react";
import InputEntry from "../components/InputEntry";
import useAuth from "../store/Auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import LINK from "../store/Link";
import HashLoader from "react-spinners/HashLoader";

function Register() {
    const navigate = useNavigate();
    const currToken = localStorage.getItem("token");
    const {storeTokenInLS}  = useAuth();
    const [user,setUser] = useState({username: "", email: "", phone: "", password: "", confirmPassword: "", match: true});
    const [isLoading, setLoading] = useState(false);

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
        setLoading(true);
        const response = await fetch(LINK + "api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        }); 
        setLoading(false);
        if (response.ok) {
            toast("Successfully Registered");
            const resp_data = await response.json();
            await storeTokenInLS(resp_data.token);
            navigate("/");
        }
        else {
            const res_data = await response.json();
            console.log(res_data.extraDetails);
            toast("User Already Exists !");
        }
    }

    const serverMessage = "The Server Can Take Upto 90 Seconds Due To Inactivity";

    return <> {isLoading ? <div className="flex flex-col items-center"><HashLoader color="#ffffff" /><h2 className="text-2xl mb-2 mt-8">{serverMessage}</h2></div> : <>
        {currToken == null && (<>
        <h1 className="mb-6">Welcome To Register Page</h1>
        <InputEntry changeFunction={updateUser} name="username" text="Username" placeholder="Enter Your Name" value={user.username} /> 
        <InputEntry changeFunction={updateUser} name="email" text="Email" placeholder="Enter Your Email" value={user.email} />
        <InputEntry changeFunction={updateUser} name="phone" text="Phone Number" placeholder="Enter Your Phone Number" value={user.phone} />
        <InputEntry changeFunction={updateUser} name="password" text="Password" placeholder="Enter Your Password" value={user.password} />
        <InputEntry changeFunction={updateUser} name="confirmPassword" text="Confirm Password" placeholder="Re-Enter Your Password" value={user.confirmPassword} />
        <button type="submit" onClick={storeData}>Submit</button>
        {(!user.match) ? <h3>Passwords Do Not Match</h3> : null}

        <h2 className="text-2xl mt-7 mb-2">Already have an Account?</h2>
        <button onClick={()=>navigate("/login")}>Login</button>
        </>)}
        </>}
    </>
}   

export default Register;