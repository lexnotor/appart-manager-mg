import { AppartContextProvider } from "@/contexts/appart.context";
import { DimensionContextProvider } from "@/contexts/dimension.context";
import { FirebaseContextProvider } from "@/contexts/firebase.context";
import { ModalContextProvider } from "@/contexts/modal.context";
import { OccupantContextProvider } from "@/contexts/occupant.context";
import { PaymentContextProvider } from "@/contexts/payment.context";
import type { ReactNode } from "react";

const GlobalContextLayer = ({ children }: { children: ReactNode }) => {
    return (
        <FirebaseContextProvider>
            <DimensionContextProvider>
                <ModalContextProvider>
                    <AppartContextProvider>
                        <OccupantContextProvider>
                            <PaymentContextProvider>
                                {children}
                            </PaymentContextProvider>
                        </OccupantContextProvider>
                    </AppartContextProvider>
                </ModalContextProvider>
            </DimensionContextProvider>
        </FirebaseContextProvider>
    );
};

export default GlobalContextLayer;
