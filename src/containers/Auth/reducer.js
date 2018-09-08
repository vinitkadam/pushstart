import {
    PHONE_CHANGED,
    SET_LOADING,
    SET_USER_DATA,
    SET_CONFIRM_RESULT,
} from '../../actions/types';

const INITIAL_STATE = {
    user: null,
    loading: false,
    phone: '',
    confirmResult: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PHONE_CHANGED:
            return { ...state, phone: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload.loading };
        case SET_USER_DATA:
            return { ...state, user: action.payload.user, loading: action.payload.loading };
        case SET_CONFIRM_RESULT:
            return { ...state, confirmResult: action.payload.confirmResult };
        default:
            return state;
    }
};
