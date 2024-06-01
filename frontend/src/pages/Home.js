import { useEffect, useState } from "react";
import UrlForm from "../components/UrlForm";
import { useAuth } from "../contexts/AuthContext";
import UrlDetails from "../components/UrlDetails";

export default function Home() {

    const { token } = useAuth(); 
    const [error, setError] = useState(null); 
    const [urls, setUrls] = useState([]); 
    
    useEffect(() => {
        const fetchUrls = async() => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Beare ${token}`
                }
            }; 
            try {
                const response = await fetch('api/urls/users/', requestOptions)
                const body = await response.json(); 
                
                if (!response.ok) {
                    setError(body.message); 
                } else {
                    // not sure what the field is actually
                    setUrls(body.urls); 
                    setError(null);
                }
            } catch(e) {
                setError("Server is done. Please try again later."); 
            }
        }

        if (token) {
            fetchUrls(); 
        }
    }, [token]); 

    return (
        <div className="home-page">
            <div className="urls">
                {!error && urls && urls.map((url) => (
                    <UrlDetails key={url.id} url={url} />
                ))}
                {error && <div className="error">{error}</div>}
            </div>
            <UrlForm />
        </div>
    );
}
