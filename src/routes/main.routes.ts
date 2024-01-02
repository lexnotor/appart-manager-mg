import AuthLayout from "@/components/AuthLayout";
import RootLayout from "@/components/RootLayout";
import React from "react";
import { createBrowserRouter } from "react-router-dom";

const mainRoutes = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: React.lazy(() => import("@/pages/home")),
            },
            {
                path: "apparts",
                Component: React.lazy(() => import("@/pages/apparts")),
            },
            {
                path: "payment",
                Component: React.lazy(() => import("@/pages/paiement")),
            },
            {
                path: "occupants",
                Component: React.lazy(() => import("@/pages/occupants")),
            },
            {
                path: "reset",
                Component: React.lazy(() => import("@/pages/resetPsw")),
            },
            {
                path: "settings",
                Component: React.lazy(() => import("@/pages/settings")),
            },
        ],
        ErrorBoundary: React.lazy(() => import("@/pages/error")),
    },
    {
        path: "/",
        Component: AuthLayout,
        ErrorBoundary: React.lazy(() => import("@/pages/error")),
        children: [
            {
                path: "/login",
                Component: React.lazy(() => import("@/pages/login")),
            },
            {
                path: "/signup",
                Component: React.lazy(() => import("@/pages/signup")),
            },
        ],
    },
]);

export default mainRoutes;
