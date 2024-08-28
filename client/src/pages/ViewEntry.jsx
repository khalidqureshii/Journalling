import react, { useEffect, useState } from "react";
import useEntryAuth from "../store/EntryData";
import FullDailyEntry from "../components/FullDailyEntry";

function ViewEntry() {
    const {data} = useEntryAuth();
    const [entryData, setEntryData] = useState(data);

    useEffect(()=>{
        setEntryData(data);
    }, [data]);

    return <FullDailyEntry data={entryData}/>;
}

export default ViewEntry;