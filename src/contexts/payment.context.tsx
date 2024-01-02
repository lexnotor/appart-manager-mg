import useAuth from "@/hooks/useAuth";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useFirebaseContext } from "./firebase.context";
import {
    QueryDocumentSnapshot,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import { PaymentContextType, PaymentEntity } from "@/types";

const PaymentContext = createContext<PaymentContextType>({});

const PaymentContextProvider = ({ children }: { children: ReactNode }) => {
    const { status } = useAuth();
    const { db } = useFirebaseContext();
    const [filter, setFilter] = useState({});
    const [payments, setPayments] = useState<
        QueryDocumentSnapshot<PaymentEntity, PaymentEntity>[]
    >([]);

    const converter = useMemo(
        () => ({
            toFirestore: (payment: PaymentEntity) => {
                return payment;
            },
            fromFirestore: (
                snapshot: QueryDocumentSnapshot<PaymentEntity, PaymentEntity>,
            ) => {
                return snapshot.data();
            },
        }),
        [],
    );

    const paymentCollection = useMemo(
        () => (db ? collection(db, "payments").withConverter(converter) : null),
        [converter, db],
    );

    useEffect(() => {
        if (status != "CONNECTED") return;
        const q = query(paymentCollection, where("deleted_at", "==", null));

        const unsubscribe = onSnapshot(q, (querySnap) => {
            setPayments(querySnap.docs);
        });

        return () => unsubscribe();
    }, [status, paymentCollection]);

    return (
        <PaymentContext.Provider
            value={{ filter, setFilter, paymentCollection, payments }}
        >
            {children}
        </PaymentContext.Provider>
    );
};

const usePaymentContext = () => useContext(PaymentContext);

export { usePaymentContext, PaymentContextProvider };
