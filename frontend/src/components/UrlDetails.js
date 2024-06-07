import { useState } from "react";
import { useUrl } from "../contexts/UrlContext";
import { useAuth } from "../contexts/AuthContext";

export default function UrlDetails({ url,setCurrentPageNumber }) {
    const DEFAULT_PAGE_SIZE = 5;
    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);

    const { token } = useAuth(); 
    const { urlDispatcher, totalPagesDispatcher } = useUrl(); 

    async function handleDelete() {
        setError(null); 
        setIsLoading(true); 
        try {
            const headerOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                } 
            }
            const response = await fetch(`/api/urls/${url.shortUrlId}`, headerOptions); 
            const body = await response.json(); 
            
            if (!response.ok) {
                setError(body.message);
                setIsLoading(false); 
                return; 
            }
            setError(null); 
            setIsLoading(false); 
            const pageNumber = Math.ceil(response.headers.get("X-Total-Count") / DEFAULT_PAGE_SIZE) - 1;    

            const secondRequestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const secondResponse = await fetch(`/api/urls?size=${DEFAULT_PAGE_SIZE}&page=${pageNumber}`, secondRequestOptions);
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
            
        } catch (e) {
            setError(e.message);
            setError("Server is down. Please try again later.");         }
    }    

    function buildUrl(shortUrlId) {
        return `${window.location.origin}/urls/${shortUrlId}`;
    }

    return (
        <div className="d-flex flex-column bg-light mx-3 my-3 rounded-1 p-4">
            <p className="mx-3 my-3">{url.longUrl}</p>
            <p className="mx-3 my-3">Short Url: <a href={url.longUrl}>{buildUrl(url.shortUrlId)}</a></p>
            <button className="btn btn-danger btn-sm px-2" onClick={handleDelete}>Delete</button>
            {error && <div className="error" disabled={isLoading}>{error}</div>}
        </div>
    )
}
