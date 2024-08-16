import React from "react";

function Prompt(props) {
    return (
        <div className="mt-5 rounded-xl bg-[#303030] px-4 py-2">
            <h2 className="text-left text-2xl">{props.question}</h2>
            <h3 className="text-left text-lg mt-1">{props.answer}</h3>
        </div>
    );
}

export default Prompt;
