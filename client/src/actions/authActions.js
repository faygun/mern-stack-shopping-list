import axios from 'axios';
import {returnErrors, clearErrors} from './errorActions';
import {
    USER_LOADED,
    USER_LOADING,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCCESS
} from './types';

export const loadUser = () => (dispatch, getState) => {
    dispatch({type:USER_LOADING});

    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-type":"application/json"
        }
    };

    if(token){
        config.headers['x-auth-token'] = token;
    }

    axios.get('/api/auth/user', config)
    .then(res => dispatch({
        type: USER_LOADED,
        payload : res.data
    }))
    .catch(err=>{
        console.log(err);
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type:AUTH_ERROR
        })
    })
}

