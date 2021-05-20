import * as actionTypes from './actionTypes';
import { updateObject } from '../utility/utility';

// GlobalState
const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false
};

// This method will set loading to true to show loading on the screen while data retrieves
const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
}

// This method will assign token and userId to globalState after fetched from google firebase
const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false
    });
}

// Assign error to state and finish loading state
const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

// Logout will remove data for user
const authLogout = (state, action) => {
    return updateObject(state, {token: null, userId: null});
}

// Switch for actionTypes
const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;