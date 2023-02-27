import {createContext, useState} from "react"

const SinglePageContext = createContext();

export function PostProvider({children}){
    const [posto, setposto] = useState()

    const ChangePost = (post)=>{
        setposto(post)
    }
    
    return(
        <SinglePageContext.Provider value={{posto, ChangePost}}>
            {children}
        </SinglePageContext.Provider>
    )
}

export default SinglePageContext;