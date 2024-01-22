import { DrawerData, ModalContextType, ModalData } from "@/types";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

const modalContext = createContext<ModalContextType>({});

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
    const [modals, setModals] = useState<ModalContextType["modals"]>({
        modalId: null,
        thread: [],
        payload: null,
    });

    const [drawers, setDrawers] = useState<ModalContextType["drawers"]>({
        drawerId: null,
        thread: [],
        payload: null,
    });

    const closeModal = useCallback(() => {
        setModals((old) => {
            if (!old?.modalId) return old;
            const thread = [...old.thread];
            const next = thread.pop();
            return {
                modalId: next?.modalId ?? null,
                payload: next?.payload ?? null,
                thread,
            };
        });
    }, []);
    const openModal = useCallback((data: ModalData) => {
        setModals((old) => {
            return {
                modalId: old?.modalId ? old?.modalId : data.modalId,
                payload: old?.modalId ? old?.payload : data.payload,
                thread: old?.modalId ? [...old.thread, data] : old?.thread,
            };
        });
    }, []);

    const closeDrawer = useCallback(() => {
        setDrawers((old) => {
            if (!old?.drawerId) return old;
            const thread = [...old.thread];
            const next = thread.pop();
            return {
                drawerId: next?.drawerId ?? null,
                payload: next?.payload ?? null,
                thread,
            };
        });
    }, []);
    const openDrawer = useCallback((data: DrawerData) => {
        setDrawers((old) => {
            return {
                drawerId: old?.drawerId ? old?.drawerId : data.drawerId,
                payload: old?.drawerId ? old?.payload : data.payload,
                thread: old?.drawerId ? [...old.thread, data] : old?.thread,
            };
        });
    }, []);

    return (
        <modalContext.Provider
            value={{
                closeModal,
                openModal,
                modals,
                closeDrawer,
                openDrawer,
                drawers,
            }}
        >
            {children}
        </modalContext.Provider>
    );
};

const useModalContext = () => useContext(modalContext);

export { ModalContextProvider, useModalContext };
