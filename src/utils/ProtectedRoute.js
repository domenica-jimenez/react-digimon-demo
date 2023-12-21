import { useAuth } from "../context/UserContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({children}) {
    const {user, loading} = useAuth();

    if (loading) return <div>Loading...</div>
    if (!user) return <Navigate to={'/login'}/>

    return <>{children}</>
}