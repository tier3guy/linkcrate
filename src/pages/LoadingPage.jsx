// Components
import { Spinner } from "../components";

const LoadingPage = () => {
    return (
        <div className="h-screen w-screen bg-slate-100 grid place-content-center">
            <div className="flex space-x-4 items-center">
                <Spinner />
                <h1 className="text-lg text-slate-800">Loading...</h1>
            </div>
        </div>
    );
};

export default LoadingPage;
