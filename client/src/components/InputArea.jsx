import React from "react";

function InputArea(props) {
    return (
        <>
            <label htmlFor={props.name}>{props.text}</label><br />
            <textarea
                onChange={props.changeFunction}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                value={props.value}
                rows={props.rows || 6} 
                cols={props.cols || 180} 
                autoComplete="off"
                required
            />
            <br />
        </>
    );
}

export default InputArea;
