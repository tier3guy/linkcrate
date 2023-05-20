// External Imports
import { Routes, Route } from "react-router-dom";

// Internal Imports
import routes from "./routes";

// Components
import { Navbar, CreateAccountModal, LoginModal } from "./components";

// Contexts
import { useAuthContext } from "./contexts/AuthContext";

const App = () => {
    const {
        loginModalVisibilty,
        setLoginModalVisibilty,
        createAccountModalVisibility,
        setCreateAccountModalVisibility
    } = useAuthContext();
    return (
        <div className="h-screen w-screen bg-slate-100 overflow-x-hidden scroll-smooth">
            <CreateAccountModal
                visible={createAccountModalVisibility}
                setVisibility={setCreateAccountModalVisibility}
            />
            <LoginModal
                visible={loginModalVisibilty}
                setVisibility={setLoginModalVisibilty}
            />
            <Routes>
                {routes.map((route) => (
                    <Route {...route} />
                ))}
            </Routes>
        </div>
    );
};

export default App;
