import axios from "axios";
import { GET_CART, DELETE_CART } from "./types";
// eslint-disable-next-line
export const saveCart = (id, cart) => async (dispatch) => {
  const res = await axios.post(
    process.env.REACT_APP_BUYER_URL + `/api/${id}/cart`,
    cart
  );
  dispatch({ type: GET_CART, payload: res.data });
};

export const getCart = (id) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_BUYER_URL + `/api/${id}/cart`
  );
  dispatch({ type: GET_CART, payload: res.data });
};

export const deleteCart = (id) => async (dispatch) => {
  const res = await axios.delete(
    process.env.REACT_APP_BUYER_URL + `/api/${id}/cart`
  );
  dispatch({ type: DELETE_CART, payload: res.data });
};
