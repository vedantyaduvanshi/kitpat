import axios from "axios";

export const createcomment = async(
    type,
    text,
    images,
    video,
    user,
    postID,
    checkReplyNumber,
    replyingto,
    token
    )=>{
    try {
        const {data} = await axios.post(`${process.env.REACT_APP_NACKEND_URL}/createComment`,{
            type,
            text,
            images,
            video,
            user,
            postID,
            checkReplyNumber,
            replyingto,
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


   export const gettingReplies = async(
   skip, postId,token
        )=>{
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/gettingcomments`,{
                skip,postId,
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            });
            return data
        } catch (error) {
            return  error.response.data 
        }
       };