// Assests
import ErrorImg from "../assets/ErrorBig.svg";

// External Imports
import { Link } from "react-router-dom";

// Components
import { Logo } from "../components";

const Error = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <img src={ErrorImg} alt="404" className="h-[65%] md:ml-8" />
            <p className="w-2/3 text-center mt-4">
                Sorry, but the page you are looking for does not exists.{" "}
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

export default Error;
