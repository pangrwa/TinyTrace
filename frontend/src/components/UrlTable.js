import { useEffect, useState } from "react";
import { useUrl } from "../contexts/UrlContext";
import { useAuth } from "../contexts/AuthContext";
import UrlDetails from "./UrlDetails";

export default function UrlTable( { currentPageNumber }) {

    const DEFAULT_PAGE_SIZE = 5; 
    const { token } = useAuth(); 
    const { 
        urls, urlDispatcher,
        totalPages, totalPagesDispatcher 
     } = useUrl();

    const [error, setError] = useState(null); 


    useEffect(() => {
        async function fetchUrls() {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            try {
                const response = await fetch(
                    `/api/urls?size=${DEFAULT_PAGE_SIZE}&page=${currentPageNumber}`, requestOptions
                ) ;

                const body = await response.json();
                
                if (!response.ok) {
                    setError(body.message); 
                } else {
                    let urls = []
                    if (body._embedded) {
                        urls = body._embedded.urls;
                    }
                    setError(null); 
                    urlDispatcher({ type: 'FETCH_URLS', payload: urls });
                    totalPagesDispatcher({ type: 'SET_TOTAL_PAGES', payload: body.page.totalPages })
                }
            } catch (e) {
                setError("Server is down. Please try again later."); 
            }
        }

        fetchUrls(); 
    }, [currentPageNumber, urlDispatcher, totalPagesDispatcher, token]);  

    console.log(totalPages); 
    return (
            <div className="urls">
                {!error && urls && urls.map((url) => (
                    // work around till i expose ID in backend
                    <UrlDetails key={url.shortUrlId} url={url} />
                ))}
                {error && <div className="error">{error}</div>}
            </div>
    )
}
