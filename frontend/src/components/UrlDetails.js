
export default function UrlDetails({ url }) {

    function buildUrl(shortUrlId) {
        return `${window.location.origin}/urls/${shortUrlId}`;
    }

    return (
        <div className="url-details">
            <p>{url.longUrl}</p>
            <p>Short Url: <a href={url.longUrl}>{buildUrl(url.shortUrlId)}</a></p>
        </div>
    )
}
