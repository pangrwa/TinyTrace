import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import Pagination from "../components/Pagination";

export default function Home() {

    
    return (
        <div className="home-page">
            <div> 
                <UrlTable />
                <Pagination />
            </div>
            <UrlForm />
        </div>
    );
}
