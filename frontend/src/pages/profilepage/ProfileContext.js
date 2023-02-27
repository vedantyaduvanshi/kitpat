import {createContext, useState} from "react"

const ProfileContext = createContext();

export function ProfileProvider({children}){
    const [Profilo, setProfilo] = useState()

    const UpdateProfile = (profile)=>{
        setProfilo(profile)
    }
    return(
        <ProfileContext.Provider value={{Profilo, UpdateProfile}}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContext;