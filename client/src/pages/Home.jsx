import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import EntryCard from "../components/EntryCard";
import useAuth from "../store/Auth";
import LINK from "../store/Link";
import Loader from "../components/Loader";
import useEntryAuth from "../store/EntryData";

function Home() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const {setData, setDeleteMethod} = useEntryAuth();
    const displayName = `, ${user.username}`;
    const userID = user._id;
    const [entries, setEntries] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isClicked, setClickEntry] = useState(false);
    const [currEntry, setCurrEntry] = useState([]);
    const [isEntryFetched, setEntryFetched] = useState(false);


    
    function createCards(entry){
        return <EntryCard data={entry} date={entry.date} updateClick={setClickEntry} updateEntry={setCurrEntry}/>
    }

    useEffect(()=>{setEntryFetched(false)}, [userID]);
    
    useEffect(()=>{
        async function fetchEntries() {
            setLoading(true);
            const response = await fetch(LINK + "api/entries/getEntries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userID})
            });
            const data = await response.json();
            const allEntries = data.allEntries;
            setEntries(allEntries);
            setEntryFetched(true);
            setLoading(false);
        }
        fetchEntries();
        
    }, [userID, isClicked, isEntryFetched]);
    
    
    useEffect(()=>{
        if(!isClicked) return;
        setData(currEntry);
        setClickEntry(false);
        navigate("/viewEntry");
    }, [isClicked]);
    
    const noEntryHeader = <h1 className="text-4xl mt-3 mb-5">You Have Not Made Any Entries</h1>;
    const entryHeader = <h1 className="text-4xl mb-5 mt-3">Past Entries</h1>;
    const newEntryButton = <button className="mb-10 mt-3 mx-2 w-40 customButton" onClick={()=>navigate("/newEntry")}>New Entry</button>;
    return <>
        {isLoading ?<Loader /> : 
            (<div className="mx-5"><div className="flex flex-col justify-center items-center w-full h-90vh">
                <h1 className="mb-5 text-4xl md:text-5xl text-center">Welcome{displayName}</h1>
                {newEntryButton} 
                {(!isEntryFetched) ? noEntryHeader : <>{entryHeader}{entries.map(createCards)}</>}
            </div></div> )}
    </>
}   

export default Home;