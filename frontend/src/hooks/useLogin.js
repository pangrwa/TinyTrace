import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

export function useLogin() {
    
    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(null); 

    const { setToken } = useAuth();
    const navigate = useNavigate(); 
    
    async function login(username, password) {
        setIsLoading(true); 
        setError(null); 
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            }); 
            // contains the jwt
            const json = await response.json(); 

            if (!response.ok) {
                setIsLoading(false); 
                setError(json.message); 
            } else {
                setError(null); 
                setToken(json.jwt); 
                setIsLoading(false); 
                navigate("/"); 
            }
        } catch (e) {
            // server is probably down at this point
            // response body can't pe parsed into JSON
            setIsLoading(false); 
            setError("Server is down. Please try again later."); 
        }
        
    }

    return { login, error, isLoading };
}   
