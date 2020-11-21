import axios from "axios";
import { GET_ORDERS } from "./types";

// eslint-disable-next-line
export const saveOrder = (sale, id) => async (dispatch) => {
  const res = await axios.post(
    process.env.REACT_APP_BUYER_URL + `/api/buyer/${id}/order`,
    sale
  );
  dispatch({ type: GET_ORDERS, payload: res.data });
};

export const getOrders = (id) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_BUYER_URL + `/api/buyer/${id}/order`
  );
  dispatch({ type: GET_ORDERS, payload: res.data });
};

export const getSellerOrders = (id, status) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_BUYER_URL + `/api/seller/${id}/order/${status}`
  );
  dispatch({ type: GET_ORDERS, payload: res.data });
};

export const updateSellerOrder = (id, sale) => async (dispatch) => {
  const res = await axios.put(
    process.env.REACT_APP_BUYER_URL + `/api/seller/${id}/order`,
    sale
  );
  dispatch({ type: GET_ORDERS, payload: res.data });
};
