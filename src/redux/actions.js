import * as actionTypes from './actionTypes';
import axios from 'axios';

// triggers the Auth process
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

// return userData to reducers
export const authSuccess = (token, userId) => {
    
    console.log(token)
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

// will assign error state on auth fail
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// Fetch userData from firebase
export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        // FireBase endpoint for Signing
        // this URL must be saved as Environment Variable in real applications
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXPnqezuRdCQ2aw4qPmfatAzMRYIujF70';

        axios.post(url, authData)
            .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
};