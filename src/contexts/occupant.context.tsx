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
import { OccupantContextType, OccupantEntity } from "@/types";
import useAuth from "@/hooks/useAuth";

const OccupantContext = createContext<OccupantContextType>({});

const OccupantContextProvider = ({ children }: { children: ReactNode }) => {
    const { status } = useAuth();
    const { db } = useFirebaseContext();
    const [filter, setFilter] = useState({});
    const [occupants, setOccupant] = useState<
        QueryDocumentSnapshot<OccupantEntity, OccupantEntity>[]
    >([]);

    const converter = useMemo(
        () => ({
            toFirestore: (occupant: OccupantEntity) => {
                return occupant;
            },
            fromFirestore: (
                snapshot: QueryDocumentSnapshot<OccupantEntity, OccupantEntity>,
            ) => {
                return snapshot.data();
            },
        }),
        [],
    );

    const occupantCollection = useMemo(
        () =>
            db ? collection(db, "occupants").withConverter(converter) : null,
        [db, converter],
    );

    useEffect(() => {
        if (status != "CONNECTED") return;
        const q = query(occupantCollection, where("deleted_at", "==", null));
        const unsubscribe = onSnapshot(q, (querySnap) => {
            setOccupant(querySnap.docs);
        });

        return () => unsubscribe();
    }, [status, occupantCollection]);

    return (
        <OccupantContext.Provider
            value={{ occupants, filter, setFilter, occupantCollection }}
        >
            {children}
        </OccupantContext.Provider>
    );
};

const useOccupantContext = () => useContext(OccupantContext);

export { OccupantContextProvider, useOccupantContext };
