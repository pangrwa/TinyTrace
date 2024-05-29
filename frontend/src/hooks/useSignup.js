import { useAuth } from "../contexts/AuthContext";


export function useSignup() {

    const { setToken } = useAuth();

    async function signup(email, username, password) {

        const response = await fetch('auth/signup', {
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
        }
    }

    return signup ; 
}
