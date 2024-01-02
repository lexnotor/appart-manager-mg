import { useAppartContext } from "@/contexts/appart.context";
import { useFirebaseContext } from "@/contexts/firebase.context";
import { usePaymentContext } from "@/contexts/payment.context";
import { PaymentEntity } from "@/types";
import { Modal } from "antd";
import {
    Timestamp,
    addDoc,
    arrayUnion,
    doc,
    updateDoc,
} from "firebase/firestore";
import React, { useRef, useState } from "react";

const NewPayment = ({
    closeModal,
    payload,
}: {
    closeModal: () => any;
    payload: { appartId: string };
}) => {
    const [loading, setLoading] = useState(false);
    const { apparts } = useAppartContext();
    const { paymentCollection } = usePaymentContext();
    const { db } = useFirebaseContext();
    const appart = (apparts ?? []).find(
        (appart) => appart.id == payload?.appartId,
    );
    const amountRef = useRef<HTMLInputElement>(null),
        unitRef = useRef<HTMLInputElement>(null),
        labelRef = useRef<HTMLInputElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        const payload: PaymentEntity = {
            amount: `${amountRef.current.value} ${unitRef.current.value}`,
            appart: {
                id: appart.id,
                ...appart.data(),
                payments: [],
                paymentts_ref: [],
                history: [],
            },
            appart_ref: doc(db, "apparts/" + appart.id) as any,
            occupant: {
                ...appart?.data().occupant,
                id:
                    appart?.data()?.occupant_ref?.id ??
                    appart?.data()?.occupant?.id,
            },
            occupant_ref: appart?.data().occupant_ref,
            date: new Date().toISOString(),
            label: labelRef.current.value,
            updated_at: Timestamp.now(),
            created_at: Timestamp.now(),
            deleted_at: null,
        };

        setLoading(true);
        addDoc(paymentCollection, payload)
            .then((ref) =>
                updateDoc(appart.ref, {
                    payments: arrayUnion({ id: ref.id, ...payload }),
                }),
            )
            .then(() => {
                closeModal();
            })
            .catch()
            .finally(() => setLoading(false));
    };

    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">
                Enregistrer paiement
            </h1>

            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-name" className="w-48">
                        Appartement
                    </label>
                    <input
                        type="text"
                        required
                        disabled={!!appart}
                        minLength={3}
                        id="new-appart-name"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="Appartement"
                        defaultValue={
                            appart
                                ? `${appart?.data().title} (${appart.id})`
                                : ""
                        }
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-name" className="w-48">
                        Montant
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            required
                            min={0}
                            id="new-appart-price"
                            className="grow border border-neutral-700 rounded-lg p-2"
                            placeholder={appart ? appart.data().price + "" : ""}
                            defaultValue={
                                appart ? appart.data().price + "" : ""
                            }
                            ref={amountRef}
                        />
                        <input
                            type="text"
                            required
                            minLength={3}
                            id="appart-unit"
                            className="cursor-not-allowed w-[7rem] border border-neutral-700 rounded-lg p-2"
                            placeholder="USD"
                            defaultValue={
                                appart ? appart.data().price_unit : "USD"
                            }
                            ref={unitRef}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-name" className="w-48">
                        Occupant
                    </label>
                    <input
                        type="text"
                        required
                        minLength={3}
                        id="new-appart-name"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="Occupants"
                        defaultValue={`${
                            appart ? appart?.data().occupant?.nom : ""
                        }`}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-label" className="w-48">
                        Libellé
                    </label>
                    <input
                        type="text"
                        minLength={3}
                        id="new-appart-label"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="Paiement mois de Novembre"
                        ref={labelRef}
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
                        <span>Enregistrer</span>
                    </button>
                </footer>
            </form>
        </Modal>
    );
};

export default NewPayment;
