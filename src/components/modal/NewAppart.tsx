import { useAppartContext } from "@/contexts/appart.context";
import { useEstateContext } from "@/contexts/estate.context";
import { useFirebaseContext } from "@/contexts/firebase.context";
import { AppartEntity } from "@/types";
import { Modal, Select } from "antd";
import { Timestamp, addDoc, doc } from "firebase/firestore";
import React, { useRef, useState } from "react";

const NewAppart = ({
    closeModal,
    payload,
}: {
    closeModal: () => any;
    payload: { estateId?: string };
}) => {
    const { db, auth } = useFirebaseContext();

    const [loading, setLoading] = useState(false);
    const { appartCollection } = useAppartContext();
    const { estates } = useEstateContext();

    const estate = estates.find((item) => item.id == payload?.estateId);

    const titleRef = useRef<HTMLInputElement>(null),
        estateRef = useRef<{ value: string }>({
            value: estate?.id ?? "none",
        }),
        priceRef = useRef<HTMLInputElement>(null),
        unitRef = useRef<HTMLInputElement>(null),
        descRef = useRef<HTMLTextAreaElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const estate = estates.find(
            (item) => item?.id == estateRef.current?.value,
        );
        if (!estate) return;

        const payload: AppartEntity = {
            title: titleRef.current.value,
            price: +(priceRef.current.value || 0),
            price_unit: unitRef.current.value || "USD",
            description: descRef.current.value,
            owner_ref: doc(db, "users/" + auth?.currentUser?.uid) as any,
            owner: {
                id: auth?.currentUser?.uid,
                email: auth.currentUser.email,
            },
            estate: {
                id: estate.id,
                ...estate.data(),
            },
            estate_ref: doc(db, "estates/" + estate.id) as any,
            occupant: null,
            occupant_ref: null,
            history: [],
            payments: [],
            paymentts_ref: [],
            created_at: Timestamp.now(),
            updated_at: Timestamp.now(),
            deleted_at: null,
        };
        setLoading(true);

        addDoc(appartCollection, payload)
            .then(() => {
                closeModal();
            })
            .catch()
            .finally(() => setLoading(false));
    };

    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">
                Nouvel Appartement
            </h1>
            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <Select
                    showSearch
                    placeholder="Choisir propriété ..."
                    onChange={(value) => {
                        estateRef.current.value = value;
                    }}
                    filterOption={(input, option) =>
                        (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    defaultValue={estate?.id ?? "none"}
                    options={[
                        {
                            label: "Choisir Propriété ...",
                            value: "none",
                        },
                        ...estates.map((item) => ({
                            value: item.id,
                            label: item.data().title,
                        })),
                    ]}
                    size="large"
                    className=""
                />

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
                        />
                        <input
                            type="text"
                            required
                            minLength={3}
                            id="new-appart-unit"
                            className="w-[7rem] border border-neutral-700 rounded-lg p-2"
                            placeholder="USD"
                            ref={unitRef}
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

export default NewAppart;
