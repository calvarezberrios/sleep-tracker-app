import { FETCH_START, FETCH_FAILURE } from "../actions/user-actions";
import { FETCH_ENTRIES_SUCCESS, FETCH_ENTRY_SUCCESS } from "../actions/entry-actions";

const initialState = {
    entries: [],
    entry: null,
    isFetching: false,
    error: null
}

export default function entriesReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_START:
            return {
                ...state,
                isFetching: true,
                error: null
            }
        case FETCH_ENTRIES_SUCCESS:
            return {
                ...state,
                entries: action.payload,
                isFetching: false,
                error: null
            }
        case FETCH_ENTRY_SUCCESS: 
            return {
                ...state,
                isFetching: false,
                entry: action.payload,
                error: null
            }
        case FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: action.payload
            }
        default:
            return state;
    }
}