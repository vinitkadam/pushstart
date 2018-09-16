import { 
    createStackNavigator, 
    createBottomTabNavigator
} from 'react-navigation';

import SplashScreen from './containers/SplashScreen/SplashScreen';
import OnBoarding from './containers/OnBoarding/OnBoarding';
import Login from './containers/Auth/Login';
import VerifyOtp from './containers/Auth/VerifyOtp';
import Register from './containers/Auth/Register';
import HomeScreen from './containers/HomeScreen/HomeScreen';
import AfterLoader from './containers/AfterLoader';
import Interests from './containers/Interests';

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
            home: {
                screen: HomeScreen
            },
        },
        {
            initialRouteName: 'home',
            headerMode: 'none',
            navigationOptions: {
                
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
