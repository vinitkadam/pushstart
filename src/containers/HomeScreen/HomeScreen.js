import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button } from 'native-base';
import firebase from 'react-native-firebase';

class HomeScreen extends Component {
    
    signOut = () => {
        firebase.auth().signOut();
    }
    
    render() {
        return (
            <View
                style={{
                padding: 15,
                backgroundColor: '#fefefe',
                flex: 1,
                }}
            >
                <Button color="red" onPress={this.signOut}>
                    <Text>Sign Out</Text>
                </Button>
            </View>
        );
    }
}

export default HomeScreen;
