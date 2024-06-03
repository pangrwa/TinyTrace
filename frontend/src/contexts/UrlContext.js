import { createContext, useContext, useReducer } from "react";

const UrlContext = createContext(); 

const urlReducer = (state, action) => {
    switch (action.type) {
    case 'FETCH_URLS': {
        console.log(action.payload)
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

const UrlProvider = ({ children }) => {

    const [urls, dispatch] = useReducer(urlReducer, []);
    const contextValue = {
        urls, dispatch 
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
