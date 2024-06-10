import { usePage } from "../contexts/PageContext";

/*
PageNumber: 1-indexed number shown on front end
currentPageNumber: 0-indexed number used in the backend
*/ 
function PageDetail( { pageNumber } ) {
    const {
        currentPageNumber, currentPageNumberDispatcher 
    } = usePage();
    const isActivePage = currentPageNumber === pageNumber - 1;

    function handleSubmit() {
        currentPageNumberDispatcher({ type: 'SET_CURRENT_PAGE_NUMBER', payload: pageNumber - 1} ); 
    } 

    return (
        <li className="page-item">
            <button className={`page-link ${isActivePage ? "active" : ""}`} arial-label={`page ${pageNumber}`} onClick={handleSubmit}>
                {pageNumber}
            </button>
        </li>
    )
}


export default function Pagination() { 
    const { totalPages } = usePage(); 
    const { 
        currentPageNumber, currentPageNumberDispatcher
    } = usePage();

    const isFirstPage = currentPageNumber === 0; 
    const isLastPage = currentPageNumber === totalPages - 1; 

    // These 0-indexed values with respect to currentPageNumber
    const FIRST_THRESHOLD = 2; 
    const LAST_THRESHOLD = totalPages - 3; 

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {/* These are to set the first 3 default page numbers if possible */}
                {totalPages > 0 &&
                <>
                    <li className="page-item">
                        <button className={`page-link ${isFirstPage ? "disabled" : ""}`} arial-label="Previous" disabled={isFirstPage}
                            onClick={() => currentPageNumberDispatcher({ type: 'SET_CURRENT_PAGE_NUMBER', payload: currentPageNumber - 1 })}
                        >
                            &laquo;
                        </button>
                    </li>
                    <PageDetail pageNumber={1}/>
                </>}
                {1 < totalPages && <PageDetail pageNumber={2} />}
                {2 < totalPages && <PageDetail pageNumber={3} />}

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
                    <PageDetail pageNumber={currentPageNumber}/>
                }
                {(FIRST_THRESHOLD < currentPageNumber) && (currentPageNumber < LAST_THRESHOLD) &&
                    <PageDetail pageNumber={currentPageNumber + 1} />
                }
                {(FIRST_THRESHOLD < currentPageNumber + 1) && (currentPageNumber + 1 < LAST_THRESHOLD) &&
                    <PageDetail pageNumber={currentPageNumber + 2} />
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
                {totalPages - 3 > FIRST_THRESHOLD && 
                    <PageDetail pageNumber={totalPages - 2} />
                }
                {totalPages - 2 > FIRST_THRESHOLD && 
                    <PageDetail pageNumber={totalPages - 1}/>
                }
                
                {totalPages > 3  && <PageDetail pageNumber={totalPages} />}
                {totalPages > 1 && 
                        <li className="page-item">
                            <button className={`page-link ${isLastPage ? "disabled" : ""}`} arial-label="Next" disabled={isLastPage}
                                onClick={() => currentPageNumberDispatcher({ type: 'SET_CURRENT_PAGE_NUMBER', payload: currentPageNumber + 1})}
                            >
                                &raquo;
                            </button>
                        </li>
                }
            </ul>
        </nav>
    )
} 
