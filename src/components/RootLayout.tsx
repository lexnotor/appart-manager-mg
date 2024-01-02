import { Navigate, Outlet } from "react-router-dom";
import Header from "./Header";
import useAuth from "@/hooks/useAuth";
import { Suspense } from "react";

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
                <div className="flex justify-center items-center w-full  h-[20rem]">
                    <div className="w-8 h-8 border-2 border-transparent border-t-primary rounded-full animate-spin" />
                </div>
            ) : (
                <Suspense
                    fallback={
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full border border-transparent border-t-primary animate-spin" />
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            )}
        </main>
    );
};

export default RootLayout;
