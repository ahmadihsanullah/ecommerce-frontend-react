import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/signin" replace={true} />
    }

    return children;
}

export default ProtectedRoute;

