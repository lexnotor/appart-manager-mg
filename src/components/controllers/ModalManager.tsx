import { useModalContext } from "@/contexts/modal.context";
import NewAppart from "../modal/NewAppart";
import NewPayment from "../modal/NewPayment";
import NewOccupant from "../modal/NewOccupant";
import NewRent from "../modal/NewRent";

const ModalManager = () => {
    const { closeModal, modals } = useModalContext();

    switch (modals.modalId) {
        case "CREATE_APPART":
            return <NewAppart closeModal={closeModal} />;

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

        default:
            null;
    }
};

export default ModalManager;
