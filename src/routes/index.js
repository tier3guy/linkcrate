import { Home, Profile, ErrorPage } from "../pages";

const routes = [
    {
        key: "1",
        path: "/",
        exact: true,
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        key: "2",
        path: "/profile",
        exact: true,
        element: <Profile />,
        errorElement: <ErrorPage />
    },
    {
        key: "2",
        path: "*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
    }
];

export default routes;
