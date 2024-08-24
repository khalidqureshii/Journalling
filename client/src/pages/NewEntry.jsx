import React, { useState } from "react";
import InputArea from "../components/InputArea";
import useAuth from "../store/Auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import LINK from "../store/Link";

// const {userID, challenge, solving, moments, gratitude, smile, madeSmile} = req.body;
function newEntry() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const currUserId = user._id;
    const [userData, setUserData] = useState({userID: currUserId, challenge: "", solving: "", moments: "", gratitude: "", smile: "", madeSmile: ""});

    const q1 = "What are the main challenges you’re facing today? Describe them.";
    const q2 = "How did you address these challenges?";
    const q3 = "What were the best moments of your day?";
    const q4 = "Name two things you’re grateful for today.";
    const q5 = "Who made you smile the most today, and how did they do it?";
    const q6 = "How many people smiled because of you?";

    function updateUser(event) {
        const { name, value } = event.target;
        setUserData(prevUser => { 
            const updatedUser = {
                ...prevUser,
                [name]: value,
            }
            return updatedUser;
        });
    }

    async function storeEntry() {
        const response = await fetch(LINK + "api/entries/newEntry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }); 

        if (response.ok) {
            toast("Successfully Created New Entry");
            navigate("/");
        }
        else {
            const res_data = await response.json();
            console.log(res_data.extraDetails);
            toast(res_data.extraDetails);
        }
    }

    const backButton = <><br /><button onClick={()=>navigate("/")}>Back</button><br /></>;

    return <>
        <h1 className="mb-6">Welcome To New Entry Page</h1>
        <InputArea changeFunction={updateUser} name="challenge" text={q1} placeholder="Enter Text Here..." />
        <InputArea changeFunction={updateUser} name="solving" text={q2} placeholder="Enter Text Here..." />
        <InputArea changeFunction={updateUser} name="moments" text={q3} placeholder="Enter Text Here..." />
        <InputArea changeFunction={updateUser} name="gratitude" text={q4} placeholder="Enter Text Here..." />
        <InputArea changeFunction={updateUser} name="smile" text={q5} placeholder="Enter Text Here..." />
        <InputArea changeFunction={updateUser} name="madeSmile" text={q6} placeholder="Enter Text Here..." />

        <div>
            <button className="w-24 mr-2" onClick={()=>navigate("/")}>Back</button>
            <button type="submit" className="w-24 ml-2" onClick={storeEntry}>Submit</button>
        </div>
    </>
}

export default newEntry;