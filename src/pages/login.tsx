import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
                <LoginForm />
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
