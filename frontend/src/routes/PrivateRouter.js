import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { isExpired, decodeToken } from "react-jwt";
import { useUrl } from "../contexts/UrlContext";
import { useLogout } from "../hooks/useLogout";


export default function PrivateRoute() {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();  
    const { logout } = useLogout(); 

    const decodedToken = decodeToken(token); 
    const isMyTokenExpired = isExpired(token);

    useEffect(() => {
        let timerRef = null; 

        const onExpire = () => {
            alert("Your session has expired. Please login again.")
            logout(); 
            navigate("/"); 
        }

        // if token is not present, no point setting a timer 
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
    }, [navigate, setToken, decodedToken])

    if (!token || isMyTokenExpired) {
        return <Navigate to="/login" />
    }
    return <Outlet />
}
