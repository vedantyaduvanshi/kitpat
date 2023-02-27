import axios from "axios";


export const getPostLikers = async(
    skip,id,token
        )=>{
        try {
            const {data} = await axios.put(`${process.env.REACT_APP_NACKEND_URL}/getThisPostLikers/${id}`,{skip},
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