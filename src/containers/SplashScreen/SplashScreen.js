import React,{ Component } from 'react';
import { Text, View, ActivityIndicator, AsyncStorage, Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

class SplashScreen extends Component {

    state = { loggedIn: null };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              this.props.navigation.dispatch(app);
            } else {
                const isFirstTimeLogin = this.getIsFirstTimeLogin();
                console.log("isFirstTimeLogin", isFirstTimeLogin);
                if (isFirstTimeLogin === false) {
                    this.props.navigation.dispatch(auth);
                } else {
                    this.props.navigation.dispatch(onBoarding);
                }
            }
          });		
    }

    async getIsFirstTimeLogin() {
        const isFirstTimeLogin = await AsyncStorage.getItem('isFirstTimeLogin');
        return isFirstTimeLogin;
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color={'#009993'} />
            </View>
        );
    }

}

const onBoarding = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'onBoarding' })],
});

const auth = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'auth' })],
});

const app = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'app' })],
});

const styles = {
    container: {
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: '#ffffff', 
        flex: 1,
        marginTop: 24, //Platform.OS === 'amdroid' ? 24 : 0,
    }
};

export default SplashScreen;
