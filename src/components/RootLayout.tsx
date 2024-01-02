import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import useAuth from "@/hooks/useAuth";

const RootLayout = () => {
    const { status } = useAuth();
    return (
        <main className="max-w-[85rem] mx-auto">
            <header className="sticky top-0 backdrop-blur-xl">
                <Header />
            </header>

            {status == "DISCONNECTED" ? (
                <Navigate to={"/login"} />
            ) : status == "LOADING" ? (
                <div className="flex justify-center items-center w-full h-full">
                    <div className="w-8 h-8 border-2 border-transparent border-t-primary rounded-full animate-spin" />
                </div>
            ) : (
                <Outlet />
            )}
        </main>
    );
};

export default RootLayout;
