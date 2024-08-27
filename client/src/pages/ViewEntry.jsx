import react from "react";
import useEntryAuth from "../store/EntryData";
import FullDailyEntry from "../components/FullDailyEntry";

function ViewEntry() {
    const {data} = useEntryAuth();
    return <FullDailyEntry data={data}/>;
}

export default ViewEntry;