import SignupForm from "@/components/SignupForm";
import { Link } from "react-router-dom";

const SignupPage = () => {
    return (
        <div className="flex flex-col gap-4">
            <header className="text-center">
                <h2 className="text-4xl">Créez votre compte</h2>
                <p className="text-[85%] opacity-80">
                    Votre application de gestion simple et rapide
                </p>
            </header>

            <div className="py-4" />

            <section>
                <SignupForm />
            </section>

            <footer className="text-center">
                <p>
                    Déjà utilisateur ?{" "}
                    <Link
                        to={"/login"}
                        className="underline hover:text-primary duration-500"
                    >
                        Connectez vous
                    </Link>
                </p>
            </footer>
        </div>
    );
};

export default SignupPage;
