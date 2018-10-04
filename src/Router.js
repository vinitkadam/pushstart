import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { 
    createStackNavigator, 
    createBottomTabNavigator,
    createSwitchNavigator,
    createMaterialTopTabNavigator
} from 'react-navigation';

import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'native-base';

import SplashScreen from './containers/SplashScreen/SplashScreen';
import OnBoarding from './containers/OnBoarding/OnBoarding';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import HomeScreen from './containers/HomeScreen/HomeScreen';
import AfterLoader from './containers/AfterLoader';
import Interests from './containers/Interests';
import ProfileScreen from './containers/ProfileScreen';
import ArchiveScreen from './containers/ArchiveScreen';
import EventDescScreen from './containers/EventDescScreen';
import { colors } from './colors';

/**
 * createSwitchNavigator - Only Show ONE SCREEN/STACK at one time
 *  1. Loading Screen (Splash Screen)
 *  2. Onboarding Screen
 *  3. Authentication StackNavigator
 *      - LinkedIn login Screen
 *      - AfterLoader Screen
 *      - Enter Details Screen (Register)
 *      - Interests Screen
 *  3. AppTAbNavigator
 *      - Notifications tab (Home)
 *      - Archieve tab
 *      - Profile tab
 */

const AuthStackNavigator = createStackNavigator({
    login: Login,
    after_loader: AfterLoader,
    register: Register,
    interests: Interests
},
{
    headerMode: 'none',
});

class AppTabNavigator extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <AppTabNavigatorComponent />
            </SafeAreaView>
        );
    }
}

const NotificationStack = createStackNavigator({
    home: HomeScreen,
    eventDesc: EventDescScreen
},
{
    headerMode: 'none'
});

const ArchieveStack = createStackNavigator({
    archives: ArchiveScreen,
    eventDesc: EventDescScreen,
},
{
    headerMode: 'none'
});

const AppTabNavigatorComponent = createMaterialTopTabNavigator({
    Notification: NotificationStack,
    Archive: ArchieveStack,
    Profile: ProfileScreen
},
{
    initialRouteName: 'Notification',
    headerMode: 'none',
    swipeEnabled: false,
    tabBarOptions: {
        activeTintColor: colors.purple,
        inactiveTintColor: 'grey',
        style: {
            backgroundColor: 'white',  
        },
        indicatorStyle: {
            height: 0
        },
        showIcon: true,
        upperCaseLabel: false,
        labelStyle: {
            fontFamily: 'Poppins-Regular',
            fontSize: 10,
            margin: 0
        },
        pressColor: colors.lightPurple,
        
    },
    tabBarPosition: 'bottom',
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Notification') {
                iconName = `bell${focused ? '' : '-outline'}`;
                return <MaterialComunityIcons name={iconName} size={25} color={tintColor} />;
            } else if (routeName === 'Profile') {
                iconName = `person${focused ? '' : '-outline'}`;
                return <MaterialIcons name={iconName} size={25} color={tintColor} />;
            } else if (routeName === 'Archive') {
                return <MaterialIcons name="archive" size={25} color={tintColor} />;
            }                    
        },
    }),
});

const AppStackNavigator = createStackNavigator({
    AppTabNavigator: {
        screen: AppTabNavigator,
    },
    eventDesc: EventDescScreen,
},
{
    headerMode: 'none',
});

const MainNavigator = createSwitchNavigator({
    splashScreen: SplashScreen,
    onBoarding: OnBoarding,
    auth: AuthStackNavigator,
    app: AppStackNavigator,
},
{
    headerMode: 'none',
    initialRouteName: 'app'
});

export default MainNavigator;
