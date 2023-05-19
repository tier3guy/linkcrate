// Assests
import ErrorImg from "../assets/ErrorBig.svg";

// External Imports
import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="h-screen w-screen flex flex-col items-center">
            <img
                src={ErrorImg}
                alt="Error"
                className="h-[65%] md:ml-8 md:mt-24"
            />
            <p className="w-2/3 text-center mt-4">
                Sorry, but the page you are looking for does not exists.{" "}
            </p>
            <Link to="/" className="border-b-2 text-center border-yellow-500">
                Go to the Home Page.
            </Link>
        </div>
    );
};

export default Error;
