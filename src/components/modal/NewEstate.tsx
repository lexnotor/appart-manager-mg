import { useEstateContext } from "@/contexts/estate.context";
import { useFirebaseContext } from "@/contexts/firebase.context";
import useAuth from "@/hooks/useAuth";
import { EstateEntity } from "@/types";
import { Modal } from "antd";
import { Timestamp, addDoc, doc } from "firebase/firestore";
import React, { useRef, useState } from "react";

const NewEstate = ({ closeModal }: { closeModal: () => any }) => {
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const { db } = useFirebaseContext();
    const { estateCollection } = useEstateContext();

    const titleRef = useRef<HTMLInputElement>(null),
        descRef = useRef<HTMLTextAreaElement>(null),
        addressRef = useRef<HTMLTextAreaElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const payload: EstateEntity = {
            title: titleRef.current.value,
            description: descRef.current.value,
            address: addressRef.current.value,
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
            deleted_at: null,
            owner: { email: auth.currentUser.email, id: auth.currentUser.uid },
            owner_ref: doc(db, "users/" + auth?.currentUser?.uid) as any,
        };

        setLoading(true);
        addDoc(estateCollection, payload)
            .then(() => closeModal())
            .catch()
            .finally(() => setLoading(false));
    };

    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">
                Nouvelle Propriété
            </h1>

            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="estate-name" className="w-48">
                        Designation
                    </label>
                    <input
                        type="text"
                        required
                        minLength={3}
                        id="estate-name"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="Propriété ..."
                        ref={titleRef}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="estate-description" className="w-48">
                        Description
                    </label>
                    <textarea
                        required
                        minLength={3}
                        id="estate-description"
                        rows={4}
                        className="grow border border-neutral-700 rounded-lg p-2 resize-none"
                        placeholder="Description"
                        ref={descRef}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="estate-adresse" className="w-48">
                        Adresse
                    </label>
                    <textarea
                        required
                        minLength={3}
                        id="estate-adresse"
                        rows={2}
                        className="grow border border-neutral-700 rounded-lg p-2 resize-none"
                        placeholder="Adresse ..."
                        ref={addressRef}
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
                        <span>Valider</span>
                    </button>
                </footer>
            </form>
        </Modal>
    );
};

export default NewEstate;
