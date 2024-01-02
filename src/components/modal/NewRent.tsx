import { useAppartContext } from "@/contexts/appart.context";
import { useFirebaseContext } from "@/contexts/firebase.context";
import { useOccupantContext } from "@/contexts/occupant.context";
import useAuth from "@/hooks/useAuth";
import { AppartEntity } from "@/types";
import { Modal } from "antd";
import {
    Timestamp,
    addDoc,
    arrayUnion,
    doc,
    getDoc,
    updateDoc,
} from "firebase/firestore";
import React, { useRef, useState } from "react";

const NewRent = ({
    closeModal,
    payload,
}: {
    closeModal: () => any;
    payload: { appartId?: string; occupantId?: string };
}) => {
    const [loading, setLoading] = useState(false);
    const [isNewOccupant, setIsNew] = useState(false);
    const { occupants, occupantCollection } = useOccupantContext();
    const { apparts } = useAppartContext();
    const { db } = useFirebaseContext();
    const { auth } = useAuth();

    const occupant = occupants.find((item) => item.id == payload?.occupantId);
    const appart = apparts.find((item) => item.id == payload?.appartId);

    const occupantSelRef = useRef<HTMLSelectElement>(null);
    const occupantInpRef = useRef<HTMLInputElement>(null);

    const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!isNewOccupant && occupantSelRef.current.value == "none") return;

        const newOccupant = isNewOccupant
            ? await addDoc(occupantCollection, {
                  nom: occupantInpRef.current.value,
                  email: null,
                  phone: null,
                  created_at: Timestamp.now(),
                  updated_at: Timestamp.now(),
                  deleted_at: null,
                  owner: auth.currentUser.uid,
              })
            : doc(db, "occupants/" + occupantSelRef.current.value);

        setLoading(true);
        updateDoc<AppartEntity, AppartEntity>(appart.ref as any, {
            updated_at: Timestamp.now(),
            occupant: {
                id: newOccupant.id,
                ...(await getDoc(newOccupant)).data(),
            },
            occupant_ref: newOccupant,
            history: arrayUnion({
                id: newOccupant?.id,
                ...(await getDoc(newOccupant)).data(),
                from: new Date().toISOString(),
                to: null,
            }),
        })
            .then(() => closeModal())
            .catch()
            .finally(() => setLoading(false));
    };

    return (
        <Modal open footer={false} destroyOnClose onCancel={closeModal}>
            <h1 className="text-center text-xl font-bold">Louer Appartement</h1>

            <form
                onSubmit={submit}
                className="flex flex-col gap-4 mt-6 mx-auto"
            >
                <div className="flex flex-col gap-2">
                    <label htmlFor="appart-name" className="w-48">
                        Appartement
                    </label>
                    <input
                        type="text"
                        required
                        disabled={!!appart}
                        minLength={3}
                        id="appart-name"
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
                    <label htmlFor="appart-name" className="w-48">
                        Occupant
                    </label>
                    {isNewOccupant ? (
                        <>
                            <input
                                type="text"
                                required
                                minLength={3}
                                id="occupant-name"
                                className="grow border border-neutral-700 rounded-lg p-2"
                                placeholder="Nom de l'occupant"
                                ref={occupantInpRef}
                                defaultValue={
                                    occupant
                                        ? `${occupant?.data().nom} (${
                                              occupant.id
                                          })`
                                        : ""
                                }
                            />
                            <div className="flex justify-end gap-2">
                                <input
                                    type="checkbox"
                                    id="is-new"
                                    checked={isNewOccupant}
                                    onChange={() => setIsNew((old) => !old)}
                                />
                                <label htmlFor="is-new">Nouvel occupant</label>
                            </div>
                        </>
                    ) : (
                        <select
                            className=""
                            onChange={(e) =>
                                e.target.value == "new" ? setIsNew(true) : null
                            }
                            ref={occupantSelRef}
                            defaultValue={occupant?.id ?? "none"}
                        >
                            <option value={"none"}>Choisir Occupant ...</option>
                            <option value={"new"} selected={false}>
                                Nouvel occupant
                            </option>
                            {occupants.map((item) => (
                                <option key={item.id} value={item?.id}>
                                    {item.data().nom}
                                </option>
                            ))}
                        </select>
                    )}
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

export default NewRent;
