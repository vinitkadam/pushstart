import React, { Component} from 'react';
import { Text, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'native-base';
import { colors } from '../../colors';

class PushTrendsItem extends Component {
    
    state = { 
        animatePress: new Animated.Value(1)
    }

    animateIn() {
        Animated.timing(this.state.animatePress, {
            toValue: 0.96,
            duration: 100,
            useNativeDriver: true
        }).start();
    }

    animateOut() {
        Animated.timing(this.state.animatePress, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
        }).start();
    }
    
    render() {
        const { eventName, eventSpeaker, eventDesc, eventHashTag } = this.props.data;
        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut()}
            >
                <Animated.View 
                    style={[styles.container, {
                        transform: [
                            {
                                scale: this.state.animatePress
                            }
                        ]
                    }]}
                >
                    <Image source={require('./images/pt_1.png')} style={styles.imageStyle}/>
                    <View style={styles.eventDescContainer}>
                        <Text style={styles.hashTag}>{eventHashTag}</Text>
                        <Text style={styles.eventName}>{eventName}</Text>
                        <Text style={styles.eventSpeaker}>{eventSpeaker}</Text>
                        <Text style={styles.eventDesc}>{eventDesc}</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    container: {
        width: 250,
        shadowColor: colors.darkpurple,
        elevation: 5,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 5,
        shadowOpacity: 1,
        margin: 10,
        marginTop: 20,
        marginBottom: 20,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    imageStyle: {
        height: 130,
        width: 250
    },
    serviceName: {
        fontFamily: 'Poppins-Light',
        paddingTop: 5,
        fontSize: 14,
        color: 'grey'
    },
    eventDescContainer: {
        padding: 10,
    },
    hashTag: {
        fontFamily: 'Poppins-Light',
        fontSize: 10,
    },
    eventName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
    },
    eventSpeaker: {
        fontFamily: 'Poppins-Light',
        fontSize: 10
    },
    eventDesc: {
        fontFamily: 'Poppins-Light',
        fontSize: 10
    }
};

export default PushTrendsItem;
