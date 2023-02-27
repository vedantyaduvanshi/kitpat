import axios from "axios";

export const LikePost = async(
    postid,token
        )=>{
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/likepost/${postid}`,{},
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



       export const LikeComment = async(
        postid,token
            )=>{
            try {
                const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/likeComment/${postid}`,{},
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
