import { DimensionContextType } from "@/types";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const DimensionContext = createContext<DimensionContextType>({});

const DimensionContextProvider = ({ children }: { children: ReactNode }) => {
    const [{ screenX, screenY }, setScreenS] = useState({
        screenX: 0,
        screenY: 0,
    });
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const handleScheme = () => {
            if (!window.matchMedia) return;

            if (window.matchMedia("(prefers-color-scheme: dark)").matches)
                setIsDark(true);
            else setIsDark(false);
        };

        handleScheme();
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", handleScheme);

        return () =>
            window
                .matchMedia("(prefers-color-scheme: dark)")
                .removeEventListener("change", handleScheme);
    }, []);

    useEffect(() => {
        const handleSize = () => {
            setScreenS({
                screenX: window.innerWidth,
                screenY: window.innerHeight,
            });
        };

        handleSize();
        window.addEventListener("resize", handleSize);

        return () => window.removeEventListener("resize", handleSize);
    }, []);

    return (
        <DimensionContext.Provider value={{ screenX, screenY, isDark }}>
            {children}
        </DimensionContext.Provider>
    );
};

const useDimensionContext = () => useContext(DimensionContext);

export { DimensionContextProvider, useDimensionContext };
