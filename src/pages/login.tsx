import LoginForm from "@/components/LoginForm";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const { status } = useAuth();
    return (
        <div className="flex flex-col gap-4">
            <header className="text-center">
                <h2 className="text-4xl">Connectez-vous</h2>
                <p className="text-[85%] opacity-80">
                    Gérer vos appartements en toute sereinité
                </p>
            </header>

            <div className="py-4" />

            <section>
                {status == "DISCONNECTED" ? (
                    <LoginForm />
                ) : (
                    <div className="flex justify-center items-center w-full h-[20rem]">
                        <div className="w-8 h-8 border-2 border-transparent border-t-primary rounded-full animate-spin" />
                    </div>
                )}
            </section>

            <footer className="text-center">
                <p>
                    Pas encore de compte ?{" "}
                    <Link
                        to={"/signup"}
                        className="underline hover:text-primary duration-500"
                    >
                        Créez un compte
                    </Link>
                </p>
            </footer>
        </div>
    );
};

export default LoginPage;
