import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
    const { status } = useAuth();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (status == "CONNECTED") navigateTo("/");
    }, [status, navigateTo]);

    return <Outlet />;
};

export default AuthLayout;
