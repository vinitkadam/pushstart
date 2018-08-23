import { 
    createStackNavigator, 
    createBottomTabNavigator
} from 'react-navigation';

import SplashScreen from './containers/SplashScreen';
import OnBoarding from './containers/OnBoarding';
import Login from './containers/Login';
import VerifyOtp from './containers/VerifyOtp';
import Register from './containers/Register';
import HomeScreen from './containers/HomeScreen';

const MainNavigator = createStackNavigator({
    splashScreen: {
        screen: SplashScreen,
    },
    onBoarding: {
        screen: OnBoarding
    },
    auth: createStackNavigator({
        login:{
            screen: Login
        },
        verifyOtp: {
            screen: VerifyOtp
        },
        register: {
            screen: Register
        }
    },
    {
        initialRouteName: 'login',
        headerMode: 'none',
        navigationOptions: {
            
        }
    }),
    app: createBottomTabNavigator({
            home:{
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
    initialRouteName: 'splashScreen',
    headerMode: 'none',
    navigationOptions: {

    }
});

export default MainNavigator;