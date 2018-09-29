import firebase from 'react-native-firebase';
import moment from 'moment';
import {
    PHONE_CHANGED,
    SET_LOADING,
    SET_USER_DATA,
    SET_CONFIRM_RESULT,
    SAVE_USER_DATA,
    SET_PHONE,
    SET_EMAIL,
    SET_NAME,
    SET_CITY,
    UPDATE_USER_DATA,
} from '../../actions/types';
import axios from 'axios';

export const setPhone = (text) => {
    return {
        type: SET_PHONE,
        payload: text
    };
};

export const setEmail = (text) => {
    return {
        type: SET_EMAIL,
        payload: text
    };
};

export const setName = (text) => {
    return {
        type: SET_NAME,
        payload: text
    };
};

export const setCity = (text) => {
    return {
        type: SET_CITY,
        payload: text,
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

export const saveUserData = (user, callback) => {
    return (dispatch) => {
        dispatch({ type: SAVE_USER_DATA, payload: user });
        const usersRef = firebase.firestore().collection('users').doc(user.emailAddress);
        usersRef.get()
            .then((docSnapshot) => {
                console.log('docSnapShot', docSnapshot);
                if (docSnapshot.exists) {
                    dispatch({ type: SET_USER_DATA, payload: { user: docSnapshot.data(), loading: false } });
                    if (docSnapshot.data().interests) {
                        callback('app');
                    } else {
                        callback('after_loader');
                    }
                    firebase.messaging().getToken()
                    .then(fcmToken => {
                        if (fcmToken) {
                            firebase.firestore().collection('users').doc(user.emailAddress).set({
                                fcmToken
                            }, { merge: true });
                        } else {
                            // user doesn't have a device token yet
                        } 
                    });
                } else {
                    firebase.messaging().getToken()
                    .then(fcmToken => {
                        firebase.firestore().collection('users').doc(user.emailAddress).set({
                            linkedInId: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            name: user.firstName + ' ' + user.lastName,
                            headline: user.headline,
                            industry: user.industry,
                            numConnections: user.numConnections,
                            pictureUrls: user.pictureUrls,
                            positions: user.pictureUrls,
                            summary: user.summary,
                            location: user.location,
                            emailAddress: user.emailAddress,
                            fcmToken: fcmToken ? fcmToken : null,
                            createdAt: moment().format(),
                        })
                        .then(() => {
                            callback('after_loader');
                        })
                        .catch(() => {
                            callback('error');
                        }); 
                    });
                }
            });
            
        const callableAuthToken = firebase.functions().httpsCallable('authToken');

        callableAuthToken(user)
        .then((data) => {
            console.log(data); // hello world
        })
        .catch(httpsError => {
            console.log(httpsError); // invalid-argument
        });

        // axios({
        //     method: 'post',
        //     url: 'https://us-central1-pushstart-38483.cloudfunctions.net/authtoken',
        //     data: user
        // })
        // .then(data => {
        //     console.log(data);
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    };
};

export const saveUserInFirestore = (user, callback) => {
    return (dispatch) => {
        dispatch({ type: UPDATE_USER_DATA, payload: user });
        firebase.firestore().collection('users').doc(user.emailAddress).set({
            name: user.name,
            phoneNumber: user.phoneNumber,
            city: user.city
        }, { merge: true })
        .then(() => {
            callback('interests');
        })
        .catch(() => {
            callback('error');
        });
    };
};
