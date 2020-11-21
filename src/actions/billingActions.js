import axios from "axios";
import { GET_BILLING } from "./types";
// eslint-disable-next-line
export const getBilling = (id) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_BUYER_URL + `/api/seller/${id}/billing`
  );
  dispatch({ type: GET_BILLING, payload: res.data });
};
