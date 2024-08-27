import react from "react";
import PulseLoader from "react-spinners/PulseLoader";
import RotateLoader from "react-spinners/RotateLoader";

function Loader() {
    //return <PulseLoader color="#ffffff" margin={9} size={20} />
    return <RotateLoader color="#ffffff" margin={12} size={25} />
}

export default Loader;