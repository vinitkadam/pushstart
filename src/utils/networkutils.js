import firebase, { Firebase } from 'react-native-firebase';

class Service {
    constructor() {
        let service = null;
        service = firebase.firestore();
        this.service = service;
    }

    sendCodeServer(phoneNumber) {

        return new Promise(function(resolve, reject){
            const usersRef = firebase.firestore().collection('users').doc(phoneNumber);
            usersRef.get()
                .then((docSnapshot) => {
                    if (docSnapshot.exists) {
                        usersRef.onSnapshot((doc) => {
                            resolve(doc);
                        });
                    } else {
                        reject(Error('user does not exist'));
                    }
                })
                .catch(error => {
                    reject(error);
                });
            });
    }

}

export default new Service;
