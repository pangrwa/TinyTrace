import { useEffect, useState } from "react";
import UrlForm from "../components/UrlForm";
import { useAuth } from "../contexts/AuthContext";
import UrlDetails from "../components/UrlDetails";
import { useUrl } from "../contexts/UrlContext";

export default function Home() {

    const { token } = useAuth(); 
    const [error, setError] = useState(null); 
    const { urls, dispatch } = useUrl(); 
    
    useEffect(() => {
        const fetchUrls = async() => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }; 
            try {
                const response = await fetch('/api/urls', requestOptions)
                const body = await response.json(); 
                
                if (!response.ok) {
                    setError(body.message); 
                } else {
                    // not sure what the field is actually
                    let res = [] 
                    if (body._embedded){
                        res = body._embedded.urls;
                    }
                    dispatch({ type: "FETCH_URLS", payload: res })
                    setError(null);
                }
            } catch(e) {
                setError("Server is down. Please try again later."); 
            }
        }
        if (token) {
            fetchUrls(); 
        }
    }, [dispatch]); // should refetch when a new token is set, probs need use dispatcher

    return (
        <div className="home-page">
            <div className="urls">
                {!error && urls && urls.map((url) => (
                    // work around till i expose ID in backend
                    <UrlDetails key={url.shortUrlId} url={url} />
                ))}
                {error && <div className="error">{error}</div>}
            </div>
            <UrlForm />
        </div>
    );
}
