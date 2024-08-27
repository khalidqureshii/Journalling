import react from "react";
import { useNavigate } from "react-router-dom";

function Header () {
    const navigate = useNavigate();
    return <header className="flex flex-row justify-between">
        <h1 className="text-2xl">MindFul Moments</h1>

        <button onClick={()=>{navigate("/logout")}}>Logout</button>
    </header>
}

export default Header;