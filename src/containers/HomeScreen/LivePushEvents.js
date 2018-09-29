import React, { Component} from 'react';
import { Text, View, Image, ImageBackground, Animated, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'native-base';
import Icon from 'react-native-vector-icons/Octicons';
import { colors } from '../../colors';

const LiveImage = () => {
    return (
        <ImageBackground source={require('./images/pt_1.png')} style={styles.imageStyle}>
            <View style={{ backgroundColor: 'red', flexDirection: 'row', padding: 2, paddingHorizontal: 5, position: 'absolute', bottom: 0, right: 0 }}>
                <Icon name="primitive-dot" style={{ color: 'white', fontSize: 20 }} />
                <Text style={{ color: 'white' }}>LIVE</Text>
            </View>
        </ImageBackground>
    )
}

class LivePushEvents extends Component {
    
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
                    <LiveImage />
                    <View style={styles.eventDescContainer}>
                        <Text style={styles.serviceName}>{eventHashTag}</Text>
                        <Text style={styles.serviceName}>{eventName}</Text>
                        <Text style={styles.serviceName}>{eventSpeaker}</Text>
                        <Text style={styles.serviceName}>{eventDesc}</Text>
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
        paddingTop: 5,
        fontSize: 14,
        color: 'grey'
    },
    eventDescContainer: {
        padding: 10,
    }
};

export default LivePushEvents;
