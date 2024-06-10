import UrlForm from "../components/UrlForm";
import UrlTable from "../components/UrlTable";
import Pagination from "../components/Pagination";

export default function Home() {

    
    return (
        <div className="container-sm mx-auto my-4">
            <div className="row">
                <div className="col order-lg-1 mb-3">
                    <UrlForm />
                </div>
                <div className="col-lg-8 order-lg-0">
                    <UrlTable />
                    <Pagination />
                </div>
            </div>
        </div>
    );
}
