import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../contexts/UrlContext";


export function useCreateShortUrl() {
    const [error, setError] = useState(""); 
    const [isLoading, setIsLoading] = useState(false); 
    const [shortUrl, setShortUrl] = useState(""); 
    const { dispatch } = useUrl(); 

    const navigate = useNavigate(); 

    async function createShortUrl(longUrl) {
        const customHeaders = new Headers(); 
        customHeaders.append("Content-Type", "application/json"); 
        customHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`); 

        const requestOptions = {
            method: "POST",
            headers: customHeaders, 
            body: JSON.stringify({longUrl}) 
        }
        try {
            const response = await fetch("api/urls", requestOptions); 

            const body = await response.json(); 
            if (!response.ok) {
                setIsLoading(false); 
                setError(body.message); 
            } else {
                setError(""); 
                setIsLoading(false); 
                buildShortUrl(body.shortUrlId);  
                dispatch({ type: "CREATE_URL", payload: body }); 
                navigate("/"); 
            }
        } catch(e) {
            // server is probably down at this point
            // response body can't pe parsed into JSON
            setIsLoading(false); 
            setError("Server is down. Please try again later."); 
        }
    }

    function buildShortUrl(shortUrlId) {
        // todo: replace with domain name, make it more flexible by retrieving from .env 
        const urlFormatter = `http://localhost:3000/urls/${shortUrlId}`
        setShortUrl(urlFormatter); 
    }

    return { createShortUrl, shortUrl, error, isLoading }; 
}
