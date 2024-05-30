import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


export function useSignup() {

    const { setToken } = useAuth();
    const navigate = useNavigate(); 

    async function signup(email, username, password) {

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
            // handle the errors
        } else {
            setToken(json.jwt); 
            navigate("/");  
        }
    }

    return signup ; 
}
