import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { Container, Content, Item,
         CheckBox, Body, ListItem, Text, View } from 'native-base';

class SelectFriends extends Component {
    constructor(props) {
        super(props);

        this.state = {
            friends: this.props.interests,
            selectedInterets: []
        };
    }

    onCheckBoxPress(id) {
        let tmp = this.state.selectedInterets;

        if ((tmp.includes(id))) {
            tmp.splice(tmp.indexOf(id), 1);
        } else {
            tmp.push(id);
        }

        this.setState({
            selectedInterets: tmp
        });
        this.props.selectedInterestsCallback(this.state.selectedInterets);
    }

    render() {
        return (
                <View style={{ paddingLeft: 15, padding: 10 }}>
                    <Text style={{ color: 'grey' }}>
                        Select one or more options
                    </Text>
                    <Item>
                        <FlatList 
                            extraData={this.state}
                            keyExtractor={(item, index) => item.id}
                            data={this.state.friends}
                            renderItem={({ item }) => {
                                return (
                                    <ListItem
                                        onPress={() => this.onCheckBoxPress(item.id)}
                                    >
                                        <CheckBox
                                            checked={this.state.selectedInterets.includes(item.id)}
                                            onPress={() => this.onCheckBoxPress(item.id)}
                                        />
                                        <Body>
                                            <Text>{item.name}</Text>
                                        </Body>
                                    </ListItem>
                                );
                            }}
                        />
                    </Item>
                </View>
        );
    }
}

export default SelectFriends;
