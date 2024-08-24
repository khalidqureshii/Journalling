import react, {useState, useEffect} from "react";
import EntryCard from "../components/EntryCard";
import useAuth from "../store/Auth";
import FullDailyEntry from "../components/FullDailyEntry";
import { useNavigate } from "react-router-dom";
import LINK from "../store/Link";
import HashLoader from "react-spinners/HashLoader";

function ViewEntries(){
    const {user} = useAuth();
    const userID = user._id;
    const [entries, setEntries] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isClicked, setClickEntry] = useState(false);
    const [currEntry, setCurrEntry] = useState([]);

    const navigate = useNavigate();

    function createCards(entry){
        return <EntryCard data={entry} date={entry.date} updateClick={setClickEntry} updateEntry={setCurrEntry}/>
    }

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
            setLoading(false);
        }
        fetchEntries();
    
    }, [userID]);
    
    const backButton = <><br /><button className="mt-3 w-24 mx-2" onClick={()=>navigate("/")}>Back</button></>;
    const noEntryHeader = <h1 className="mb-0">You Have Not Made Any Entries</h1>;
    const entryHeader = <h1 className="text-5xl mb-1">Past Entries</h1>;
    const logoutButton = <><button className="w-24 mx-2" onClick={()=>navigate("/logout")}>Logout</button><br /></>;

    return <> {isLoading ? 
        <>
        <HashLoader color="#ffffff" />
        </> : <> {(isClicked)? (<FullDailyEntry data={currEntry} />) : 
        ( (entries.length==0) ? noEntryHeader : <>{entryHeader}{entries.map(createCards)}</>) } {backButton} {logoutButton}
        </>}
    </>;
}

export default ViewEntries;