import React from "react";

function InputEntry(props) {
    return <>   
        <label className="text-lg" htmlFor={props.name}>{props.text}</label><br />
        <input onChange={props.changeFunction} type="text" className="px-3 py-1 rounded-lg mb-4 w-64 h-10 text-center mt-0.5"
            id={props.name} name={props.name} placeholder={props.placeholder} value={props.value} autoComplete="off" required/>
        <br />
    </>
}   

export default InputEntry;