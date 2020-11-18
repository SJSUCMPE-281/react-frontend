import axios from "axios";
import { GET_SELLER_PRODUCTS } from "./types";

export const getSellerProducts = (id) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_SELLER_URL + `/api/seller/${id}/product`
  );

  dispatch({ type: GET_SELLER_PRODUCTS, payload: res.data });
};

export const saveSellerProduct = (sellerId, newProduct) => async (dispatch) => {
  const res = await axios.post(
    process.env.REACT_APP_SELLER_URL + `/api/seller/${sellerId}/product`,
    newProduct
  );
  console.log(res);
  dispatch({ type: GET_SELLER_PRODUCTS, payload: res.data });
};