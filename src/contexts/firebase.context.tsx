import { FirebaseContextType } from "@/types";
import { FirebaseApp, initializeApp } from "firebase/app";
import {
    Auth,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { Firestore, doc, getFirestore, setDoc } from "firebase/firestore";
import { FirebaseStorage, getStorage } from "firebase/storage";
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

const firebaseContext = createContext<FirebaseContextType>({});

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
};

const FirebaseContextProvider = ({ children }: { children: ReactNode }) => {
    const [firebase, setFirebase] = useState<FirebaseApp>(null);
    const [auth, setFireauth] = useState<Auth>(null);
    const [db, setFirestore] = useState<Firestore>(null);
    const [storage, setStorage] = useState<FirebaseStorage>(null);
    const [status, setStatus] =
        useState<FirebaseContextType["status"]>("LOADING");

    const login = useCallback(
        (email: string, psw: string) => {
            if (!auth) return;
            setStatus("LOADING");
            signInWithEmailAndPassword(auth, email, psw).catch(() =>
                setStatus("DISCONNECTED"),
            );
        },
        [auth],
    );

    const signup = useCallback(
        (email: string, psw: string) => {
            if (!auth) return;
            setStatus("LOADING");
            createUserWithEmailAndPassword(auth, email, psw)
                .then((cred) => {
                    setDoc(doc(db, "users", cred?.user?.uid), {
                        email: cred?.user?.email,
                    });
                })
                .catch(() => {
                    setStatus("DISCONNECTED");
                });
        },
        [auth, db],
    );

    const logout = useCallback(() => {
        if (!auth) return;
        setStatus("LOADING");
        signOut(auth).catch(() => setStatus("DISCONNECTED"));
    }, [auth]);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const app_auth = getAuth(app);
        setFirebase(app);
        setFireauth(app_auth);
        setFirestore(getFirestore(app));
        setStorage(getStorage(app));

        // setStatus(app_auth?.currentUser ? "CONNECTED" : "DISCONNECTED");

        const unsubscribe = onAuthStateChanged(
            app_auth,
            (user) => setStatus(user ? "CONNECTED" : "DISCONNECTED"),
            () => setStatus("DISCONNECTED"),
        );

        return () => unsubscribe();
    }, []);

    return (
        <firebaseContext.Provider
            value={{
                firebase,
                auth,
                db,
                storage,
                status,
                login,
                logout,
                signup,
            }}
        >
            {children}
        </firebaseContext.Provider>
    );
};

const useFirebaseContext = () => useContext(firebaseContext);

export { FirebaseContextProvider, useFirebaseContext };
