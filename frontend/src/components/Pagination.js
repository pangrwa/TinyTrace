import { useUrl } from "../contexts/UrlContext";

function PageDetail( { pageNumber } ) {

    return (
        <li className="page-item">
            <button className="page-link" arial-label={`page #{pageNumber}`}>
                {pageNumber}
            </button>
        </li>
    )
}


export default function Pagination({ currentPageNumber }) { 
    const { totalPages } = useUrl(); 
    const FIRST_THRESHOLD = 3; 
    const LAST_THRESHOLD = totalPages - 2; 
    

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {totalPages > 0 &&
                <>
                    <li className="page-item">
                        <button className="page-link" arial-label="Previous">
                            &laquo;
                        </button>
                    </li>
                    <PageDetail pageNumber={1}/>
                </>}
                {2 < totalPages && <PageDetail pageNumber={2} />}
                {3 < totalPages && <PageDetail pageNumber={3} />}

                {   (FIRST_THRESHOLD + 1 < LAST_THRESHOLD) &&
                    (FIRST_THRESHOLD < currentPageNumber - 1) &&
                    <PageDetail pageNumber={"..."}/ >
                }
                {(FIRST_THRESHOLD < currentPageNumber) && (currentPageNumber < LAST_THRESHOLD) &&
                    <PageDetail pageNumber={currentPageNumber} />
                }
                {   (FIRST_THRESHOLD + 1 < LAST_THRESHOLD) &&
                    (currentPageNumber + 1 < LAST_THRESHOLD) &&
                    <PageDetail pageNumber={"..."} />
                }

                {totalPages - 2 > FIRST_THRESHOLD && 
                    <PageDetail pageNumber={totalPages - 2} />
                }
                {totalPages - 1 > FIRST_THRESHOLD && 
                    <PageDetail pageNumber={totalPages - 1} />
                }
                {totalPages > 1 && 
                    <>
                        <PageDetail pageNumber={totalPages} />
                        <li className="page-item">
                            <button className="page-link" arial-label="Previous">&raquo;</button>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
} 
