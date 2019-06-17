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

    axios.get('/api/auth/user', takeConfig(getState))
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

export const register = ({name, email, password}) => dispatch =>{
    const config  = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({name, email, password});

    axios.post('/api/users', body, config)
    .then(res=> dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    }))
    .catch(err=> {
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type:REGISTER_FAIL
        })
    })
}

export const login = ({email, password}) => dispatch => {
    const config  = {
        headers:{
            'Content-Type' : 'application/json'
        }
    }
    
    const body = JSON.stringify({email, password});

    axios.post('/api/auth', body, config)
    .then(res=> dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    }))
    .catch(err=> {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
        })
    })
}

export const logout = () => {
    return{
        type:LOGOUT_SUCCESS
    };
};

export const takeConfig = getState =>{
    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-type":"application/json"
        }
    };

    if(token){
        config.headers['x-auth-token'] = token;
    }

    return config;
}

