import axios from 'axios';
import { FETCH_USER} from './types';
//await and async syntax

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
  
    dispatch({ type: FETCH_USER, payload: res });
  };

export const handleToken = token => async dispatch => {
  const response = await axios.post('/api/stripe', token);
  dispatch({type:FETCH_USER, payload: response});
}