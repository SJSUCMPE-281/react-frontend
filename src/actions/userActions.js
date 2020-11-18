import axios from "axios";
import { GET_BUYER, GET_SELLER } from "./types";

export const saveBuyer = (newBuyer) => async (dispatch) => {
  const res = await axios.post(
    process.env.REACT_APP_BUYER_URL + "/api/buyer",
    newBuyer
  );

  dispatch({ type: GET_BUYER, payload: res.data });
};

export const saveSeller = (newSeller) => async (dispatch) => {
  const res = await axios.post(
    process.env.REACT_APP_SELLER_URL + "/api/seller",
    newSeller
  );
  dispatch({ type: GET_SELLER, payload: res.data });
};

export const getSeller = (id) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_SELLER_URL + `/api/seller/${id}`
  );
  dispatch({ type: GET_SELLER, payload: res.data });
};
