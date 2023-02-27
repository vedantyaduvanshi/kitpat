import axios from "axios";

export const uploadVideo = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_NACKEND_URL}/uploadVideo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data
  } catch (error) {
    return error.response.data
  }
};



