import { EstateContextType, EstateEntity } from "@/types";
import {
    QueryDocumentSnapshot,
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { useFirebaseContext } from "./firebase.context";
import useAuth from "@/hooks/useAuth";

const EstateContext = createContext<EstateContextType>({});

const EstateContextProvider = ({ children }: { children: ReactNode }) => {
    const { db } = useFirebaseContext();
    const { status, auth } = useAuth();

    const [estates, setEstates] = useState<
        QueryDocumentSnapshot<EstateEntity, EstateEntity>[]
    >([]);
    const [filter, setFilter] = useState({});

    const converter = useMemo(
        () => ({
            toFirestore: (estate: EstateEntity) => {
                return estate;
            },
            fromFirestore: (
                snapshot: QueryDocumentSnapshot<EstateEntity, EstateEntity>,
            ) => {
                return snapshot.data();
            },
        }),
        [],
    );

    const estateCollection = useMemo(
        () => (db ? collection(db, "estates").withConverter(converter) : null),
        [db, converter],
    );

    useEffect(() => {
        if (status != "CONNECTED") return;

        const q = query(
            estateCollection,
            where("deleted_at", "==", null),
            where("owner.id", "==", auth.currentUser.uid),
        );
        const unsubscribe = onSnapshot(q, (querySnap) => {
            setEstates(querySnap.docs);
        });

        return () => unsubscribe();
    }, [status, auth, estateCollection]);

    return (
        <EstateContext.Provider
            value={{ estates, filter, setFilter, estateCollection }}
        >
            {children}
        </EstateContext.Provider>
    );
};

const useEstateContext = () => useContext(EstateContext);

export { EstateContextProvider, useEstateContext };
