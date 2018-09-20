import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Card } from 'native-base';
import moment from 'moment'

export default class PushEventsItem extends Component {
    render() {
        const { type, eventName, eventSpeaker, eventDesc, eventHashTag, date } = this.props.data;
        const imgUrl = './images/' + type + '.png';
        console.log(imgUrl);
        const formatedDate = moment(date).format("dddd, MMMM Do YYYY, h:mm a");
        return (
            <Card style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ padding: 10 }}>
                    <Text>{eventHashTag}</Text>
                    <Text>{eventName}</Text>
                    <Text>{eventSpeaker}</Text>
                    <Text>{eventDesc}</Text>
                    <Text>{formatedDate}</Text>
                </View>
                <Image source={require('./images/ps_launch.png')} style={{ width: 42, height: 60, justifyContent: 'flex-end' }} />
            </Card>
        );
    }
}