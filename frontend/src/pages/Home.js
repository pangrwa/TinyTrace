import { useEffect, useState } from "react";
import UrlForm from "../components/UrlForm";
import { useAuth } from "../contexts/AuthContext";
import UrlDetails from "../components/UrlDetails";
import { useUrl } from "../contexts/UrlContext";
import UrlTable from "../components/UrlTable";
import Pagination from "../components/Pagination";

export default function Home() {

    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    
    return (
        <div className="home-page">
            <div> 
                <UrlTable currentPageNumber={currentPageNumber}/>
                <Pagination pageState={{currentPageNumber, setCurrentPageNumber}}/>
            </div>
            <UrlForm setCurrentPageNumber={setCurrentPageNumber}/>
        </div>
    );
}
