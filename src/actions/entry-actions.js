import AxiosWithAuth from "../utils/AxiosWithAuth";
import {FETCH_START, fetchError} from "./user-actions";

export const FETCH_ENTRIES_SUCCESS = "FETCH_ENTRIES_SUCCESS";
export const FETCH_ENTRY_SUCCESS = "FETCH_ENTRY_SUCCESS";

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
            //console.log(res.data);
            dispatch({
                type: FETCH_ENTRY_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => fetchError(err, dispatch));
}