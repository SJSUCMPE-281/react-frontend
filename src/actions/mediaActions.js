import axios from "axios";
import { GET_MEDIA } from "./types";
import FormData from "form-data";

export const saveMedia = (files) => async (dispatch) => {
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    console.log("inside loop");
    formData.append("images", files[i]);
  }

  const res = await axios.post(
    process.env.REACT_APP_SELLER_URL + "/api/media",
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
  console.log(res);
  dispatch({ type: GET_MEDIA, payload: res.data });
};
