import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useUrl } from "../contexts/UrlContext";
import { isExpired, decodeToken } from "react-jwt";


export default function PrivateRoute() {
    const { token } = useAuth();
    const { dispatch } = useUrl(); 
    const navigate = useNavigate();  
    const decodedToken = decodeToken(token); 
    const isMyTokenExpired = isExpired(token);

    useEffect(() => {
        let timerRef = null; 

        const onExpire = () => {
            alert("Your session has expired. Please login again.")
            navigate("/"); 
        }

        // seems sketchy 
        if (!decodedToken) {
            return; 
        }
        const currentTime = (new Date()).getTime(); 
        const expiryTime = decodedToken.exp * 1000 - currentTime; 
        if (expiryTime > 0) {
            timerRef = setTimeout(onExpire, expiryTime);  
        } else {
            onExpire(); 
        }
        return () => {
            clearTimeout(timerRef); 
        }
    }, [dispatch, token])

    if (!token || isMyTokenExpired) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}
