
export default function UrlDetails({ url }) {

    function buildUrl(shortUrlId) {
        return `${window.location.origin}/urls/${shortUrlId}`;
    }

    return (
        <div className="d-flex flex-column bg-light mx-3 my-3 rounded-1">
            <p className="mx-3 my-3">{url.longUrl}</p>
            <p className="mx-3 my-3">Short Url: <a href={url.longUrl}>{buildUrl(url.shortUrlId)}</a></p>
        </div>
    )
}
