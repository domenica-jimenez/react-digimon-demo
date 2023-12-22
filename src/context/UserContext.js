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

// useAuth, get the information from the context.
export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error('There is no auth provider');
    return context;

}

export function UserContext({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // signup, signup whit email and password from Firebase.
    const signup = (email, password) =>
        createUserWithEmailAndPassword(auth, email, password);

    // login, login whit email and password from Firebase.
    const login = (email, password) => 
        signInWithEmailAndPassword(auth, email, password);

    // logout, logout from Firebase.
    const logout = () =>
        signOut(auth);

    // recoverPassword, send a mail for recover password from Firebase.
    const recoverPassword = (email) =>
        sendPasswordResetEmail(auth, email);

    // recoverPassword, send a mail for verify email from Firebase.
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