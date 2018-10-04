import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import { StackActions, NavigationActions } from 'react-navigation';

class SplashScreen extends Component {

    state = { loggedIn: null };

    componentDidMount() {
        const isLoggedIn = this.getIsLoggedIn();

        if (isLoggedIn === 'true') {
            this.setFirstTimeLogin();
            this.props.navigation.navigate('app');
        } else {
            const isFirstTimeLogin = this.getIsFirstTimeLogin();
            console.log('isFirstTimeLogin', isFirstTimeLogin);
            if (isFirstTimeLogin === 'false') {
                this.props.navigation.dispatch('auth');
            } else {
                this.props.navigation.navigate('onBoarding');
            }
        }		
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();
    }


    async getIsFirstTimeLogin() {
        const isFirstTimeLogin = await AsyncStorage.getItem('isFirstTimeLogin');
        return isFirstTimeLogin;
    
    }
    async getIsLoggedIn() {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
        return isLoggedIn;
    }

    async setFirstTimeLogin() {
        await AsyncStorage.setItem('isFirstTimeLogin', 'true');
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

const login = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'login' })],
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
