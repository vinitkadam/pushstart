
import firebase from 'react-native-firebase';
import { SET_TOP_INTERESTS } from '../../actions/types';

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
