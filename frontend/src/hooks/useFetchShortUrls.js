import { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUrl } from "../contexts/UrlContext";
import { usePage } from "../contexts/PageContext";

export function useFetchShortUrl() {
    const { token } = useAuth(); 
    const { urlDispatcher } = useUrl(); 
    const { 
        currentPageNumber,
        totalPagesDispatcher,
        DEFAULT_PAGE_SIZE
    } = usePage();  

    const [error, setError] = useState(null); 

    /*
    pageNumber as a parameter instead of retreiving from context because 
    we want the updated pageNumber before the re-rendering of the component.
    If not given, use the currentPageNumber
    */
    const fetchShortUrls = useCallback(async (pageNumber = currentPageNumber) => {
        console.log("Fetching: ", pageNumber);
        setError(null); 

        try {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            const response = await fetch(
                `/api/urls?size=${DEFAULT_PAGE_SIZE}&page=${pageNumber}`,
            requestOptions);
            const body = await response.json(); 

            if (!response.ok) {
                setError(body.message); 
            } else {
                let urls = []
                if (body._embedded) {
                    urls = body._embedded.urls;
                }
                urlDispatcher({ type: 'FETCH_URLS', payload: urls });
                totalPagesDispatcher({
                    type: 'SET_TOTAL_PAGES',
                    payload: body.page.totalPages
                });
                setError(null); 
            }
        } catch (e) {
            // server is probably down at this point
            // response body can't pe parsed into JSON
            setError("Server is down. Please try again later.");         }
    }, [token, currentPageNumber, DEFAULT_PAGE_SIZE, urlDispatcher, totalPagesDispatcher]); 

    return {fetchShortUrls, error}; 
}
