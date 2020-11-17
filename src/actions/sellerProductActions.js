import axios from "axios";
import { GET_SELLER_PRODUCTS } from "./types";

export const getSellerProducts = (id) => async (dispatch) => {
  const res = await axios.get(
    `http://marketplaceseller-env.eba-ygz48yhg.us-east-1.elasticbeanstalk.com/api/seller/${id}/product`
  );

  dispatch({ type: GET_SELLER_PRODUCTS, payload: res.data });
};
