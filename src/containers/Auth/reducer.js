import {
    PHONE_CHANGED,
    SET_LOADING,
    SET_USER_DATA,
    SET_CONFIRM_RESULT,
    SAVE_USER_DATA,
    SET_NAME,
    SET_EMAIL,
    SET_PHONE,
    SET_CITY,
    UPDATE_USER_DATA,
    SET_SELECTED_INTERESTS,
} from '../../actions/types';

const INITIAL_STATE = {
    user: {
        emailAddress: '',
        firstName: '',
        lastName: '',
        headline: '',
        id: '',
        industry: '',
        numConnections: '',
        pictureUrls: [],
        positions: {},
        summary: '',
        location: {
            country: '',
            name: ''
        }
    },
    loading: false,
    phoneNumber: '',
    confirmResult: null,
    emailAddress: '',
    linkedInId: '',
    firstName: '',
    lastName: '',
    name: 'Name',
    headline: 'headline',
    industry: '',
    interests: [],
    numConnections: 0,
    pictureUrls: {
        values: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNLzZszQbQf6jkknIGI8A3rj-0BoEngyi9156njfrCjPED9_b2vw'
        ]
    },
    positions: {},
    summary: '',
    location: {
        country: '',
        name: ''
    },
    city: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case PHONE_CHANGED:
            return { ...state, phone: action.payload };
        case SET_NAME:
            return { ...state, name: action.payload };
        case SET_EMAIL:
            return { ...state, emailAddress: action.payload };
        case SET_PHONE:
            return { ...state, phoneNumber: action.payload };
        case SET_CITY:
            return { ...state, city: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload.loading };
        case SET_USER_DATA:
            return { ...state, 
                user: action.payload.user, 
                loading: action.payload.loading,
                interests: action.payload.user.interests,
                linkedInId: action.payload.user.id,
                firstName: action.payload.user.firstName,
                lastName: action.payload.user.lastName,
                name: action.payload.user.name,
                headline: action.payload.user.headline,
                industry: action.payload.user.industry,
                numConnections: action.payload.user.numConnections,
                pictureUrls: action.payload.user.pictureUrls,
                positions: action.payload.user.pictureUrls,
                summary: action.payload.user.summary,
                location: action.payload.user.location,
                emailAddress: action.payload.user.emailAddress,
            };
        case SET_CONFIRM_RESULT:
            return { ...state, confirmResult: action.payload.confirmResult };
        case SAVE_USER_DATA:
            console.log("SAVE_USER_DATA")
            return { ...state, 
                user: action.payload,
                linkedInId: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                name: action.payload.firstName + ' ' + action.payload.lastName,
                headline: action.payload.headline,
                industry: action.payload.industry,
                numConnections: action.payload.numConnections,
                pictureUrls: action.payload.pictureUrls,
                positions: action.payload.pictureUrls,
                summary: action.payload.summary,
                location: action.payload.location,
                emailAddress: action.payload.emailAddress,
            };
        case UPDATE_USER_DATA: 
            return { ...state,
                name: action.payload.name,
                phoneNumber: action.payload.phoneNumber,
                city: action.payload.city,
            };
        case SET_SELECTED_INTERESTS:
            console.log(action.payload);
            return { ...state, interests: action.payload };
        default:
            return state;
    }
};
