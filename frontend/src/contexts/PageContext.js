import { createContext, useContext, useReducer } from "react";

const PageContext = createContext(); 

const totalPagesReducer = (state, action) => {
    switch(action.type) {
    case "SET_TOTAL_PAGES": {
        return action.payload; 
    }
    default: {
        return state; 
    }
    }
}

const currentPageNumberReducer = (state, action) => {
    switch(action.type) {
    case "SET_CURRENT_PAGE_NUMBER": {
        return action.payload; 
    }
    default: {
        return state;
    }
    }
}

const PageProvider = ({ children }) => {
    const DEFAULT_PAGE_SIZE = 5;
    const [totalPages, totalPagesDispatcher] = useReducer(totalPagesReducer, 0);
    const [currentPageNumber, currentPageNumberDispatcher] = useReducer(currentPageNumberReducer, 0);

    const contextValue = {
        totalPages, totalPagesDispatcher,
        currentPageNumber, currentPageNumberDispatcher,
        DEFAULT_PAGE_SIZE
    }

    return (
        <PageContext.Provider value={contextValue}>
            {children}
        </PageContext.Provider>
    )
}

export default PageProvider; 

export const usePage = () => {
    return useContext(PageContext); 
}
