import React from "react";
import FullDailyEntry from "./FullDailyEntry";


function EntryCard(props) {
    const dateStr = props.date;
    const entryData = props.data;
    const unformattedDate = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = unformattedDate.toLocaleDateString('en-US', options);

    function setStates() {
        props.updateClick(true);
        props.updateEntry(entryData);
    }

    return (
        <>
            <button onClick={setStates}>{formattedDate}</button>
        </>
    );
}

export default EntryCard;
