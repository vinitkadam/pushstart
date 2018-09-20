import { SET_TOP_INTERESTS } from "../../actions/types";

const INITIAL_STATE = {
    topInterests: [],
    interestsLoaded: 'false'
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_TOP_INTERESTS:
            console.log("SET_TOP_INTERESTS");
            return { ...state, topInterests: action.payload, interestsLoaded: 'true' };
        default:
            return { ...state };
    }
};
