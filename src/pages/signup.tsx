import SignupForm from "@/components/SignupForm";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const SignupPage = () => {
    const { status } = useAuth();

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
                {status == "DISCONNECTED" ? (
                    <SignupForm />
                ) : (
                    <div className="flex justify-center items-center w-full h-[20rem]">
                        <div className="w-8 h-8 border-2 border-transparent border-t-primary rounded-full animate-spin" />
                    </div>
                )}
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
