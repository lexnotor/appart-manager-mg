import { useOccupantContext } from "@/contexts/occupant.context";
import useAuth from "@/hooks/useAuth";
import { OccupantEntity } from "@/types";
import { Modal } from "antd";
import { Timestamp, addDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";

const NewOccupant = ({ closeModal }: { closeModal: () => any }) => {
    const { occupantCollection } = useOccupantContext();
    const { auth } = useAuth();

    const [loading, setLoading] = useState(false);

    const nomRef = useRef<HTMLInputElement>(null),
        phoneRef = useRef<HTMLInputElement>(null),
        emailRef = useRef<HTMLInputElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const payload: OccupantEntity = {
            nom: nomRef.current.value,
            email: emailRef.current.value || null,
            phone: phoneRef.current.value || null,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
            deleted_at: null,
            owner: auth.currentUser.uid,
        };

        setLoading(true);
        addDoc(occupantCollection, payload)
            .then(() => {
                closeModal();
            })
            .catch()
            .finally(() => setLoading(false));
    };

    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">Nouvel Occupant</h1>

            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="new-client-name" className="w-48">
                        Nom
                    </label>
                    <input
                        type="text"
                        required
                        minLength={3}
                        id="new-client-name"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="Nom"
                        ref={nomRef}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="new-client-name" className="w-48">
                        Téléphone
                    </label>
                    <input
                        type="tel"
                        minLength={3}
                        id="new-client-phone"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="+243 999999999"
                        ref={phoneRef}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="new-client-name" className="w-48">
                        Email
                    </label>
                    <input
                        type="email"
                        minLength={3}
                        id="new-client-email"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="Email"
                        ref={emailRef}
                    />
                </div>

                <footer className="flex justify-center gap-8 mt-4">
                    <button
                        type="button"
                        className="py-2 px-12 rounded-lg bg-primary-dark text-white"
                        onClick={closeModal}
                    >
                        Annuler
                    </button>
                    <button
                        disabled={loading}
                        className="flex gap-2 py-2 px-12 rounded-lg bg-primary-dark disabled:bg-primary-dark/60 text-white"
                    >
                        {loading && (
                            <span className="w-4 h-4 rounded-full border border-transparent border-t-white animate-spin" />
                        )}
                        <span>Ajouter</span>
                    </button>
                </footer>
            </form>
        </Modal>
    );
};

export default NewOccupant;
