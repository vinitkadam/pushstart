import React,{ Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

class SplashScreen extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.props.navigation.navigate('app');
            } else {
                this.props.navigation.navigate('auth');
            }
          });		
    }

    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff', flex: 1 }}>
                <ActivityIndicator size="large" color={'#009993'} />
            </View>
        );
    }

}

export default SplashScreen;