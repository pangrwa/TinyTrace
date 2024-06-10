import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Url() {
    const location = useLocation(); 
    const [error, setError] = useState(null); 
    
    useEffect(() => {
        const fetchLongUrl = async() => {
            const pathname = location.pathname;  
            const shortUrlId = pathname.split("/")[2]; 
            try {
                const response = await fetch(`/api/urls/${shortUrlId}`); 
                const body = await response.json(); 
                
                if (!response.ok) {
                    setError(body.message); 
                } else { 
                    setError(null); 
                    window.location.href=body.longUrl;
                }
            } catch (e) {
                setError("Server is down. Please try again later.");
            }
        }
        fetchLongUrl(); 
    }, []); 

    return null; 
}
