import { useState } from "react";
import { useFetchShortUrl } from "./useFetchShortUrls";
import { usePage } from "../contexts/PageContext";


export function useCreateShortUrl() {
    const DEFAULT_PAGE_SIZE = 5; 

    const {
        currentPageNumberDispatcher,
    } = usePage(); 
    const { fetchShortUrls } = useFetchShortUrl(); 

    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 
    const [shortUrl, setShortUrl] = useState(""); 


    async function createShortUrl(longUrl) {
        setIsLoading(true); 
        setError(null); 
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
                return;
            } 
            setError(null); 
            setIsLoading(false); 
            buildShortUrl(body.shortUrlId);  
            console.log(body); 
            console.log(response.headers.get("X-Total-Count"));
            const pageNumber = Math.ceil(response.headers.get("X-Total-Count") / DEFAULT_PAGE_SIZE) - 1;  
            // prevent uncessary re-rendering from a different batch
            // dispatch({ type: "CREATE_URL", payload: body }); 
            
            // updates the URL state to the correct pagination
            fetchShortUrls(pageNumber);
            currentPageNumberDispatcher({ type: "SET_CURRENT_PAGE_NUMBER", payload: pageNumber }); 
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
