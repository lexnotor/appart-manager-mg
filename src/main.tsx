import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { mainRoutes } from "./routes";
import GlobalContextLayer from "./components/GlobalContextLayer";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <GlobalContextLayer>
            <RouterProvider router={mainRoutes} />
        </GlobalContextLayer>
    </React.StrictMode>,
);
