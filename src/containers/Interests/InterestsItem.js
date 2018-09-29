import React, { Component } from 'react';
import { Text, View, Animated, TouchableWithoutFeedback, Dimensions, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

class InterestsItem extends Component {
    state = { 
        animatePress: new Animated.Value(1)
    }

    animateIn() {
        Animated.timing(this.state.animatePress, {
            toValue: 0.9,
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
        this.props.toggleInterests();
    }
    
    render() {
        const item = this.props.item;
        return (
            <TouchableWithoutFeedback
                onPressIn={() => this.animateIn()}
                onPressOut={() => this.animateOut()}
            >
                <Animated.View 
                    style={[styles.item, {
                        transform: [
                            {
                                scale: this.state.animatePress
                            }
                        ]
                    }]}
                >
                    <Image 
                        source={require('./images/icon-skills.png')}
                        style={{ width: 70, height: 70 }}
                    />
                    <Text style={{ textAlign: 'center' }}>{`${item.description}`}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const { height, width } = Dimensions.get('window');
const gridwidth = (width / 3) - (80 / 3);
const styles = {
    item: {
        margin: 10,
        width: gridwidth,
        height: 120,
        alignItems: 'center',
        borderRadius: 4,
        // backgroundColor: 'red'
    },
}

export default InterestsItem;