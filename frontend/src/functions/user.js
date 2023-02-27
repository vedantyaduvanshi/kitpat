import axios from "axios";

export const updateprofilePicture = async(
url,token
    )=>{
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/updateProfilePicture`,{
         url,
        },
        {
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(data)
        return "ok";
    } catch (error) {
        return  error.response.data 
        // JSON.stringify(error.response.data);
    }
   };





   export const followUser = async(
    id,token
        )=>{
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/followUser/${id}`,{},
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            return "ok";
        } catch (error) {
            return  error.response.data.message
        }
       };


       
   export const unfollowUser = async(
    id,token
        )=>{
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/unfollowUser/${id}`,{},
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            return "ok";
        } catch (error) {
            return  error.response.data.message
        }
       };


       export const ShowFollowers = async(
        skip,id,token
            )=>{
            try {
                const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/getFollowersList/${id}`,{skip},
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                return data;
            } catch (error) {
                return  error.response.data.message
            }
           };       

       

      export const ShowFollowwing = async(
            skip,id,token
           )=>{
        try {
               const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/getFollowingList/${id}`,{skip},
               {
                   headers:{
                       Authorization: `Bearer ${token}`,
                }
            });
            return data;
        } catch (error) {
            return  error.response.data.message
        }
       };
       
       

       export const GetProfileFollowers = async(
       token
       )=>{
       try {
           const {data} = await axios.get(`${process.env.REACT_APP_NACKEND_URL}/getUsersFollowersList`,
           {
               headers:{
                   Authorization: `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        return  error.response.data.message
    }
   };
   
   


   export const GetProfileFollowing = async(
    token
    )=>{
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_NACKEND_URL}/getUsersFollowingList`,
        {
            headers:{
                Authorization: `Bearer ${token}`,
         }
     });
     return data;
 } catch (error) {
     return  error.response.data.message
 }
};


export const GetuserLikedPosts = async(
    token
    )=>{
    try {
        const {data} = await axios.get(`${process.env.REACT_APP_NACKEND_URL}/getUsersLikedPosts`,
        {
            headers:{
                Authorization: `Bearer ${token}`,
         }
     });
     return data;
 } catch (error) {
     return  error.response.data.message
 }
};



       




export const getProfileLikedPostsforShowcase = async(
    skip,id,token
   )=>{
try {
       const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/getProfileLikedPostsforShowcase/${id}`,{skip},
       {
           headers:{
               Authorization: `Bearer ${token}`,
        }
    });
    return data;
} catch (error) {
    return  error.response.data.message
}
};