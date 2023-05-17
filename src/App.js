// External Imports
import { Routes, Route } from "react-router-dom";

// Internal Imports
import routes from "./routes";

// Components
import { Navbar } from "./components";

const App = () => {
    return (
        <div className="h-screen w-screen bg-slate-100 overflow-x-hidden">
            <Navbar />
            <Routes>
                {routes.map((route, index) => (
                    <Route {...route} />
                ))}
            </Routes>
        </div>
    );
};

export default App;
