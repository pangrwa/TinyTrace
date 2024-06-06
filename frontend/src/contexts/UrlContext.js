import { createContext, useContext, useReducer } from "react";

const UrlContext = createContext(); 

const urlReducer = (state, action) => {
    switch (action.type) {
    case 'FETCH_URLS': {
        return action.payload;
    }
    case 'CREATE_URL': {
        return [...state, action.payload]
    }
    default: {
        return state; 
    }
    }
}

const totalPagesReducer = (state, action) => {
    switch (action.type) {
    case 'GET_TOTAL_PAGES': {
        return state;
    }
    case 'SET_TOTAL_PAGES': {
        return action.payload; 
    }
    default: {
        return state; 
    }
    }
}

const UrlProvider = ({ children }) => {

    const [urls, urlDispatcher] = useReducer(urlReducer, []);
    const [totalPages, totalPagesDispatcher] = useReducer(totalPagesReducer, []);  

    const contextValue = {
        urls, urlDispatcher,
        totalPages, totalPagesDispatcher
    }

    return (
        <UrlContext.Provider value={contextValue}>
            {children}
        </UrlContext.Provider>
    )
}

export default UrlProvider; 

export const useUrl = () => {
    return useContext(UrlContext);
}
