import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import GlobalContextLayer from "./components/GlobalContextLayer";
import "./index.css";
import { mainRoutes } from "./routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <GlobalContextLayer>
        <RouterProvider router={mainRoutes} />
    </GlobalContextLayer>,
);
