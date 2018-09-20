import React, { Component} from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from 'native-base';
import { colors } from '../../colors';

class PushTrendsItem extends Component {
    render() {
        const { eventName, eventSpeaker, eventDesc, eventHashTag } = this.props.data;
        return (
            <View style={styles.container}>
                <Image source={require('./images/pt_1.png')} style={styles.imageStyle}/>
                <View style={styles.eventDescContainer}>
                    <Text style={styles.serviceName}>{eventHashTag}</Text>
                    <Text style={styles.serviceName}>{eventName}</Text>
                    <Text style={styles.serviceName}>{eventSpeaker}</Text>
                    <Text style={styles.serviceName}>{eventDesc}</Text>
                </View>
            </View>
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
        paddingHorizontal: 14,
    }
};

export default PushTrendsItem;
