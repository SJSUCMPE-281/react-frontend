import axios from 'axios';
import {GET_CART, DELETE_CART} from './types';

export const saveCart = (id,cart) => async (dispatch) => {
    const res = await axios.post(`http://localhost:8081/api/${id}/cart`, cart);
           
          dispatch({type:GET_CART,payload:res.data});
   
 }

 export const getCart = (id) => async(dispatch) => {
     const res = await axios.get(`http://localhost:8081/api/${id}/cart`);
     dispatch({type:GET_CART,payload:res.data})
 }

 export const deleteCart = (id) => async(dispatch) => {
     const res = await axios.delete(`http://localhost:8081/api/${id}/cart`);
     console.log("inside get delete", res)
     dispatch({type:DELETE_CART,payload:res.data})
 }