
import { useState } from "react";
import { useCreateShortUrl } from "../hooks/useCreateShortUrl";

export default function UrlForm() {
    const [longUrl, setLongUrl] = useState(""); 
    const { createShortUrl, shortUrl, error, isLoading }= useCreateShortUrl(); 

    async function handleSubmit(e) {
        e.preventDefault(); 

        await createShortUrl(longUrl); 
    }
  return (
    <form className="generate-shortUrl" method="post" onSubmit={handleSubmit}>
      <h3>Generate shortUrl</h3>

      <label>LongUrl</label>
      <input
        type="text"
        placeholder="Enter longUrl"
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <div>
        {!error && shortUrl && (
          <div>
            ShortUrl: <a href={shortUrl}>{shortUrl}</a>
          </div>
        )}
      </div>

      <button disabled={isLoading}>Generate</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
