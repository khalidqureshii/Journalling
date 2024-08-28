import react from "react";

function DummyHeader () {
    return <header className="flex flex-row justify-between bg-[#2d2d2d] py-4">
        <button onClick={()=>{}}><h1 className="text-3xl ml-7">MindFul Moments</h1></button>

        <button onClick={()=>{}}><h1 className="mr-7 text-xl">Logout</h1></button>
    </header>
}

export default DummyHeader;