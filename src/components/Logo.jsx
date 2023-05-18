// Assets
import { ReactComponent as LogoSVG } from "../assets/Logo.svg";

// External Imports
import { Link } from "react-router-dom";

const Logo = ({ label, svgOnly, labelStyle, logoStyle }) => {
    return (
        <Link to="/">
            <div className="flex space-x-2 items-center">
                <LogoSVG className={`h-8 w-8 ${logoStyle}`} />
                {!svgOnly && (
                    <p className={`text-2xl ${labelStyle}`}>
                        {label || "Linkcrate"}
                    </p>
                )}
            </div>
        </Link>
    );
};

export default Logo;
