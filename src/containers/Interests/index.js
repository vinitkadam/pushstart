import React, { Component } from 'react';
import { Text, View, FlatList, TouchableNativeFeedback, Image, Dimensions } from 'react-native';
import { Container, Icon } from 'native-base';
import { colors } from '../../colors';

const interests = [
    {
        name: 'Technology',
    },
    {
        name: 'Business',
    },
    {
        name: 'Artificial Intellegence',
    },
    {
        name: 'Artificial Intellegence',
    },
    {
        name: 'Technology',
    },
    {
        name: 'Business',
    },
];


class Interests extends Component {
    render() {
        return (
            <Container style={{ paddingTop: 40 }}>
                <View style={styles.topHeader}>
                    <Text style={{ flexShrink: 1, fontSize: 26, fontWeight: 'bold', paddingRight: 0 }}>
                        Choose Your Interests
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
                        }}
                    >
                        <Icon name="ios-search" style={{ color: 'white' }} />
                    </View>
                </View>
                
                <Text style={{ color: '#807d83', fontSize: 16, marginLeft: 30, marginTop: 10 }}>Select minimum 5 interests</Text>
                
                <FlatList
                style={{ padding: 10 }}
                contentContainerStyle={styles.list}
                data={interests}
                keyExtractor={(item, index) => 'interest'.concat(index)}
                renderItem={({ item }) => (
                    <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackground()}
                    >
                    <View style={styles.item}>
                        <Image 
                            source={require('./images/icon-skills.png')}
                            style={{ width: 70, height: 70 }}
                        />
                        <Text style={{ textAlign: 'center' }}>{`${item.name}`}</Text>
                    </View>
                    </TouchableNativeFeedback>
                )}
            />
            </Container>
        );
    }
}

const { height, width } = Dimensions.get('window');
const gridwidth = (width / 3) - (80 / 3);

const styles = {
    topHeader: {
        flexDirection: 'row',
        paddingLeft: 30
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        margin: 10,
        width: gridwidth,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
    },
};

export default Interests;
