import React from "react";

function Prompt(props) {
    return (
        <div className="rounded-xl bg-[#2d2d2d] px-4 py-2 mx-7 my-5">
            <h2 className="text-left text-2xl">{props.question}</h2>
            <h3 className="text-left text-lg mt-1">{props.answer}</h3>
        </div>
    );
}

export default Prompt;
