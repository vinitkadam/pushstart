import React, { Component } from 'react';
import { View, Text, TextInput, Image, StatusBar, Dimensions, Animated } from 'react-native';
import { Item, Input, Button } from 'native-base';

import firebase from 'react-native-firebase';
import OfflineBar from '../components/OfflineBar';

const successImageUri = 'https://cdn.pixabay.com/photo/2015/06/09/16/12/icon-803718_1280.png';

export default class PhoneAuthTest extends Component {
  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.state = {
      user: null,
      message: '',
      codeInput: '',
      phoneNumber: '+44',
      confirmResult: null,
      fadeAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user.toJSON() });
      } else {
        // User has been signed out, reset the state
        this.setState({
          user: null,
          message: '',
          codeInput: '',
          phoneNumber: '',
          confirmResult: null,
        });
      }
    });

    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 500,
      }
    ).start();
  }

  componentWillUnmount() {
     if (this.unsubscribe) this.unsubscribe();
  }

  signIn = () => {
    const { phoneNumber } = this.state;
    const phoneNumberWithCountryCode = '+91'.concat(phoneNumber);
    this.setState({ message: 'Sending code ...' });

    firebase.auth().signInWithPhoneNumber(phoneNumberWithCountryCode)
      .then(confirmResult => this.setState({ confirmResult, message: 'Code has been sent!' }))
      .catch(error => this.setState({ message: `Sign In With Phone Number Error: ${error.message}` }));
  };

  confirmCode = () => {
    const { codeInput, confirmResult } = this.state;

    if (confirmResult && codeInput.length) {
      confirmResult.confirm(codeInput)
        .then((user) => {
          this.setState({ message: 'Code Confirmed!' });
        })
        .catch(error => this.setState({ message: `Code Confirm Error: ${error.message}` }));
    }
  };

  signOut = () => {
    firebase.auth().signOut();
  }

  renderPhoneNumberInput() {
   const { phoneNumber } = this.state;

    return (
      <View>
        
        <StatusBar
            translucent
            backgroundColor="rgba(0, 0, 0, 0.1)"
            animated

        />
        <View style={{ backgroundColor: '#00ddd5', height: 200, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold' }}>PUSHSTART</Text>
        </View>
        <View style={styles.mNoContainer}>
            <View style={styles.countryCode}>
                <Item underline style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 10 }}>
                    <Text style={{ fontSize: 20, color: 'black', fontWeight: '400' }}>
                        +91
                    </Text>
                </Item>
            </View>
            <View style={styles.mNo}>
            <Item>
                <Input
                  autoFocus
                  style={{ fontSize: 20 }}
                  onChangeText={value => this.setState({ phoneNumber: value })}
                  placeholder={'Mobile Number'}
                  value={phoneNumber}
                />
            </Item>
            </View>
        </View>
        <Button rounded info style={styles.buttonStyle} onPress={this.signIn}>
          <Text style={styles.buttonTextStyle} >Continue</Text>
        </Button>
      </View>

    );
  }

  renderMessage() {
    const { message } = this.state;

    if (!message.length) return null;

    return (
      <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
    );
  }

  renderVerificationCodeInput() {
    const { codeInput } = this.state;

    return (
      <View style={{ marginTop: 25, padding: 25 }}>
        <Text>Enter verification code below:</Text>
        <TextInput
          autoFocus
          style={{ height: 40, marginTop: 15, marginBottom: 15 }}
          onChangeText={value => this.setState({ codeInput: value })}
          placeholder={'Code ... '}
          value={codeInput}
        />
        <Button title="Confirm Code" color="#841584" onPress={this.confirmCode} />
      </View>
    );
  }


  render() {
    const { user, confirmResult } = this.state;
    return (
      <Animated.View style={{ opacity: this.state.fadeAnim, flex: 1 }}>
      <ScrollView style={styles.container}>
      <OfflineBar />

        {!user && !confirmResult && this.renderPhoneNumberInput()}

        {this.renderMessage()}

        {!user && confirmResult && this.renderVerificationCodeInput()}

        {user && (
          <View
            style={{
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#77dd77',
              flex: 1,
            }}
          >
            <Image source={{ uri: successImageUri }} style={{ width: 100, height: 100, marginBottom: 25 }} />
            <Text style={{ fontSize: 25 }}>Signed In!</Text>
            <Text>{JSON.stringify(user)}</Text>
            <Button color="red" onPress={this.signOut}>
              <Text>Sign Out</Text>
            </Button>
          </View>
        )}
        </ScrollView>
      </Animated.View>
    );
  }
}

const win = Dimensions.get('window');
const ratio = win.width / 541;
const styles = {
    container: {
        backgroundColor: 'white',
        height: '100%'
    },
    headerStyle: {
        backgroundColor: '#fefefe',
        alignItems: 'center'
    },
    buttonStyle: {
        width: 150,
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#128c87'
    },
    buttonTextStyle: {
        color: 'rgba(255,255,255,1)',
        fontSize: 18,
    },
    mNoContainer: {
        marginTop: 100,
        margin: 20,
        flexDirection: 'row',
    },
    countryCode: {
        padding: 10,
        flex: 2,
    },
    mNo: {
        padding: 10,        
        flex: 8,
    },
    imageBackground: {
        width: win.width,
        height: 240 * ratio, 
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    smsVerificationTextContainer: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
    },
    smsVerificationText: {
        color: '#828282'
    }
};