import { useAppartContext } from "@/contexts/appart.context";
import { usePaymentContext } from "@/contexts/payment.context";
import { Modal } from "antd";
import { Timestamp, arrayRemove, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const DeletePayment = ({
    closeModal,
    payload,
}: {
    closeModal: () => any;
    payload: { paymentId: string };
}) => {
    const { payments } = usePaymentContext();
    const { apparts } = useAppartContext();

    const [loading, setLoading] = useState(false);
    const payment = payments.find((item) => item.id == payload.paymentId);
    const appart = payment
        ? apparts.find((item) => item.id == payment.data()?.appart?.id)
        : null;

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);
        updateDoc(payment.ref, { deleted_at: Timestamp.now() })
            .then(() => {
                const allPay = appart
                    .data()
                    .payments.filter((pay) => pay.id != payment.id);

                return updateDoc(appart.ref, {
                    payments: allPay,
                    paymentts_ref: arrayRemove(payment.ref),
                });
            })
            .then(() => closeModal())
            .catch()
            .finally(() => setLoading(false));
    };
    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">
                Supprimer Paiement
            </h1>
            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <div className="text-center">
                    Voulez-vous supprimer ce paiement ?
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
                        <span>Oui</span>
                    </button>
                </footer>
            </form>
        </Modal>
    );
};

export default DeletePayment;
