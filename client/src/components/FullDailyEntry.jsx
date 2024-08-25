import React, { useState } from "react";
import Prompt from "./Prompt";
import LINK from "../store/Link";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

function FullDailyEntry(props) {
    const dateStr = props.data.date;
    const unformattedDate = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = unformattedDate.toLocaleDateString('en-US', options);
    
    const q1 = "What are the main challenges you’re facing today? Describe them.";
    const q2 = "How did you address these challenges?";
    const q3 = "What were the best moments of your day?";
    const q4 = "Name two things you’re grateful for today.";
    const q5 = "Who made you smile the most today, and how did they do it?";
    const q6 = "How many people smiled because of you?";

    const navigate = useNavigate();
    async function deleteEntry() {
        const entryID = props.data._id;
        const output = fetch(LINK + "api/entries/deleteEntry", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({entryID})
        });
        toast("Entry Deleted Succesfully");
        props.deleteMethod(false);
        navigate("/viewEntries");
    }

    const [clickedDelete, clickDelete] = useState(false);

    return (<>
        { clickedDelete ? 
        <div>
            <h1>Do You Really Want to Delete this Entry?</h1><br />
            <button className="w-24 mx-2" onClick={deleteEntry}>Yes</button>
            <button className="w-24 mx-2" onClick={()=>{clickDelete(false)}}>Cancel</button>
        </div> :
            <>
                <h1 className="mb-4 text-left">{formattedDate}</h1>
                <Prompt question={q1} answer={props.data.challenge} />
                <Prompt question={q2} answer={props.data.solving} />
                <Prompt question={q3} answer={props.data.moments} />
                <Prompt question={q4} answer={props.data.gratitude} />
                <Prompt question={q5} answer={props.data.smile} />
                <Prompt question={q6} answer={props.data.madeSmile} />
                <button className="mt-3 w-24 mx-2" onClick={()=>navigate("/viewEntries")}>Back</button>
                <button className="w-24 mx-2 bg-red-500" onClick={()=>{clickDelete(true)}}>Delete</button>
                <button className="w-24 mx-2" onClick={()=>navigate("/logout")}>Logout</button>
            </>}
        </>
    );
}

export default FullDailyEntry;
