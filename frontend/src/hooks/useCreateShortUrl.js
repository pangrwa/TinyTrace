import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUrl } from "../contexts/UrlContext";
import { useAuth } from "../contexts/AuthContext";


export function useCreateShortUrl() {
    const DEFAULT_PAGE_SIZE = 5; 

    const { token } = useAuth(); 
    const { urlDispatcher, totalPagesDispatcher } = useUrl(); 

    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false); 
    const [shortUrl, setShortUrl] = useState(""); 


    async function createShortUrl(longUrl, setCurrentPageNumber) {
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
            const pageNumber = Math.ceil(response.headers.get("X-Total-Count") / DEFAULT_PAGE_SIZE) - 1;  
            // prevent uncessary re-rendering from a different batch
            // dispatch({ type: "CREATE_URL", payload: body }); 
            
            // updates the URL state to the correct pagination
            const secondRequestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            const secondResponse = await fetch(`/api/urls?size=${DEFAULT_PAGE_SIZE}&page=${pageNumber}`, secondRequestOptions)
            const secondBody = await secondResponse.json(); 
            
            if (!secondResponse.ok) {
                setError(secondBody.message);
                setIsLoading(false); 
                return; 
            }
            setError(null); 
            setIsLoading(false); 
            let urls = []
            if (secondBody._embedded) {
                urls = secondBody._embedded.urls;
            }
            urlDispatcher({ type: 'FETCH_URLS', payload: urls }); 
            totalPagesDispatcher({ type: 'SET_TOTAL_PAGES', payload: secondBody.page.totalPages });
            setCurrentPageNumber(pageNumber); 
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
