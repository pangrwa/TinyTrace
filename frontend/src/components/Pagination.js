import { useUrl } from "../contexts/UrlContext";

/*
PageNumber: 1-indexed number shown on front end
currentPageNumber: 0-indexed number used in the backend
*/ 
function PageDetail( { pageState, pageNumber } ) {
    const { currentPageNumber, setCurrentPageNumber } = pageState; 
    const isActivePage = currentPageNumber === pageNumber - 1;
    console.log("This is the currentPageNumber: " , pageNumber);
    console.log(isActivePage); 

    function handleSubmit() {
        setCurrentPageNumber(pageNumber - 1); 
    } 

    return (
        <li className="page-item">
            <button className={`page-link ${isActivePage ? "active" : ""}`} arial-label={`page ${pageNumber}`} onClick={handleSubmit}>
                {pageNumber}
            </button>
        </li>
    )
}


export default function Pagination({ pageState }) { 
    const { totalPages } = useUrl(); 
    const { currentPageNumber, setCurrentPageNumber } = pageState;

    const isFirstPage = currentPageNumber === 0; 
    const isLastPage = currentPageNumber === totalPages - 1; 

    // These 0-indexed values with respect to currentPageNumber
    const FIRST_THRESHOLD = 2; 
    const LAST_THRESHOLD = totalPages - 3; 

    console.log("This is current page number: ", currentPageNumber); 
    console.log("This is total pages: ", totalPages);
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {/* These are to set the first 3 default page numbers if possible */}
                {totalPages > 0 &&
                <>
                    <li className="page-item">
                        <button className={`page-link ${isFirstPage ? "disabled" : ""}`} arial-label="Previous" disabled={isFirstPage}
                            onClick={() => setCurrentPageNumber(currentPageNumber - 1)}
                        >
                            &laquo;
                        </button>
                    </li>
                    <PageDetail pageState={pageState} pageNumber={1}/>
                </>}
                {2 < totalPages && <PageDetail pageState={pageState} pageNumber={2} />}
                {3 < totalPages && <PageDetail pageState={pageState} pageNumber={3} />}

                {/* These are to set ... if there is at least one page number in between FIRST_THRESHOLD and current number */} 
                {   (FIRST_THRESHOLD + 1 < LAST_THRESHOLD) &&
                    (FIRST_THRESHOLD + 1 < currentPageNumber - 1) &&
                    <li className="page-item">
                        <button className="page-link disabled" arial-label="In between pages">
                            ... 
                        </button>
                    </li>
                }
                
                {/* These are to set the neighbouringe elements of the current page */}
                {(FIRST_THRESHOLD < currentPageNumber - 1) && (currentPageNumber - 1 < LAST_THRESHOLD) &&
                    <PageDetail pageState={pageState} pageNumber={currentPageNumber}/>
                }
                {(FIRST_THRESHOLD < currentPageNumber) && (currentPageNumber < LAST_THRESHOLD) &&
                    <PageDetail pageState={pageState} pageNumber={currentPageNumber + 1} />
                }
                {(FIRST_THRESHOLD < currentPageNumber + 1) && (currentPageNumber + 1 < LAST_THRESHOLD) &&
                    <PageDetail pageState={pageState} pageNumber={currentPageNumber + 2} />
                }

                {/* These are to set ... if there is at least one page number in between LAST_THRESHOLD and current number */} 
                {   (FIRST_THRESHOLD + 1 < LAST_THRESHOLD) &&
                    (currentPageNumber + 1 < LAST_THRESHOLD - 1) &&
                    <li className="page-item">
                        <button className="page-link disabled" arial-label="In between pages">
                            ... 
                        </button>
                    </li>
                }

                {/* These are to set the last 3 default page numbers if possible */}
                {totalPages - 2 > FIRST_THRESHOLD && 
                    <PageDetail pageState={pageState} pageNumber={totalPages - 2} />
                }
                {totalPages - 1 > FIRST_THRESHOLD && 
                    <PageDetail pageState={pageState} pageNumber={totalPages - 1}/>
                }
                {totalPages > 1 && 
                    <>
                        <PageDetail pageState={pageState} pageNumber={totalPages} />
                        <li className="page-item">
                            <button className={`page-link ${isLastPage ? "disabled" : ""}`} arial-label="Next" disabled={isLastPage}
                                onClick={() => setCurrentPageNumber(currentPageNumber + 1)}
                            >
                                &raquo;
                            </button>
                        </li>
                    </>
                }
            </ul>
        </nav>
    )
} 
