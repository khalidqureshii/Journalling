import React, { useState } from "react";
import InputArea from "../components/InputArea";
import useAuth from "../store/Auth";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import LINK from "../store/Link";
import Loader from "../components/Loader";

// const {userID, challenge, solving, moments, gratitude, smile, madeSmile} = req.body;
function newEntry() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const currUserId = user._id;
    const [userData, setUserData] = useState({userID: currUserId, challenge: "", solving: "", moments: "", gratitude: "", smile: "", madeSmile: ""});
    const [isLoading, setLoading] = useState(false);
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
        setLoading(true);
        const response = await fetch(LINK + "api/entries/newEntry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        }); 
        setLoading(false);

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

    return <> {isLoading ? <Loader /> : <>
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-7xl text-center">
                <h1 className="mb-8 text-5xl mt-8">Welcome To New Entry Page</h1>
                <InputArea changeFunction={updateUser} name="challenge" text={q1} placeholder="Enter Text Here..." />
                <InputArea changeFunction={updateUser} name="solving" text={q2} placeholder="Enter Text Here..." />
                <InputArea changeFunction={updateUser} name="moments" text={q3} placeholder="Enter Text Here..." />
                <InputArea changeFunction={updateUser} name="gratitude" text={q4} placeholder="Enter Text Here..." />
                <InputArea changeFunction={updateUser} name="smile" text={q5} placeholder="Enter Text Here..." />
                <InputArea changeFunction={updateUser} name="madeSmile" text={q6} placeholder="Enter Text Here..." />

                <button type="submit" className="w-32 h-12 ml-2 customButton mb-10" onClick={storeEntry}><h6 className="text-xl">Submit</h6></button>
            </div>
        </div>
    </>}
    </>
}

export default newEntry;