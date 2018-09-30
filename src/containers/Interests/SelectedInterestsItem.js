import React, { Component } from 'react';
import { Text, View, Animated, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';

const ImageContainer = () => {
    return (
            <ImageBackground
                source={require('./images/icon-skills.png')}
                style={{ width: 40, height: 40 }}
            >
            <Icon name="ios-close-circle-outline" style={{ position: 'absolute', top: 0, right: 0, color: 'black', fontWeight: 'bold', fontSize: 16 }} />
            </ImageBackground>
    );
}
class SelectedInterestsItem extends Component {
    state = { 
        animatePress: new Animated.Value(1)
    }

    animate() {
        Animated.timing(this.state.animatePress, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
        }).start(() => {
            this.props.toggleInterests();
        });
        
    }
    
    render() {
        const item = this.props.item;
        return (
            <TouchableWithoutFeedback
                onPress={() => this.animate()}
            >
                <Animatable.View
                    animation="zoomIn"
                    iterationCount={1}
                    duration={200}
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
                        <ImageContainer />
                        <Text numberOfLines={2} style={{ textAlign: 'center', fontFamily: 'Poppins-Light', fontSize: 10 }}>{item.description}</Text>
                    </Animated.View>
                </Animatable.View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    item: {
        margin: 10,
        width: 50,
        alignItems: 'center',
        borderRadius: 4,
        // backgroundColor: 'red'
    },
}

export default SelectedInterestsItem;
