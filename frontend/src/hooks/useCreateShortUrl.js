import { useState } from "react";


export function useCreateShortUrl() {
    const [shortUrl, setShortUrl] = useState(""); 

    async function createShortUrl(longUrl) {
        const customHeaders = new Headers(); 
        customHeaders.append("Content-Type", "application/json"); 
        customHeaders.append("Authorization", `Bearer ${localStorage.getItem("token")}`); 

        const requestOptions = {
            method: "POST",
            headers: customHeaders, 
            body: JSON.stringify({longUrl}) 
        }
        const response = await fetch("urls", requestOptions); 
        const body = await response.json(); 
        buildShortUrl(body.shortUrl);  
    }

    function buildShortUrl(shortUrl) {
        // todo: replace with domain name, make it more flexible by retrieving from .env 
        const urlFormatter = `http://localhost:3000/urls/${shortUrl}`
        setShortUrl(urlFormatter); 
    }

    return { createShortUrl, shortUrl }; 
}
