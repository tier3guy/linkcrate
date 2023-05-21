// External Imports
import { Routes, Route } from "react-router-dom";

// Internal Imports
import routes from "./routes";

// Components
import {
    CreateAccountModal,
    LoginModal,
    DeleteAccountModal
} from "./components";

// Contexts
import { useAuthContext } from "./contexts/AuthContext";

// Pages
import { LoadingPage } from "./pages";

const App = () => {
    const {
        loginModalVisibilty,
        setLoginModalVisibilty,
        createAccountModalVisibility,
        setCreateAccountModalVisibility,
        deleteAccountModalVisibility,
        setDeleteAccountModalVisibility,
        loading
    } = useAuthContext();

    if (loading) return <LoadingPage />;

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
            <DeleteAccountModal
                visible={deleteAccountModalVisibility}
                setVisibility={setDeleteAccountModalVisibility}
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
