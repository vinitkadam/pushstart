import React from 'react';
import { 
    createStackNavigator, 
    createBottomTabNavigator
} from 'react-navigation';

import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Icon } from 'native-base';

import SplashScreen from './containers/SplashScreen/SplashScreen';
import OnBoarding from './containers/OnBoarding/OnBoarding';
import Login from './containers/Auth/Login';
import VerifyOtp from './containers/Auth/VerifyOtp';
import Register from './containers/Auth/Register';
import HomeScreen from './containers/HomeScreen/HomeScreen';
import AfterLoader from './containers/AfterLoader';
import Interests from './containers/Interests';
import ProfileScreen from './containers/ProfileScreen';
import ArchiveScreen from './containers/ArchiveScreen';
import { colors } from './colors';



const MainNavigator = createStackNavigator({
    splashScreen: {
        screen: SplashScreen,
    },
    onBoarding: {
        screen: OnBoarding
    },
    // auth: createStackNavigator({
        login: {
            screen: Login
        },
        // verifyOtp: {
        //     screen: VerifyOtp
        // },
        after_loader: {
            screen: AfterLoader
        },
        register: {
            screen: Register
        },
    // },
    // {
    //     initialRouteName: 'login',
    //     headerMode: 'none',
    //     navigationOptions: {
            
    //     }
    // }),
    interests: {
        screen: Interests
    },
    app: createBottomTabNavigator({
            Notification: {
                screen: HomeScreen,
            },
            Archive: {
                screen: ArchiveScreen,
            },
            Profile: {
                screen: ProfileScreen,
            }
        },
        {
            initialRouteName: 'Notification',
            headerMode: 'none',
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
            tabBarOptions: {
                showIcon: true,
                activeTintColor: colors.purple,
                style: {
                    backgroundColor: 'white',
                    height: 60,
                    elevation: 5,
                    padding: 5,
                    shadowColor: colors.darkpurple,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 1,
                }
            }
        }
    )
},{
    // initialRouteName: 'login',
    initialRouteName: 'splashScreen',
    headerMode: 'none',
    navigationOptions: {

    }
});

export default MainNavigator;
