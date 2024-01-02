import useAuth from "@/hooks/useAuth";
import { Suspense, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
    const { status } = useAuth();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (status == "CONNECTED") navigateTo("/");
    }, [status, navigateTo]);

    return (
        <Suspense
            fallback={
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/20 flex justify-center items-center">
                    <div className="w-10 h-10 rounded-full border border-transparent border-t-primary animate-spin" />
                </div>
            }
        >
            <Outlet />
        </Suspense>
    );
};

export default AuthLayout;
