import React, { useState } from "react";
import Prompt from "./Prompt";
import LINK from "../store/Link";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

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
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({entryID})
        });
        toast("Entry Deleted Succesfully");
        navigate("/");
    }

    const [clickedDelete, clickDelete] = useState(false);

    return (<>
        { clickedDelete ? 
        <div className="flex flex-col justify-center items-center w-full h-90vh">
            <h1 className="text-5xl">Do You Really Want to Delete this Entry?</h1><br />
            <div>
                <button className="w-32 h-12 mx-2 customButton" onClick={deleteEntry}><h6 className="text-xl">Yes</h6></button>
                <button className="w-32 h-12 mx-2 customButton" onClick={()=>{clickDelete(false)}}><h6 className="text-xl">Cancel</h6></button>
            </div>
        </div> :
            <> 
                <div className="flex flex-row justify-center mt-6">
                    <button className="my-3 mr-7 text-[#ffffffde]" onClick={()=>{navigate("/")}}><IoMdArrowBack size='2.5rem'/></button>
                    <h1 className="text-4xl mt-3 text-left">{formattedDate}</h1>
                    <button className="my-3 ml-7 text-[#ffffffde]" onClick={()=>{clickDelete(true)}}><MdDeleteForever size='2.5rem' /></button>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <Prompt question={q1} answer={props.data.challenge} />
                    <Prompt question={q2} answer={props.data.solving} />
                    <Prompt question={q3} answer={props.data.moments} />
                    <Prompt question={q4} answer={props.data.gratitude} />
                    <Prompt question={q5} answer={props.data.smile} />
                    <Prompt question={q6} answer={props.data.madeSmile} />
                </div>
            </>}
        </>
    );
}

export default FullDailyEntry;
