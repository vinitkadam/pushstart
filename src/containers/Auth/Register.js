import React, { Component } from 'react';
import { Form, Label, Input, Item, Button, Text } from 'native-base';
import { connect } from 'react-redux';
import Validator from 'validator';
import { StatusBar, View, Alert, Platform, ScrollView, NetInfo, ActivityIndicator } from 'react-native';
import { colors } from '../../colors';
import OfflineBar from '../../components/OfflineBar';
import CheckList from '../../components/CheckList';
import { registerWithPhoneNumber } from '../../actions';


// Register screen rendered automatically if no user found
class Register extends Component {
    
    state = { 
        loading: false,
        name: '',
        phone: '',
        email: '',
        interests: [
            { id: 'TECH', name: 'Technology' },
            { id: 'MARK', name: 'Marketing' },
            { id: 'INVE', name: 'Investing' },
            { id: 'INVEBANK', name: 'Investing Banking' },
            { id: 'AI', name: 'Artificial Intelligence' },
            { id: 'ML', name: 'Machine Learning' },
            { id: 'BC', name: 'BlockChain' },
            { id: 'BI', name: 'Business Intelligence' },
            { id: 'GH', name: 'Growth Hacking' },
        ],
        selectedInterests: [],
        designation: ''
    };

    
    onButtonPress() {
        const { name, phone, email, selectedInterests, designation } = this.state;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                if (this.validateInputs()) {
                    this.props.registerWithPhoneNumber(
                        {
                            name, 
                            phoneNumber: '+91'.concat(phone),
                            email, 
                            designation, 
                            interests: selectedInterests 
                        },
                        (navigateToVerifyOtp) => {
                            if (navigateToVerifyOtp) {
                                this.props.navigation.navigate('verifyOtp');
                            } else {
                                this.props.navigation.navigate('register');
                            }
                    });
                }
            } else {
                Alert.alert(
                    'Looks like you are offline',
                    'Please check your internet connection and try again later.',
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
            }
        });
    }
    alertComponent(message) {
        return (
            Alert.alert(
                '',
                message,
                [
                  {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
              )
        );
    }

    validateInputs() {
        const { phone, name, email, selectedInterests, designation } = this.state;
        if (name.length === 0) {
            this.alertComponent('Please enter your name');
            return false;
        } else if (!Validator.isNumeric(phone) || phone.length !== 10) {
            this.alertComponent('Enter a valid phone number');
            return false;
        } else if (!email || !Validator.isEmail(email)){
            this.alertComponent('Enter a valid email address');
            return false;
        } else if (designation.length === 0){
            this.alertComponent('Please enter your designation');
            return false;
        } else if (selectedInterests.length === 0){
            this.alertComponent('Please select atleast 1 interest');
            return false;
        }
        return true;
    }

    renderRegisterButton() {
        if (this.props.loading) {
            return (
                <Button rounded info style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)} disabled>
                    <ActivityIndicator size="small" color='white' />
                </Button> 
            );
        }
        return (
            <Button rounded info style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)} >
                <Text>SIGN UP</Text>
            </Button>
        );
    }

    render() {
        return (
            <View style={styles.containerStyle}>
                <StatusBar
                    translucent
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    animated
                />
                <ScrollView behaviour='padding' style={styles.detailsContainer} keyboardShouldPersistTaps="handled" >
                    <Form style={styles.formStyle} >
                        <Item stackedLabel>
                            <Label>Name</Label>
                            <Input
                                ref='Name'
                                onChangeText={(name) => { this.setState({ name }); }}
                                value={this.state.name}
                                maxLength={100}
                            />
                        </Item>
                        <Item stackedLabel >
                            <Label>Mobile number</Label>
                            <Input
                            ref='MobileNumber'
                            keyboardType="numeric"
                            onChangeText={(phone) => { this.setState({ phone }); }}
                            value={this.state.phone}
                            maxLength={10}
                            minLength={10}
                            />
                        </Item>
                        <Item stackedLabel >
                            <Label>Email</Label>
                            <Input
                            ref='Email'
                            onChangeText={(email) => { this.setState({ email }); }}
                            value={this.state.email}
                            />
                        </Item>
                        <Item stackedLabel >
                            <Label>Designation</Label>
                            <Input
                            ref='Designation'
                            onChangeText={(designation) => { this.setState({ designation }); }}
                            value={this.state.value}
                            />
                        </Item>
                        <CheckList 
                            interests={this.state.interests}
                            selectedInterestsCallback={(selectedInterests) => { this.setState({ selectedInterests }); }}
                        />
                    </Form>
                    <View style={{paddingTop: 10 }}>
                        <Text style={styles.agreementStyle}>By creating an account, you agree to our</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.8)' }}>Terms of Service</Text>
                            <Text style={[styles.agreementStyle, { paddingTop: 0 }]}> & </Text>
                            <Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.8)' }}>Privacy Policy</Text>
                        </View>
                    </View>
                    
                    {this.renderRegisterButton()}
                </ScrollView>
                <OfflineBar />
            </View>
        );
    }
}

const styles = {
    containerStyle: {
        alignItems: 'center',
        backgroundColor: 'white',
        flex: 1,
        marginTop: Platform.OS == 'android' ? 24 : 0,
    },
    topHeader: {
        width: '100%',
        flexDirection: 'row',
        paddingTop: 40,
        paddingBottom: 60,
        paddingLeft: 26,
        paddingRight: 50,
        backgroundColor: colors.darkPurple,
        height: 140
    },
    formStyle: {
        paddingRight: 15
    },
    buttonStyle: {
        width: 200,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkpurple
    },
    agreementStyle: {
        fontSize: 14,
        color: 'rgb(140, 140, 140)',
        textAlign: 'center',
        paddingTop: 15

    },
    detailsContainer: {
        width: '100%',
        backgroundColor: 'white',
        paddingBottom: 10
    }
};

const mapStatetoProps = state => {
    return {
        phone: state.auth.phone,
        name: state.auth.name,
        email: state.auth.email,
        loading: state.auth.loading,
    };
};

export default connect(mapStatetoProps, { registerWithPhoneNumber })(Register);
