import { useAuth } from "../contexts/AuthContext";

export function useLogin() {
    
    const { setToken } = useAuth();
    
    async function login(username, password) {
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
            // handle error 
        } else {
            setToken(json.jwt); 
        }
    }

    return login; 
}   
