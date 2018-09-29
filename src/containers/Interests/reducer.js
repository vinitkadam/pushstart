import { SET_TOP_INTERESTS, SET_SELECTED_INTERESTS } from "../../actions/types";

const INITIAL_STATE = {
    topInterests: [],
    interestsLoaded: 'false',
    selectedInterests: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TOP_INTERESTS:
            console.log("SET_TOP_INTERESTS");
            return { ...state, topInterests: action.payload, interestsLoaded: 'true' };
        case SET_SELECTED_INTERESTS:
            console.log("SET_SELECTED_INTERESTS");
            console.log(action.payload);
            return { ...state, selectedInterests: action.payload };
        default:
            return { ...state };
    }
};
