
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
      <h3>Generate short URL</h3>

      <input
        className="form-control"
        type="text"
        placeholder="Enter longUrl"
        onChange={(e) => setLongUrl(e.target.value)}
      />
      <div className="form-text">
        Ensure that the longUrl is valid
      </div>

      <div>
        {!error && shortUrl && (
          <div className="form-text">
            ShortUrl: <a href={shortUrl}>{shortUrl}</a>
          </div>
        )}
      </div>

      <button className="btn btn-primary" disabled={isLoading}>Generate</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
