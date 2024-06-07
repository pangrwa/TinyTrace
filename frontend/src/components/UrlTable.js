import { useEffect } from "react";
import { useUrl } from "../contexts/UrlContext";
import UrlDetails from "./UrlDetails";
import { useFetchShortUrl } from "../hooks/useFetchShortUrls";

export default function UrlTable() {


    const { urls } = useUrl();
    const { fetchShortUrls, error } = useFetchShortUrl();


    useEffect(() => {
        fetchShortUrls(); 
        console.log("testing");
    }, [fetchShortUrls]); 


    return (
            <>
                {!error && urls && urls.map((url) => (
                        // work around till i expose ID in backend
                        <UrlDetails key={url.shortUrlId} url={url} />
                    ))}
                {error && <div className="error">{error}</div>}
            </>
    )
}
