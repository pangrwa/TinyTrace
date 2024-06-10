import { createContext, useContext, useReducer } from "react";

const UrlContext = createContext(); 

const urlReducer = (state, action) => {
    switch (action.type) {
    case 'FETCH_URLS': {
        return action.payload;
    }
    default: {
        return state; 
    }
    }
}

const UrlProvider = ({ children }) => {

    const [urls, urlDispatcher] = useReducer(urlReducer, []);

    const contextValue = {
        urls, urlDispatcher,
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
