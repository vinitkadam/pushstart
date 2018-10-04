import React, { Component } from 'react';
import { Text, View, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon, Container, Content } from 'native-base';
import PushTrendsItem from '../HomeScreen/PushTrendsItem';
import { colors } from '../../colors';
import PushArchiveItem from './PushArchiveItem';

const pushTrends = [
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

const pushArchives = [
    {
        id: 1,
        name: 'Push Party kjasbd khsjkbasd kjhasd',
        date: '2018-09-24T20:31:51+05:30',
        location: 'Bengaluru',
        desc: 'Pushparty#3 and details & more content about event and i am writing non sense because i want to test noOfLines param of react native Text element'
    },
    {
        id: 2,
        name: 'Push Party',
        date: '2018-09-24T20:31:51+05:30',
        location: 'Bengaluru',
        desc: 'Pushparty#3 and details & more content about event and i am writing non sense because i want to test noOfLines param of react native Text element'
    },
    {
        id: 3,
        name: 'Push Party',
        date: '2018-09-24T20:31:51+05:30',
        location: 'Bengaluru',
        desc: 'Pushparty#3 and details & more content about event and i am writing non sense because i want to test noOfLines param of react native Text element'
    },
    {
        id: 4,
        name: 'Push Party',
        date: '2018-09-24T20:31:51+05:30',
        location: 'Bengaluru',
        desc: 'Pushparty#3 and details & more content about event and i am writing non sense because i want to test noOfLines param of react native Text element'
    }
]

class ArchiveScreen extends Component {
    state= {
        refreshing: false
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
                        <Text style={{ flexShrink: 1, fontSize: 26, fontWeight: 'bold', paddingRight: 0, fontFamily: 'Poppins-Medium' }}>
                            PushTrends
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
                            style={{ backgroundColor: 'white' }}
                            keyExtractor={(item, index) => 'item'.concat(index)}
                            data={pushTrends}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                    
                                // sqare service boxes
                                <TouchableOpacity>
                                    <PushTrendsItem 
                                        data={item}
                                        sceneProps={this.props.navigation}
                                    />
                                </TouchableOpacity>
                            )}    
                        />
                    </View>
                    <View>
                        <FlatList
                            numColumns={2}
                            style={{ backgroundColor: 'white', padding: 10 }}
                            keyExtractor={(item, index) => 'item'.concat(index)}
                            data={pushArchives}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                                // sqare service boxes
                                <TouchableOpacity>
                                    <PushArchiveItem 
                                        data={item}
                                        sceneProps={this.props.navigation}
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
    container: {
    },
    topHeader: {
        flexDirection: 'row',
        paddingLeft: 30,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 30,
    },
}


export default ArchiveScreen;
