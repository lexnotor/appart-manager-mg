import { ModalContextType, ModalData } from "@/types";
import { ReactNode, createContext, useContext, useState } from "react";

const modalContext = createContext<ModalContextType>({});

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalContextType["modals"]>({
        modalId: null,
        thread: [],
        payload: null,
    });

    const closeModal = () => {
        if (!modals?.modalId) return;

        setModals((old) => {
            const thread = [...old.thread];
            const next = thread.pop();
            return {
                modalId: next?.modalId ?? null,
                payload: next?.payload ?? null,
                thread,
            };
        });
    };
    const openModal = (data: ModalData) => {
        setModals((old) => {
            return {
                modalId: old?.modalId ? old?.modalId : data.modalId,
                payload: old?.modalId ? old?.payload : data.payload,
                thread: old?.modalId ? [...old.thread, data] : old?.thread,
            };
        });
    };

    return (
        <modalContext.Provider value={{ closeModal, openModal, modals }}>
            {children}
        </modalContext.Provider>
    );
};

const useModalContext = () => useContext(modalContext);

export { ModalContextProvider, useModalContext };
