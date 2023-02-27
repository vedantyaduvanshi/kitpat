import {createContext, useState} from "react"

const FullSinglePageContext = createContext();

export function PostFullPageProvider({children}){
    const [postido, setpostido] = useState([])

    const SavethePost = (post)=>{
        const obj = ReturnThePost(post.key)
        if (obj === undefined) {
            postido.push(post);
        }else{
         const deletthis =  postido.indexOf(obj)
         postido.splice(deletthis, 1);
         postido.push(post);
        }
    }

    const ReturnThePost = (post)=>{
        let obj = postido.find(o => o.key === post);
        return obj
    }

    if (postido === "sdkhfkshgfis") {
        setpostido([])
    }


    return(
        <FullSinglePageContext.Provider value={{postido, SavethePost,ReturnThePost}}>
            {children}
        </FullSinglePageContext.Provider>
    )
}

export default FullSinglePageContext;