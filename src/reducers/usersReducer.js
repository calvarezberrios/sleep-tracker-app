import {
    FETCH_START,
    FETCH_SUCCESS,
    FETCH_FAILURE,
    FETCH_USER,
    LOGOUT_USER,
} from "../actions/user-actions";


const storedUser = JSON.parse(localStorage.getItem("savedUser") || sessionStorage.getItem("currentUser"));
const initialState = {
    user: storedUser ? storedUser : null,
    isFetching: false,
    error: null
}

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_START:
            return {
                ...state,
                isFetching: true
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
                isFetching: false
            }
        case FETCH_FAILURE:
            return {
                ...state,
                error: action.payload,
                isFetching: false
            }
        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                error: null,
                isFetching: false
            }
        default:
            return state;
    }
}