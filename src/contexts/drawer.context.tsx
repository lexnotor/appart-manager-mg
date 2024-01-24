import { DrawerContextType, DrawerData } from "@/types";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";

const drawerContext = createContext<DrawerContextType>({});

const DrawerContextProvider = ({ children }: { children: ReactNode }) => {
    const [drawers, setDrawers] = useState<DrawerContextType["drawers"]>({
        drawerId: null,
        thread: [],
        payload: null,
    });

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
        <drawerContext.Provider
            value={{
                closeDrawer,
                openDrawer,
                drawers,
            }}
        >
            {children}
        </drawerContext.Provider>
    );
};
const useDrawerContext = () => useContext(drawerContext);

export { DrawerContextProvider, useDrawerContext };
