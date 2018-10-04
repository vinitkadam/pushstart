// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import firebase from 'react-native-firebase';
// import { StackActions, NavigationActions } from 'react-navigation';
// import { Dimensions, View, StatusBar, Alert, ActivityIndicator, Animated, ScrollView, NetInfo } from 'react-native';
// import { Item, Input, Button, Icon, Text } from 'native-base';
// import { colors } from '../../colors';
// import OfflineBar from '../../components/OfflineBar';
// import { loginInWithPhoneNumber, phoneChanged } from '../../actions';

// // The main lgin screen of the app
// class Login extends Component {
//     state = {
//         fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
//     }

//     componentDidMount() {
//         Animated.timing(
//             this.state.fadeAnim,
//             {
//                 toValue: 1,
//                 duration: 500,
//             }
//         ).start();

//         firebase.auth().onAuthStateChanged((user) => {
//             if (user) {
//               this.props.navigation.dispatch(app);
//             }
//         });
//     }

//     onPhoneChange(text) {
//         this.props.phoneChanged(text);
//     }
    

//     onButtonPress() {
//         NetInfo.isConnected.fetch().then(isConnected => {
//             if (isConnected) {
//                 if (this.props.phone) {
//                     if (this.props.phone.length === 10 ) {
//                         Alert.alert(
//                             'Confirm Mobile Number',
//                             '+ 91 ' + this.props.phone + ' \n Is your phone number correct?',
//                             [
//                                 { text: 'Edit', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
//                                 { 
//                                   text: 'Yes', 
//                                   onPress: () => { 
//                                     this.props.loginInWithPhoneNumber('+91'.concat(this.props.phone), (navigateToVerifyOtp) => {
//                                       if (navigateToVerifyOtp) {
//                                         this.props.navigation.navigate('verifyOtp');
//                                       } else {
//                                         this.props.navigation.navigate('register');
//                                       }
//                                     }); 
//                                   } 
//                                 },
//                             ],
//                             {
//                                 cancelable: false
//                             }
//                         );
                        
//                     } else {
//                         Alert.alert(
//                             'Oops!',
//                             'Looks like you typed a wrong mobile number',
//                             [
//                                 {text: 'OK', onPress: () => console.log('OK Pressed')},
//                             ],
//                             { cancelable: false }
//                             )
//                     }
//                 } else {
//                     Alert.alert(
//                         'Oops!',
//                         'Please enter your mobile number',
//                         [
//                             { text: 'OK', onPress: () => console.log('OK Pressed') },
//                         ],
//                         { cancelable: false }
//                     );  
//                 }
//             } else {
//                 Alert.alert(
//                     'Looks like you are offline',
//                     'Please check your internet connection and try again later.',
//                     [
//                         { text: 'OK', onPress: () => console.log('OK Pressed') },
//                     ],
//                     { cancelable: false }
//                 );
//             }
//         });  
//     }

//     renderLoginButton() {
//         if (this.props.loading) {
//             return (
//                 <Button rounded info style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)} disabled>
//                     <ActivityIndicator size="small" color='white' />
//                 </Button> 
//             );
//         } else {
//             return (
//                 <Button rounded info style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}>
//                     <Text style={styles.buttonTextStyle} >Continue</Text>
//                 </Button>
//             );
//         }
//     }


//     render() {    
//         return (
//         <Animated.View style={{ opacity: this.state.fadeAnim }}>
//             <ScrollView style={styles.container}>
//                     <StatusBar
//                         translucent
//                         backgroundColor="rgba(0, 0, 0, 0.1)"
//                         animated

//                     />

//                     <View style={{ backgroundColor: '#ceb5ff', width: '100%', height: 200, alignItems: 'center', justifyContent: 'center' }}>
//                       <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>PUSHSTART</Text>
//                     </View>

//                     <View style={styles.mNoContainer}>
//                         <View style={styles.countryCode}>
//                             <Item underline style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10 }}>
//                                 <Text style={{ fontSize: 20, color: 'black', fontWeight: '400' }}>
//                                     +91
//                                 </Text>
//                             </Item>
//                         </View>
//                         <View style={styles.mNo}>
//                         <Item>
//                             <Input
//                             placeholder="Mobile Number"
//                             style={{ fontSize: 20 }}                            
//                             onChangeText={this.onPhoneChange.bind(this)}
//                             value={this.props.phone}
//                             keyboardType="numeric"
//                             maxLength={10}
//                             onSubmitEditing={this.onButtonPress.bind(this)}
//                             />
//                         </Item>
//                         </View>
//                     </View>
//                     <View style={styles.smsVerificationTextContainer}>
//                         <Text style={styles.smsVerificationText}>
//                             We'll send you an SMS verication code.
//                         </Text>
//                     </View>
//                     <View style={{ marginTop: 50, marginBottom: 20 }}>
//                     {this.renderLoginButton()}
//                     </View>
//                     <View style={{ marginTop: 20 }}>
//                         <View style={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: 10, backgroundColor: 'white' }}>
//                             <Text>Made with </Text>
//                             <Icon name="md-heart" style={{ color: 'red', fontSize: 21, marginLeft: 3, marginRight: 3 }} />
//                             <Text> in India</Text>
//                         </View>
//                     </View>
//                 </ScrollView>
//                 <OfflineBar />
//             </Animated.View>
//         );
//     }
// }

// const app = StackActions.reset({
//     index: 0,
//     actions: [NavigationActions.navigate({ routeName: 'app' })],
// });

// const win = Dimensions.get('window');
// const ratio = win.width / 541;
// const styles = {
//     container: {
//         backgroundColor: 'white',
//         height: '100%'
//     },
//     headerStyle: {
//         backgroundColor: colors.grey,
//         alignItems: 'center'
//     },
//     buttonStyle: {
//         width: 150,
//         padding: 5,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: colors.purple
//     },
//     buttonTextStyle: {
//         color: 'rgba(255,255,255,1)',
//         fontSize: 18,
//     },
//     mNoContainer: {
//         marginTop: 100,
//         margin: 20,
//         flexDirection: 'row',
//     },
//     countryCode: {
//         padding: 10,
//         flex: 2,
//     },
//     mNo: {
//         padding: 10,        
//         flex: 8,
//     },
//     smsVerificationTextContainer: {
//         justifyContent: 'center',
//         flex: 1,
//         alignItems: 'center',
//     },
//     smsVerificationText: {
//         color: '#828282'
//     }
// };

// const mapStateToProps = state => {
//   return {
//       phone: state.auth.phone,
//       user: state.auth.user,
//       loading: state.auth.loading,
//   };
// };

// export default connect(mapStateToProps, { phoneChanged, loginInWithPhoneNumber })(Login);


import React, { Component } from 'react';
import { Text, View, Dimensions, Image, Platform, ActivityIndicator, Alert } from 'react-native';
import { Button, Icon, Content } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import LinkedInModal from 'react-native-linkedin';
import { connect } from 'react-redux';
import EntypoIcons from 'react-native-vector-icons/Entypo'

import { saveUserData } from './AuthActions';

const CLIENT_ID = '81fruwrt17xdu6';
const CLIENT_SECRET = '8QTQQIa9EEnkbOMo';


class Login extends Component {
    
    state = {
        access_token: undefined,
        expires_in: undefined,
        refreshing: false,
    }

    async getUser({ access_token }) {
        this.setState({ refreshing: true })
        const baseApi = 'https://api.linkedin.com/v1/people/'
        const qs = { format: 'json' }
        const params = [
            'id',
            'first-name',
            'last-name',
            'picture-urls::(original)',
            'headline',
            'email-address',
            'location',
            'industry',
            'summary',
            'specialties',
            'num-connections',
            'positions',
        ];
    
        const response = await fetch(`${baseApi}~:(${params.join(',')})?format=json`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + access_token,
            },
        })
        const payload = await response.json()
        console.log(payload);

        this.props.saveUserData(payload, (nav) => {
            if (nav === 'app') {
                this.props.navigation.navigate('app');
            } else if (nav === 'after_loader') {
                this.props.navigation.navigate('after_loader')
            } else {
                Alert.alert(
                    'Oops',
                    'Something went wrong. Please try again later.',
                    [
                        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            }
        });
        this.setState({ ...payload, refreshing: false });
    }

    render() {
        const { emailAddress, refreshing } = this.state;
        return (
            <View style={styles.container}>
                
                {!emailAddress &&
                    !refreshing && (
                        <Content>
                        <View style={[styles.innerContainer, { paddingTop: 0 }]}>
                            <View style={{ marginHorizontal: 40 }}>
                                <Text style={styles.heading}>Join Pushstart</Text>
                                <Text style={{ fontFamily: 'Poppins-Light' }}>Join the amazing community of Entrepreneurs.</Text>
                            </View>
                            <Image 
                                source={require('./images/login.png')}
                                style={styles.imageStyle}
                            />

                            <LinkedInModal
                                ref={ref => {
                                    this.modal = ref  
                                }}
                                clientID={CLIENT_ID}
                                clientSecret={CLIENT_SECRET}
                                redirectUri="https://pushstart.in"
                                onSuccess={data => this.getUser(data)}
                                renderButton={() => {
                                    return (
                                        <Button iconLeft style={styles.buttonStyle} onPress={() => this.modal.open()}>
                                            <EntypoIcons name="linkedin" style={{ color: 'white', fontSize: 20, marginRight: 10 }}/>
                                            <Text style={{ color: 'white', fontSize: 16, fontFamily: 'Poppins-Medium' }}>Login with Linkedin</Text>
                                        </Button>
                                    );
                                }}
                            />
                            
                            <Text style={styles.bottomText}>
                                <Text>By signing up you agree to our </Text>
                                <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Terms of Use </Text>
                                <Text>and </Text>
                                <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Privacy Policy</Text>
                            </Text>
                        </View>
                        </Content>

                    )
                }
                
                {refreshing && <ActivityIndicator size="large" />}
            </View>
        );
    }
}

const win = Dimensions.get('window');

const ratio1 = win.width / 1083;

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: Platform.OS === 'android' ? 24 : 0,
        justifyContent: 'space-around',
    },
    innerContainer: {
        backgroundColor: 'white',
        marginTop: 24,
        justifyContent: 'space-around',
    },
    heading: {
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        fontSize: 24,
    },
    desc: {
        fontFamily: 'Poppins-Light',
        fontSize: 16,
        color: 'grey'
    },
    imageStyle: {
        width: win.width,
        height: 1087 * ratio1,
    },
    buttonStyle: {
        marginBottom: 10,
        backgroundColor: '#3d83d9',
        alignSelf: 'center',
        width: win.width - 80,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    bottomText: {
        fontFamily: 'Poppins-Light',
        fontSize: 12, 
        color: 'grey',
        width: win.width - 120,
        alignSelf: 'center',
        textAlign: 'center',
        marginBottom: 20

    }
};

export default connect(null, { saveUserData })(Login);
