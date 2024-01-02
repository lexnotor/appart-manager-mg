import { useAppartContext } from "@/contexts/appart.context";
import { Modal } from "antd";
import { updateDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";

const EditAppart = ({
    closeModal,
    payload,
}: {
    closeModal: () => any;
    payload: { appartId: string };
}) => {
    const [loading, setLoading] = useState(false);
    const { apparts } = useAppartContext();

    const titleRef = useRef<HTMLInputElement>(null),
        priceRef = useRef<HTMLInputElement>(null),
        unitRef = useRef<HTMLInputElement>(null),
        descRef = useRef<HTMLTextAreaElement>(null);

    const appart = apparts.find((item) => item.id == payload.appartId);

    const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        setLoading(true);
        updateDoc(appart.ref, {
            description: descRef.current.value,
            price_unit: unitRef.current.value,
            price: +priceRef.current.value,
            title: titleRef.current.value,
        })
            .then(() => closeModal())
            .catch()
            .finally(() => setLoading(false));
    };

    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">
                Editer Appartement
            </h1>
            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-name" className="w-48">
                        Designation
                    </label>
                    <input
                        type="text"
                        required
                        minLength={3}
                        maxLength={40}
                        id="new-appart-name"
                        className="grow border border-neutral-700 rounded-lg p-2"
                        placeholder="Designation"
                        ref={titleRef}
                        defaultValue={appart.data().title}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-price" className="basis-full">
                        Prix
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            required
                            min={0}
                            id="new-appart-price"
                            className="grow border border-neutral-700 rounded-lg p-2"
                            placeholder="130"
                            ref={priceRef}
                            defaultValue={appart.data().price}
                        />
                        <input
                            type="text"
                            required
                            minLength={3}
                            id="new-appart-unit"
                            className="w-[7rem] border border-neutral-700 rounded-lg p-2"
                            placeholder="USD"
                            ref={unitRef}
                            defaultValue={appart.data().price_unit}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label htmlFor="new-appart-name" className="w-48">
                        Description
                    </label>
                    <textarea
                        required
                        minLength={3}
                        id="new-appart-desc"
                        rows={4}
                        className="grow border border-neutral-700 rounded-lg p-2 resize-none"
                        placeholder="Description"
                        ref={descRef}
                        defaultValue={appart.data().description}
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
                        <span>Enregitrer</span>
                    </button>
                </footer>
            </form>
        </Modal>
    );
};

export default EditAppart;
