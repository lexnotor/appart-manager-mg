import { useFirebaseContext } from "@/contexts/firebase.context";

const useAuth = () => {
    const { auth, login, logout, status, signup } = useFirebaseContext();

    return { status, login, logout, auth, signup };
};

export default useAuth;
