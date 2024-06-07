import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useFetchShortUrl } from "../hooks/useFetchShortUrls";
import { usePage } from "../contexts/PageContext";

export default function UrlDetails({ url }) {
    const [error, setError] = useState(null); 
    const [isLoading, setIsLoading] = useState(false);
    const { fetchShortUrls } = useFetchShortUrl();

    const { token } = useAuth(); 
    const {
        currentPageNumber, currentPageNumberDispatcher,
        DEFAULT_PAGE_SIZE
    } = usePage(); 
    

    async function handleDelete() {
         const result = window.confirm("Are you sure you want to delete this URL?"); 
        if (!result) {
            return ;
        }

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
            const totalPagesRemaining = Math.ceil(response.headers.get("X-Total-Count") / DEFAULT_PAGE_SIZE) - 1;    
            const pageNumber = Math.min(currentPageNumber, totalPagesRemaining);

            fetchShortUrls(pageNumber); 
            currentPageNumberDispatcher({ type: "SET_CURRENT_PAGE_NUMBER", payload: pageNumber });

        } catch (e) {
            setError(e.message);
            setError("Server is down. Please try again later.");
        }
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
