import firebase from 'react-native-firebase';
import {
    PHONE_CHANGED,
    SET_LOADING,
    SET_USER_DATA,
    SET_CONFIRM_RESULT,
} from '../../actions/types';

//phone input on the signup/login page
export const phoneChanged = (text) => {
    return {
        type: PHONE_CHANGED,
        payload: text
    };
};

export const loginInWithPhoneNumber = (phoneNumber, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADING, payload: { loading: true } });
        const usersRef = firebase.firestore().collection('users').doc(phoneNumber);
        usersRef.get()
            .then((docSnapshot) => {
                console.log('docSnapShot', docSnapshot);
                if (docSnapshot.exists) {
                    dispatch({ type: SET_USER_DATA, payload: { user: docSnapshot.data(), loading: false } });
                    firebase.auth().signInWithPhoneNumber(phoneNumber)
                        .then(confirmResult => { 
                            console.log("confirmresult", confirmResult);
                            const uid = confirmResult._auth._user.uid;
                            console.log("uid: ", uid);
                            dispatch({ SET_CONFIRM_RESULT, payload: confirmResult });
                        })
                        .catch(error => { console.log(error); });
                    callback(true);
                } else {
                    dispatch({ type: SET_LOADING, payload: { loading: false } });
                    callback(false);
                }
            });
    }
};

export const registerWithPhoneNumber = ({ name, phoneNumber, email, designation, interests }, callback) => {
    return (dispatch) => {
        dispatch({ type: SET_LOADING, payload: { loading: true } });
        firebase.firestore().collection('users').doc(phoneNumber).set({
            id: '',
            name,
            phoneNumber,
            email,
            designation,
            interests
        })
        .then(() => {
            const usersRef = firebase.firestore().collection('users').doc(phoneNumber);
            usersRef.get()
                .then((docSnapshot) => {
                    console.log('docSnapShot', docSnapshot);
                    if (docSnapshot.exists) {
                        dispatch({ type: SET_USER_DATA, payload: { user: docSnapshot.data(), loading: false } });
                        firebase.auth().signInWithPhoneNumber(phoneNumber)
                            .then(confirmResult => { 
                                console.log("confirmresult", confirmResult);
                                const uid = confirmResult._auth._user.uid;
                                console.log("uid: ", uid);
                                dispatch({ SET_CONFIRM_RESULT, payload: confirmResult });
                            })
                            .catch(error => { console.log(error); });
                        callback(true);
                    } else {
                        dispatch({ type: SET_LOADING, payload: { loading: false } });
                        callback(false);
                    }
                });
            })
        .catch(
            error => { console.log(error);
        });
    };
};
