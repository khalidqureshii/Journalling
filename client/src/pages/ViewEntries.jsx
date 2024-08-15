import react, {useState, useEffect} from "react";
import EntryCard from "../components/EntryCard";
import useAuth from "../store/Auth";
import FullDailyEntry from "../components/FullDailyEntry";


function ViewEntries(){
    const {user} = useAuth();
    const userID = user._id;
    const [entries, setEntries] = useState([]);
    
    const [isClicked, setClickEntry] = useState(false);
    const [currEntry, setCurrEntry] = useState([]);


    function createCards(entry){
        return <EntryCard data={entry} date={entry.date} updateClick={setClickEntry} updateEntry={setCurrEntry}/>
    }

    useEffect(()=>{
        async function fetchEntries() {
            const response = await fetch("http://localhost:5000/api/entries/getEntries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userID})
            });
            const data = await response.json();
            const allEntries = data.allEntries;
            setEntries(allEntries);
        }
        fetchEntries();
    
    }, [userID]);
    

    return (<> {(isClicked)? <FullDailyEntry data={currEntry}/> : (entries.length==0)?<h1>You Have Not Made Any Entries</h1>:entries.map(createCards) }</>);
}

export default ViewEntries;