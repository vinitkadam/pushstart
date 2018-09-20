import React, { Component } from 'react';
import { Text, View, AsyncStorage, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon, Container, Content } from 'native-base';
import PushTrendsItem from '../HomeScreen/PushTrendsItem';
import { colors } from '../../colors';

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
]

class ArchiveScreen extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <View style={styles.topHeader}>
                        <Text style={{ flexShrink: 1, fontSize: 26, fontWeight: 'bold', paddingRight: 0 }}>
                            PushTrends
                        </Text>
                        <View 
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
                        </View>
                    </View>
                    <View>
                        <FlatList
                            horizontal
                            style={{ backgroundColor: 'white', padding: 10 }}
                            keyExtractor={(item, index) => 'item'.concat(index)}
                            data={pushTrends}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                    
                                // sqare service boxes
                                <TouchableOpacity>
                                    <PushTrendsItem 
                                        data={item} 
                                    />
                                </TouchableOpacity>
                            )}    
                        />
                    </View>
                    {/* <View>
                        <FlatList 
                            style={{ backgroundColor: 'white', padding: 10 }}
                            keyExtractor={(item, index) => 'item'.concat(index)}
                            data={pushTrends}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => (
                    
                                // sqare service boxes
                                <TouchableOpacity>
                                    <PushArchiveItem 
                                        data={item}
                                    />
                                </TouchableOpacity>
                            )}    
                        />
                    </View> */}
                </Content>
            </Container>
        );
    }
}

const styles = {
    container: {
        paddingTop: 35 
    },
    topHeader: {
        flexDirection: 'row',
        paddingLeft: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
}


export default ArchiveScreen;
