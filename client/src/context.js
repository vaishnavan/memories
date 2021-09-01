import React, { createContext } from 'react';
export const myContext = createContext();

export default function DataProvider({children}){
    const  userLocData = JSON.parse(localStorage.getItem("auth"));

    console.log(userLocData);

    return(
        <myContext.Provider value={{userLocData}}>
            {children}
        </myContext.Provider>
    )
}