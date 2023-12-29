import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import useAuth from "@/hooks/useAuth";

const RootLayout = () => {
    const { status } = useAuth();
    return (
        <main>
            <Header />
            {status == "DISCONNECTED" ? (
                <Navigate to={"/login"} />
            ) : status == "LOADING" ? (
                <div>
                    <span className="w-8 h-8 border-2 border-transparent border-t-primary rounded-full animate-spin" />
                </div>
            ) : (
                <Outlet />
            )}
        </main>
    );
};

export default RootLayout;
