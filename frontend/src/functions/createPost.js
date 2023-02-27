import axios from "axios";

export const createPost = async(
    type,
    text,
    images,
    video,
    user,
    token
    )=>{
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_NACKEND_URL}/createPost`,{
            type,
            text,
            images,
            video,
            user,
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


   



















