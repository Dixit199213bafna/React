import * as actionTypes from './actionTypes';
import axios from 'axios';
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        isToken: token,
        userId
    }
}

export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXusVwg2ueLVpWeBic4vgVImeX4kyTwH4';
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXusVwg2ueLVpWeBic4vgVImeX4kyTwH4'
        }
        axios.post(url, {
            email, password, returnSecureToken: true,
        }).then(res => {
            dispatch(authSuccess(res.data.idToken, res.data.localId));
            dispatch(checkAuthTimeout(res.data.expiresIn));
            const expirtateDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirtateDate);
            localStorage.setItem('localId', res.data.localId);
        })
            .catch(e => dispatch(authFailure(e.response.data.error)))
    }
}

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('localId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000)
    }
}

export const authCheckState = () => {
    console.log(' authCheckState')
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token) {
            dispatch(logOut())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()) {
                const localId = localStorage.getItem('localId')
                dispatch(authSuccess(token, localId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            } else {
                dispatch(logOut());
            }

        }
    }
}

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path,
    }
}