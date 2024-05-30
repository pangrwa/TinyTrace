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

        const response = await fetch('/auth/login', {
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
            setToken(json.jwt); 
            setIsLoading(false); 
            navigate("/"); 
        }
    }

    return { login, error, isLoading };
}   
