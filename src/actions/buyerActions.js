import axios from 'axios'
import {GET_BUYER} from '../actions/types'

export const saveBuyer = (newBuyer) => async (dispatch) => {
    const res = await axios.post('http://localhost:8081/api/buyer', newBuyer);
           
          dispatch({type:GET_BUYER,payload:res.data});
   
 }