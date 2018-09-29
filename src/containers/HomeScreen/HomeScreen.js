import React, { Component } from 'react';
import { Text, View, AsyncStorage, FlatList, TouchableOpacity, ScrollView, RefreshControl  } from 'react-native';
import { Button, Icon, Container, Content } from 'native-base';
import firebase from 'react-native-firebase';
import { colors } from '../../colors';
import LivePushEvents from './LivePushEvents';
import PushEventsItem from './PushEventsItem';

const livePushAMA = [
    {
        eventName: 'How to make things Go Viral',
        eventSpeaker: 'Vinay Singhal',
        eventDesc: 'Cofounder of Wittyfeed',
        eventHashTag: '#PushAMA',
    },
    {
        eventName: 'How to make things Go Viral',
        eventSpeaker: 'Vinay Singhal',
        eventDesc: 'Cofounder of Wittyfeed',
        eventHashTag: '#PushAMA',
    },
    {
        eventName: 'How to make things Go Viral',
        eventSpeaker: 'Vinay Singhal',
        eventDesc: 'Cofounder of Wittyfeed',
        eventHashTag: '#PushAMA',
    }
];

const listData = [
    {
        type: 'ps_ama',
        eventName: 'Brand Building for Everyone',
        eventSpeaker: 'Sahil Vaidya',
        eventDesc: 'Cofounder of The Minimalist',
        eventHashTag: '#PUSHEVENTS',
        date: '2018-09-16T18:50:32+05:30'
    },
    {
        type: 'ps_launch',
        eventName: 'Brand Building for Everyone',
        eventSpeaker: 'Sahil Vaidya',
        eventDesc: 'Cofounder of The Minimalist',
        eventHashTag: '#PUSHEVENTS',
        date: '2018-09-16T11:30:44+05:30'
    },
]


class HomeScreen extends Component {
    state = {
        refreshing: false,
    }
    
    componentDidMount() {
        this.setFirstTimeLogin();   
        this.setIsLoggedIn();
    }

    async setFirstTimeLogin() {
        await AsyncStorage.setItem('isFirstTimeLogin', 'true');
    }

    async setIsLoggedIn() {
        await AsyncStorage.setItem('isLoggedIn', 'true');
    }
    signOut = () => {
        firebase.auth().signOut();
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });

        // handle refreshing here and then set refresing to true after getting response

        setTimeout(() => {
            this.setState({ refreshing: false });
        }, 1000);
    }
    
    render() {
        return (
            <Container style={styles.container}>
                <Content
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                            title="Pull to refresh"
                            tintColor="#fff"
                            titleColor="#fff"
                            colors={["purple", "green", "blue"]}
                        />
                    }
                >
                    <View style={styles.topHeader}>
                        <Text style={{ flexShrink: 1, fontSize: 26, fontWeight: 'bold', paddingRight: 0 }}>
                            Live PushEvents
                        </Text>
                        {/* <View
                            style={{ 
                                backgroundColor: colors.purple, 
                                width: 80,
                                height: 45, 
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderBottomLeftRadius: 20,
                                borderTopLeftRadius: 20,
                                marginRight: 0,
                            }}
                        >
                            <Icon name="ios-search" style={{ color: 'white' }} />
                        </View> */}
                    </View>
                    <View>
                        <FlatList
                            horizontal
                            style={{ backgroundColor: 'white', padding: 10 }}
                            keyExtractor={(item, index) => 'item'.concat(index)}
                            data={livePushAMA}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                    
                                // sqare service boxes
                                <TouchableOpacity>
                                    <LivePushEvents 
                                        data={item}
                                    />
                                </TouchableOpacity>
                            )}    
                        />
                    </View>
                    <View>
                        <FlatList
                            style={{ backgroundColor: 'white', padding: 10 }}
                            keyExtractor={(item, index) => 'item'.concat(index)}
                            data={listData}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                    
                                // sqare service boxes
                                <TouchableOpacity>
                                    <PushEventsItem 
                                        data={item}
                                    />
                                </TouchableOpacity>
                            )}    
                        />
                    </View>
                </Content>
            </Container>
        );
    }
}

const styles = {

    topHeader: {
        marginTop: 35,
        flexDirection: 'row',
        paddingLeft: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}

export default HomeScreen;
