// Assets
import { ReactComponent as LogoSVG } from "../assets/Logo.svg";

// External Imports
import { Link } from "react-router-dom";

const Logo = ({ label }) => {
    return (
        <Link to="/">
            <div className="flex space-x-2 items-center">
                <LogoSVG className="h-8 w-8" />
                <p className="text-2xl">{label || "Linkcrate"}</p>
            </div>
        </Link>
    );
};

export default Logo;
