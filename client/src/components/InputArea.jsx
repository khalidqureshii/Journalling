import React from "react";

function InputArea(props) {
    return (
        <div className="max-w-full overflow-hidden my-7">
            <label className="text-xl" htmlFor={props.name}>{props.text}</label><br />
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
                className="w-full max-w-full rounded-3xl px-4 py-2 text-xl mt-1.5"
            />
            <br />
        </div>
    );
}

export default InputArea;
