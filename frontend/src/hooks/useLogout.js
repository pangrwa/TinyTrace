import { useAuth } from "../contexts/AuthContext";

export function useLogout() {

    const { setToken } = useAuth(); 
    
    function logout() {
        setToken(''); 
    }

    return logout; 
}
