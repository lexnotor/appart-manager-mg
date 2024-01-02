import { useOccupantContext } from "@/contexts/occupant.context";
import { Modal } from "antd";
import { Timestamp, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const DeleteOccupant = ({
    closeModal,
    payload,
}: {
    closeModal: () => any;
    payload: { occupantId: string };
}) => {
    const { occupants } = useOccupantContext();

    const [loading, setLoading] = useState(false);
    const occupant = occupants.find((item) => item.id == payload.occupantId);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);
        updateDoc(occupant.ref, { deleted_at: Timestamp.now() })
            .then(() => closeModal())
            .catch()
            .finally(() => setLoading(false));
    };
    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">
                Supprimer Occupant
            </h1>
            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <div className="text-center">
                    Voulez-vous supprimer cet occupant ?
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

export default DeleteOccupant;
