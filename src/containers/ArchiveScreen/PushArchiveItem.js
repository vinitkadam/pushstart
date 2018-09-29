import React, { Component } from 'react';
import { Text, View, TouchableWithoutFeedback, Animated, Image, Dimensions } from 'react-native';
import { colors } from '../../colors';
import { Icon } from 'native-base';
import moment from 'moment';

class PushArchiveItem extends Component {
    
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
        const { id, name, date, location, desc } = this.props.data;
        const dt1 = moment(date).format("Do");
        const dt2 = moment(date).format("MMM' YY");
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
                    <Image source={require('./images/img.png')} style={styles.imageStyle} />
                    <View style={{ padding: 10 }}>
                        <View style={styles.topHeader}>
                            <View style={{ flexShrink: 1, paddingRight: 0 }}>
                                <Text numberOfLines={2} style={{ fontWeight: '600', fontSize: 14, height: 40, paddingRight: 2 }}>{name}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <Icon name="ios-pin" style={{ color: colors.purple, fontSize: 14 }} />
                                    <Text style={{ paddingLeft: 4, color: colors.purple }}>{location}</Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: colors.purple, padding: 4, alignSelf: 'flex-start' }}>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }} >{dt1}</Text>
                                <Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }} >{dt2}</Text>
                            </View>
                        </View>
                        <Text numberOfLines={3} style={{ fontSize: 12, fontWeight: '300', color: '#707070', marginTop: 10 }}>{desc}</Text>
                    </View>
                </Animated.View>
            </TouchableWithoutFeedback>
        );
    }
}

const win = Dimensions.get('window');

const styles = {
    container: {
        width: ( win.width / 2 ) - 30,
        shadowColor: colors.darkpurple,
        elevation: 5,
        shadowOffset: { height: 0, width: 0 },
        shadowRadius: 5,
        shadowOpacity: 1,
        margin: 10,
        marginTop: 20,
        marginBottom: 20,
        //justifyContent: 'center',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: 4
    },
    imageStyle: {
        width: ( win.width / 2 ) - 30,
        height: ( win.width / 2 ) - 90,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
    },
    serviceName: {
        paddingTop: 5,
        fontSize: 14,
        color: 'grey'
    },
    eventDescContainer: {
        padding: 10,
        paddingHorizontal: 14,
    },
    topHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
};

export default PushArchiveItem;