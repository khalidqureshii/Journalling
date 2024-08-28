import React from "react";

function Prompt(props) {
    return (
        <div className="rounded-xl bg-[#2d2d2d] px-6 py-4 mx-7 my-7 max-w-5xl w-full">
            <h2 className="text-left text-3xl mb-2">{props.question}</h2>
            <h3 className="text-left text-xl mt-1">{props.answer}</h3>
        </div>
    );
}

export default Prompt;
