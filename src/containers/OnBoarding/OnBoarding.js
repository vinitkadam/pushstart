import React, { Component } from 'react';
import { Text, View, Dimensions, Image, StatusBar } from 'react-native';
import { Icon, Button } from 'native-base';

import Swiper from './Swiper';
import { colors } from '../../colors';

const { width, height } = Dimensions.get('window');

class OnBoarding extends Component {

    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor={colors.darkpurple}
                    barStyle="light-content"
                />
                <View style={styles.container}>
                    <Swiper navigation={this.props.navigation}>
                        {/* First screen */}
                        <View style={[styles.slide]}>
                            <Image source={require('./images/one.png')} style={styles.imgStyle}/>
                            <Text style={styles.header}>
                                Welcome to India’s largest community for Entrepreneur’s
                            </Text>
                        </View>
                        {/* Second screen */}
                        <View style={[styles.slide]}>
                            <Image source={require('./images/two.png')} />
                            <Text style={styles.header}>
                                Learn, Share Knowledge and grow your business
                            </Text>
                        </View>
                        {/* Third screen */}
                        <View style={[styles.slide]}>
                            <Image source={require('./images/one.png')} />
                            <Text style={styles.header}>
                                Build your personal brand and increase visibility
                            </Text>
                        </View>
                    </Swiper>
                </View>
                <View style={styles.bottonContainer}>
                    <Button info style={styles.buttonStyle} onPress={() => { this.props.navigation.navigate('auth'); }}>
                        <Text style={styles.buttonTextStyle} >GET STARTED</Text>
                    </Button>
                </View>
            </View>

        );
    }
}
const styles = {
    container: {
        backgroundColor: '#ffffff',
        height: height - 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 18,
        color: '#865ed0',
        marginHorizontal: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,

    },
    slide: {
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 50,
        alignItems: 'center',
        padding: 15,
    },
    bottonContainer: {
        backgroundColor: 'white',
        height: 200,
        alignItems: 'center',
    },
    buttonStyle: {
        width: 150,
        padding: 5,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#865ed0',
        borderRadius: 6,
        marginTop: 40,
    },
    buttonTextStyle: {
        color: 'rgba(255,255,255,1)',
        fontSize: 18,
    }
};

const iconStyles = {
    size: 100,
    color: "#FFFFFF"
};

export default OnBoarding;
