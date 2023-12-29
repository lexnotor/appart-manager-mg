import useAuth from "@/hooks/useAuth";
import React, { useRef, useState } from "react";

const SignupForm = () => {
    const { signup } = useAuth();

    const emailRef = useRef<HTMLInputElement>(null),
        pswRef = useRef<HTMLInputElement>(null),
        pswcRef = useRef<HTMLInputElement>(null);
    const [showPsw, setShowPsw] = useState(false);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (pswRef.current.value != pswcRef.current.value)
            return alert("Les mots de passe de correspondent pas");

        signup(emailRef.current.value, pswRef.current.value);
    };

    return (
        <form
            onSubmit={submit}
            className="flex flex-col gap-4 max-w-[30rem] mx-auto"
        >
            <div className="flex flex-col gap-2">
                <label htmlFor="email_input">E-mail</label>
                <input
                    required
                    type="email"
                    id="email_input"
                    name="email_input"
                    placeholder="Votre adresse Email"
                    ref={emailRef}
                    className=""
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="psw_input">Mot de passe</label>
                <input
                    required
                    type={showPsw ? "text" : "password"}
                    id="psw_input"
                    name="psw_input"
                    placeholder="*********"
                    minLength={6}
                    ref={pswRef}
                    className=""
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="pswc_input">Confirmer Mot de passe</label>
                <input
                    required
                    type={showPsw ? "text" : "password"}
                    id="pswc_input"
                    name="pswc_input"
                    placeholder="*********"
                    minLength={6}
                    ref={pswcRef}
                    className=""
                />
                <label
                    htmlFor="show_psw"
                    className="self-end text-[85%] flex gap-1 items-center cursor-pointer"
                >
                    <input
                        type="checkbox"
                        name="show_psw"
                        id="show_psw"
                        className="peer"
                        onChange={() => setShowPsw((old) => !old)}
                        hidden
                    />
                    <span className="checkbox" />
                    <span>Afficher mot de passe</span>
                </label>
            </div>

            <button
                type="submit"
                className="py-2 px-4 border border-primary text-primary hover:text-white hover:bg-primary duration-500 rounded-md"
            >
                Inscription
            </button>
        </form>
    );
};

export default SignupForm;
