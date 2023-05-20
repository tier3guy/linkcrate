// Assests
import ErrorImg from "../assets/ServerError.svg";

// External Imports
import { Link } from "react-router-dom";

// Components
import { Logo } from "../components";

const ServerError = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <img src={ErrorImg} alt="503" className="h-[65%]" />
            <p className="w-2/3 text-center mt-8">
                This page is still under construction.{" "}
            </p>
            <Link
                to="/"
                className="border-b-2 text-center border-yellow-500 text-base mb-10"
            >
                Go to the Home Page.
            </Link>
            <Logo />
        </div>
    );
};

export default ServerError;
