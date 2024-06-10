import { useEffect } from "react";
import { useUrl } from "../contexts/UrlContext";
import UrlDetails from "./UrlDetails";
import { useFetchShortUrl } from "../hooks/useFetchShortUrls";

export default function UrlTable() {


    const { urls } = useUrl();
    const { fetchShortUrls, error } = useFetchShortUrl();


    useEffect(() => {
        fetchShortUrls(); 
    }, [fetchShortUrls]); 


    return (
            <div className="d-flex flex-column">
                {!error && urls && urls.map((url) => (
                        // work around till i expose ID in backend
                        <UrlDetails key={url.shortUrlId} url={url} />
                    ))}
                {error && <div className="error">{error}</div>}
            </div>

    )
}
