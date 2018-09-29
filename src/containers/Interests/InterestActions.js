
import firebase from 'react-native-firebase';
import { SET_TOP_INTERESTS, SET_SELECTED_INTERESTS } from '../../actions/types';

export const getTopInterests = () => {
    return (dispatch) => {
        firebase
        .firestore()
        .collection('interests')
        .orderBy('count', 'desc')
        .limit(6)
        .get()
        .then((docSnapshot) => {
            console.log('docSnapShot', docSnapshot.docs);
            dispatch({ type: SET_TOP_INTERESTS, payload: docSnapshot.docs });
        })
        .catch((error) => {
            console.log(error);
        });
    };
};

export const setSelectInterests = (selectedInterests) => {
    return (dispatch) => { 
        dispatch({
            type: SET_SELECTED_INTERESTS,
            payload: selectedInterests,
        });
    };
};

export const setUserInterests = (selectedInterests, emailAddress, callback) => {
    return (dispatch) => {
        firebase
        .firestore()
        .collection('users')
        .doc(emailAddress)
        .set({
            interests: selectedInterests
        }, { merge: true })
        .then(() => {
            
            callback('app');
            
        })
        .catch(() => {
            callback('error');
        });
    }

};
