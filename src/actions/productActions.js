import axios from "axios";
import { GET_PRODUCTS } from "./types";

export const getProducts = () => async (dispatch) => {
  const res = await axios.get(
    "http://marketplacebuyer-env.eba-mzeupjpj.us-east-1.elasticbeanstalk.com/api/product?page=0&size=30"
  );

  dispatch({ type: GET_PRODUCTS, payload: res.data });
};
