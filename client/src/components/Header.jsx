import react from "react";
import { useNavigate } from "react-router-dom";

function Header () {
    const navigate = useNavigate();
    return <header className="flex flex-row justify-between bg-[#2d2d2d] py-4">
        <h1 className="text-3xl ml-7">MindFul Moments</h1>

        <button onClick={()=>{navigate("/logout")}}><h1 className="mr-7 text-xl">Logout</h1></button>
    </header>
}

export default Header;