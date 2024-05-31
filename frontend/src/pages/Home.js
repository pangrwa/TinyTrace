import { useState } from "react";
import { useCreateShortUrl } from "../hooks/useCreateShortUrl";
import { useLogout } from "../hooks/useLogout";

export default function Home() {

    const [longUrl, setLongUrl] = useState(""); 
    const { createShortUrl, shortUrl }= useCreateShortUrl(); 

    async function handleSubmit(e) {
        e.preventDefault(); 

        await createShortUrl(longUrl); 
    }

    return (
        <form className="generate-shortUrl" method="post" onSubmit={handleSubmit}>
            <h3>Generate shortUrl</h3>
            
            <label>LongUrl</label>
            <input type="text" placeholder="Enter longUrl" onChange={(e) => setLongUrl(e.target.value)} />

            <div>
                {shortUrl && (
                    <div>ShortUrl: <a href={shortUrl}>{shortUrl}</a></div>
                )}
            </div>

            <button>
                Generate 
            </button>
        </form>
    );
}
