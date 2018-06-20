import axios from 'axios';
import { FETCH_USER, FETCH_SURVEY} from './types';
//await and async syntax

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
  
    dispatch({ type: FETCH_USER, payload: res });
  };

export const handleToken = token => async dispatch => {
  const response = await axios.post('/api/stripe', token);
  dispatch({type:FETCH_USER, payload: response});
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  dispatch({ type: FETCH_USER, payload: res.data });
  history.push('/surveys');
};

export const fetchSurveys = () => async dispatch => {
  const response = await axios.get('/api/surveys');
  dispatch({type: FETCH_SURVEY, payload: response})
};