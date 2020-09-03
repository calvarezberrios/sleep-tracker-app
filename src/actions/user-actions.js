import AxiosWithAuth from "../utils/AxiosWithAuth";

export const FETCH_START = "FETCH_START";
export const FETCH_SUCCESS = "FETCH_SUCCESS";
export const FETCH_FAILURE = "FETCH_FAILURE";
export const LOGOUT_USER = "LOGOUT_USER";

export const login = (user, keepLogged) => dispatch => {
    dispatch({type: FETCH_START});

    AxiosWithAuth()
        .post("/auth/login", user)
        .then(res => {
            setUserState(res.data, keepLogged, dispatch);
        })
        .catch(err => {
            fetchError(err, dispatch);
        })
}

export const register = (user, keepLogged) => dispatch => {
    dispatch({ type: FETCH_START });

    AxiosWithAuth()
        .post("/auth/register", user)
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

function setUserState(user, keepLogged, dispatch) {
            console.log(user);

            if(keepLogged) {
                localStorage.setItem("sleepToken", user.token);
            }

            dispatch({
                type: FETCH_SUCCESS,
                payload: user
            });
}

export function fetchError(err, dispatch) {
    console.log(err.message, err.response.data);
    dispatch({
        type: FETCH_FAILURE,
        payload: err.response.data ? err.response.data : err.message
    });
}