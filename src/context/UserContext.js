import { createContext, useContext, useEffect, useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is no auth provider');
    return context;

}

export function UserContext({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    const login = (email, password) => 
        signInWithEmailAndPassword(auth, email, password);

    const logout = () =>
        signOut(auth);

    const recoverPassword = (email) =>
        sendPasswordResetEmail(auth, email);

    const verifiedEmail = (user) =>
        sendEmailVerification(user);

    useEffect(() => {
        onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
    }, []);

    return (
        <authContext.Provider value={{ signup, login, logout, recoverPassword, verifiedEmail, user, loading }}>
            {children}
        </authContext.Provider>
    );
}