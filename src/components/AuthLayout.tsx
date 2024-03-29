import useAuth from "@/hooks/useAuth";
import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Managers from "./controllers/Managers";

const AuthLayout = () => {
    const { status } = useAuth();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (status == "CONNECTED") navigateTo("/");
    }, [status, navigateTo]);

    return (
        <>
            <div className="px-4">
                <h2 className="text-3xl font-bold text-center pt-8 mb-4">
                    <span className="">Mar</span>
                    <span className="dark:text-primary text-primary-dark">
                        vel Gro
                    </span>
                    <span className=" ">up</span>
                </h2>
                <Suspense
                    fallback={
                        <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 flex justify-center items-center">
                            <div className="w-10 h-10 rounded-full border border-transparent border-t-primary animate-spin" />
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </div>

            <Managers />
        </>
    );
};

export default AuthLayout;
