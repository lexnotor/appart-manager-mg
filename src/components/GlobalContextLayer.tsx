import { FirebaseContextProvider } from "@/contexts/firebase.context";
import { ReactNode } from "react";

const GlobalContextLayer = ({ children }: { children: ReactNode }) => {
    return <FirebaseContextProvider>{children}</FirebaseContextProvider>;
};

export default GlobalContextLayer;
