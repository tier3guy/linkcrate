import { Home, Profile, ErrorPage, ServerError } from "../pages";

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
        key: "3",
        path: "/integrations",
        exact: true,
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        key: "4",
        path: "/settings",
        exact: true,
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        key: "5",
        path: "/guide",
        exact: true,
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        key: "6",
        path: "/help-center",
        exact: true,
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        key: "7",
        path: "/templates",
        exact: true,
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        key: "8",
        path: "/pricing",
        exact: true,
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        key: "9",
        path: "/blogs",
        exact: true,
        element: <ServerError />,
        errorElement: <ErrorPage />
    },
    {
        key: "404",
        path: "*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
    }
];

export default routes;
