import * as actionTypes from './actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

export const logout = () => {
    removeData('token');
    removeData('expirationDate');
    removeData('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
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
                // save login Data inside device using Async Storage
                const expirationDate =new Date(new Date().getTime() + response.data.expiresIn * 1000).toDateString();
                storeData('token', response.data.idToken);
                storeData('expirationDate', expirationDate);
                storeData('userId', response.data.localId);

                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.error));
            })
    };
};

// app will check for userData inside AsyncStorage
// if there is no data the app will launch logout
export const authCheckState = () => {
    return dispatch => {
        const token = getData('token');
        if(!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(getData('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = getData('userId');
                dispatch(authSuccess(token, userId));
            }
            
        }
    };
};


// methods to save, retreive and remove data from AsyncStorage
const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem('@' + key, value)
    } catch (e) {
        console.log(e);
    }
}


const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem('@' + key)
        if (value !== null) { return value; }
    } catch (e) {
        console.log(e);
    }
}

const removeData = async (key) => {
    try {
        await AsyncStorage.removeItem('@' + key)
    } catch (e) {
        console.log(e);
    }
}
