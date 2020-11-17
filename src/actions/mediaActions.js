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
    "http://marketplaceseller-env.eba-ygz48yhg.us-east-1.elasticbeanstalk.com/api/media",
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
