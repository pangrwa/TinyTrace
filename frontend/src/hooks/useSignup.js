import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export function useSignup() {

    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(null); 
    const { setToken } = useAuth();
    const navigate = useNavigate(); 

    async function signup(email, username, password) {
        try {
            const response = await fetch('api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify({ email, username, password }),
            }); 

            // contains the jwt
            const json = await response.json(); 

            if (!response.ok) {
                setIsLoading(false); 
                console.log(json); 
                setError(json.message); 
            } else {
                setError(null); 
                setToken(json.jwt); 
                navigate("/");  
            }
        } catch (e) {
            // server is probably down at this point
            // response body can't pe parsed into JSON
            setIsLoading(false); 
            setError("Server is down. Please try again later."); 
        }

    }

    return { signup, error, isLoading }; 
}
