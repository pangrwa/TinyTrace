import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";


export default function PrivateRoute() {
    const { token } = useAuth();

    if (!token) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}
