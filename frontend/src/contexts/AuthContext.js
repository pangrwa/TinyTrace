import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(); 

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');  

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token); 
        } else { // basically happens only if you logout 
            localStorage.removeItem('token');
        }
    }, [token]); 
    
    // might not be the best to useMemo here
    const contextValue = useMemo(
        () => ({
            token, setToken
        }), [token]
    )

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    ); 
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}
