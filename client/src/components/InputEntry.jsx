import React from "react";

function InputEntry(props) {
    return <>   
        <label htmlFor={props.name}>{props.text}</label><br />
        <input onChange={props.changeFunction} type="text" 
            id={props.name} name={props.name} placeholder={props.placeholder} value={props.value} autoComplete="off" required/>
        <br />
    </>
}   

export default InputEntry;