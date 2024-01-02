import useAuth from "@/hooks/useAuth";
import { AppartContextType, AppartEntity } from "@/types";
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

const AppartContext = createContext<AppartContextType>({});

const AppartContextProvider = ({ children }: { children: ReactNode }) => {
    const { status, auth } = useAuth();
    const { db } = useFirebaseContext();
    const [apparts, setApparts] = useState<
        QueryDocumentSnapshot<AppartEntity, AppartEntity>[]
    >([]);

    const [filter, setFilter] = useState({});
    const converter = useMemo(
        () => ({
            toFirestore: (appart: AppartEntity) => {
                return appart;
            },
            fromFirestore: (
                snapshot: QueryDocumentSnapshot<AppartEntity, AppartEntity>,
            ) => {
                return snapshot.data() as AppartEntity;
            },
        }),
        [],
    );

    const appartCollection = useMemo(
        () => (db ? collection(db, "apparts").withConverter(converter) : null),
        [db, converter],
    );

    useEffect(() => {
        if (status != "CONNECTED") return;

        const q = query(
            appartCollection,
            where("deleted_at", "==", null),
            where("owner.id", "==", auth.currentUser.uid),
        );
        const unsubscribe = onSnapshot(q, (querySnap) => {
            setApparts(querySnap.docs);
        });

        return () => unsubscribe();
    }, [filter, status, db, converter, appartCollection, auth]);

    return (
        <AppartContext.Provider
            value={{ apparts, filter, setFilter, appartCollection }}
        >
            {children}
        </AppartContext.Provider>
    );
};

const useAppartContext = () => useContext(AppartContext);

export { AppartContextProvider, useAppartContext };
