import AuthLayout from "@/components/AuthLayout";
import RootLayout from "@/components/RootLayout";
import {
    AppartsPage,
    ClientsPage,
    ErrorPage,
    HomePage,
    LoginPage,
    PaiementPage,
    ResetPswPAge,
    SettingsPage,
    SignupPage,
} from "@/pages";
import { createBrowserRouter } from "react-router-dom";

const mainRoutes = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: HomePage,
            },
            {
                path: "apparts",
                Component: AppartsPage,
            },
            {
                path: "payment",
                Component: PaiementPage,
            },
            {
                path: "clients",
                Component: ClientsPage,
            },
            {
                path: "reset",
                Component: ResetPswPAge,
            },
            {
                path: "settings",
                Component: SettingsPage,
            },
        ],
        ErrorBoundary: ErrorPage,
    },
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "/login",
                Component: LoginPage,
            },
            {
                path: "/signup",
                Component: SignupPage,
            },
        ],
    },
]);

export default mainRoutes;
