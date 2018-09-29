import React, { Component } from 'react';
import { Text, View, Image, Animated, TouchableWithoutFeedback } from 'react-native';
import { Card } from 'native-base';
import moment from 'moment'

export default class PushEventsItem extends Component {
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
        const { type, eventName, eventSpeaker, eventDesc, eventHashTag, date } = this.props.data;
        const imgUrl = './images/' + type + '.png';
        console.log(imgUrl);
        const formatedDate = moment(date).format("dddd, MMMM Do YYYY, h:mm a");
        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut()}
            >
            <Animated.View style={[{ flexDirection: 'row', justifyContent: 'space-between'}, styles.card, {
                        transform: [
                            {
                                scale: this.state.animatePress
                            }
                        ]
                    }]}>
                <View style={{ padding: 10 }}>
                    <Text>{eventHashTag}</Text>
                    <Text>{eventName}</Text>
                    <Text>{eventSpeaker}</Text>
                    <Text>{eventDesc}</Text>
                    <Text>{formatedDate}</Text>
                </View>
                <Image source={require('./images/ps_launch.png')} style={{ width: 42, height: 60, justifyContent: 'flex-end' }} />
            </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    card: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ccc',
        flexWrap: 'nowrap',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3
    }
}