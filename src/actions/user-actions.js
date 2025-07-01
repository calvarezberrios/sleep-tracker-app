import Axios from "axios";
import AxiosWithAuth from "../utils/AxiosWithAuth";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

export const login = (user, keepLogged) => dispatch => {
    dispatch({type: FETCH_START});

    Axios
        .post("https://sleeptracker-back-end.onrender.com/api/auth/login", user)
        .then(res => {
            setUserState(res.data, keepLogged, dispatch);
        })
        .catch(err => {
            fetchError(err, dispatch);
        })
}

export const register = (user, keepLogged) => dispatch => {
    dispatch({ type: FETCH_START });

    Axios
        .post("https://sleeptracker-back-end.onrender.com/api/auth/register", user)
        .then(res => {
            setUserState(res.data, keepLogged, dispatch);
        })
        .catch(err => {
            fetchError(err, dispatch);
        })
}

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT_USER });
}

export const getUser = () => dispatch => {
    dispatch({ type: FETCH_START });

    AxiosWithAuth()
        .get("/users/me")
        .then(res => {
            const user = {
                ...res.data,
                token: JSON.parse(localStorage.getItem("savedUser") || sessionStorage.getItem("currentUser"))
            }
            dispatch({
                type: FETCH_SUCCESS,
                payload: user
            });
        })
        .catch(err => {
            fetchError(err, dispatch);
        });
}

function setUserState(user, keepLogged, dispatch) {
            

            if(keepLogged) {
                localStorage.setItem("savedUser", JSON.stringify(user));
            } else {
                sessionStorage.setItem("currentUser", JSON.stringify(user))
            }

            dispatch({
                type: FETCH_SUCCESS,
                payload: user
            });
}

export function fetchError(err, dispatch) {
    
    dispatch({
        type: FETCH_FAILURE,
        payload: err.response.data ? err.response.data : err.message
    });
}