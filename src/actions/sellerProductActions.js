import axios from "axios";
import { GET_SELLER_PRODUCTS, DELETE_PRODUCT } from "./types";

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

export const updateSellerProduct = (sellerId, updateProduct) => async (
  dispatch
) => {
  const res = await axios.put(
    process.env.REACT_APP_SELLER_URL + `/api/seller/${sellerId}/product`,
    updateProduct
  );
  console.log(res);
  dispatch({ type: GET_SELLER_PRODUCTS, payload: res.data });
};

export const deleteSellerProduct = (productId, sellerId) => async (
  dispatch
) => {
  const res = await axios.delete(
    process.env.REACT_APP_SELLER_URL +
      `/api/seller/${sellerId}/product/${productId}`
  );
  dispatch({ type: DELETE_PRODUCT, payload: res.data });
};

export const saveSellerImages = (sellerId, image) => async (dispatch) => {

  const formData = new FormData();
    formData.append("image", image);

    console.log(sellerId,image);
  const res = await axios.post(
    process.env.REACT_APP_SELLER_URL + `/api/seller/${sellerId}/media`,
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
  console.log(res);
  dispatch({ type: GET_SELLER_PRODUCTS, payload: res.data });
};
