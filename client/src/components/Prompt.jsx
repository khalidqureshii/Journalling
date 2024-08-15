import React from "react";

function Prompt(props) {
    return (
        <div>
            <h2>{props.question}</h2><br />
            <h3>{props.answer}</h3>
        </div>
    );
}

export default Prompt;
