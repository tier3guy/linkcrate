// Assets
import { ReactComponent as LogoSVG } from "../assets/Logo.svg";

// External Imports
import { Link } from "react-router-dom";

const Logo = ({ label, svgOnly, labelStyle, logoStyle }) => {
    return (
        <Link to="/" className="">
            <div className="flex space-x-2 items-center">
                <LogoSVG className={`h-8 w-8 ${logoStyle}`} />
                {!svgOnly && (
                    <div>
                        <p className={`text-2xl ${labelStyle}`}>
                            {label || "Linkcrate"}
                        </p>
                        <p className="text-[14px] -mt-1 text-gray-400 ">Beta</p>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default Logo;
