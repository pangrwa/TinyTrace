import { useAuth } from "../contexts/AuthContext";
import { usePage } from "../contexts/PageContext";
import { useUrl } from "../contexts/UrlContext";

export function useLogout() {

    const { setToken } = useAuth(); 
    const { urls, urlDispatcher } = useUrl();
    const {
        totalPages, totalPagesDispatcher,
        currentPageNumber, currentPageNumberDispatcher,
    } = usePage(); 
    
    function logout() {
        setToken(''); 
        urlDispatcher({ type: 'FETCH_URLS', payload: [] });
        currentPageNumberDispatcher({ type: 'SET_CURRENT_PAGE_NUMBER', payload: 0 });
        totalPagesDispatcher({ type: 'SET_TOTAL_PAGES', payload: 0 });
    }

    return logout; 
}
