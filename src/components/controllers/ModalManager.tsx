import { useModalContext } from "@/contexts/modal.context";
import React from "react";
import NewEstate from "../modal/NewEstate";

const NewAppart = React.lazy(() => import("../modal/NewAppart"));
const NewPayment = React.lazy(() => import("../modal/NewPayment"));
const NewOccupant = React.lazy(() => import("../modal/NewOccupant"));
const NewRent = React.lazy(() => import("../modal/NewRent"));
const EditAppart = React.lazy(() => import("../modal/EditAppart"));
const DeleteAppart = React.lazy(() => import("../modal/DeleteAppart"));
const DeleteOccupant = React.lazy(() => import("../modal/DeleteOccupant"));
const DeletePayment = React.lazy(() => import("../modal/DeletePayment"));

const ModalManager = () => {
    const { closeModal, modals } = useModalContext();

    switch (modals.modalId) {
        case "CREATE_APPART":
            return (
                <NewAppart closeModal={closeModal} payload={modals.payload} />
            );

        case "SAVE_PAYMENT":
            return (
                <NewPayment closeModal={closeModal} payload={modals.payload} />
            );

        case "ADD_OCCUPANT":
            return <NewOccupant closeModal={closeModal} />;

        case "NEW_RENT":
            return (
                <NewRent
                    closeModal={closeModal}
                    payload={modals.payload ?? {}}
                />
            );

        case "EDIT_APPART":
            return (
                <EditAppart closeModal={closeModal} payload={modals.payload} />
            );

        case "DELETE_APPART":
            return (
                <DeleteAppart
                    closeModal={closeModal}
                    payload={modals.payload}
                />
            );

        case "DELETE_OCCUPANT":
            return (
                <DeleteOccupant
                    closeModal={closeModal}
                    payload={modals.payload}
                />
            );

        case "DELETE_PAYMENT":
            return (
                <DeletePayment
                    closeModal={closeModal}
                    payload={modals.payload}
                />
            );

        case "CREATE_ESTATE":
            return <NewEstate closeModal={closeModal} />;

        default:
            null;
    }
};

export default ModalManager;
