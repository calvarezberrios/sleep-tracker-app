import AxiosWithAuth from "../utils/AxiosWithAuth";
import {FETCH_START, fetchError} from "./user-actions";

export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const FETCH_ENTRY_SUCCESS = "FETCH_ENTRY_SUCCESS";
export const FETCH_DELETE_SUCCESS = "FETCH_DELETE_SUCCESS";

export const getEntries = () => dispatch => {
    dispatch({ type: FETCH_START });
    AxiosWithAuth()
        .get("/sleep")
        .then(res => {
            //console.log(res.data)
            dispatch({
                type: FETCH_ENTRIES_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            fetchError(err, dispatch);
        })
}

export const getEntryById = (id) => dispatch => {
    dispatch({ type: FETCH_START });

    AxiosWithAuth()
        .get(`/sleep/${id}`)
        .then(res => {
           
            dispatch({
                type: FETCH_ENTRY_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => fetchError(err, dispatch));
}

export const saveEntry = (id, entry) => dispatch => {
    dispatch({ type: FETCH_START });

    AxiosWithAuth()
        .put(`/sleep/${id}`, entry)
        .then(res => {
            dispatch({
                type: FETCH_ENTRY_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => fetchError(err, dispatch));
}

export const addNewEntry = (entry) => dispatch => {
    dispatch({type: FETCH_START});

    return AxiosWithAuth()
        .post("/sleep", entry)
        .then(res => {
            dispatch({
                type: FETCH_ENTRY_SUCCESS,
                payload: res.data
            });
            return res.data
        })
        .catch(err => {
            fetchError(err, dispatch)
            throw err;
        });
}

export const deleteEntry = id => dispatch => {
    dispatch({ type: FETCH_START });

    AxiosWithAuth()
        .delete(`/sleep/${id}`)
        .then(_ => {
            dispatch({
                type: FETCH_DELETE_SUCCESS
            });
        })
        .catch(err => fetchError(err, dispatch));
}