import React, { Component } from 'react';
import { Text, View, FlatList, TouchableNativeFeedback, TouchableWithoutFeedback, Image, Dimensions, ImageBackground } from 'react-native';
import { Container, Icon } from 'native-base';
import { colors } from '../../colors';
import { connect } from 'react-redux';
import { getTopInterests } from './InterestActions';


class Interests extends Component {
    state = {
        selectedInterests: []
    }
    componentWillMount() {
        this.props.getTopInterests();
    }

    toggleInterests(item) {
        let tmp = this.state.selectedInterests;
        let found = false;
        let i = 0;
        for (i = 0; i < tmp.length; i++) {
            if (tmp[i].code === item.code) {
                found = true;
                break;
            }
        }
        if (i !== tmp.length) {
            tmp.splice(i, 1);
        } else {
            tmp.push(item);
        }
        this.setState({
            selectedInterets: tmp
        });  
    }

    renderInterests() {
        
        return (
            <FlatList
                style={{ padding: 10 }}
                data={this.props.topInterests}
                numColumns={3}
                keyExtractor={(item, index) => 'interest'.concat(index)}
                renderItem={({ item }) => {
                        console.log(item.data());
                        return (
                        <TouchableNativeFeedback
                            background={TouchableNativeFeedback.SelectableBackground()}
                            onPress={() => { this.toggleInterests(item.data()); }}
                        >
                        <View style={styles.item}>
                            <ImageBackground 
                                source={require('./images/icon-skills.png')}
                                style={{ width: 70, height: 70 }}
                            ></ImageBackground>
                            <Text style={{ textAlign: 'center' }}>{`${item.data().description}`}</Text>
                        </View>
                        </TouchableNativeFeedback>
                    )}
                }
            />
        );
    }

    renderSelectedInterests() {
        
        return (
            <FlatList
                style={{ padding: 10 }}
                data={this.state.selectedInterests}
                horizontal
                keyExtractor={(item, index) => 'interest'.concat(index)}
                renderItem={({ item }) => {
                        console.log(item);
                        return (
                        <TouchableWithoutFeedback
                            background={TouchableNativeFeedback.SelectableBackground()}
                            onPress={() => { this.toggleInterests(item); }}
                        >
                        <View style={styles.item}>
                            <ImageBackground 
                                source={require('./images/icon-skills.png')}
                                style={{ width: 40, height: 40 }}
                            >
                            </ImageBackground>
                            <Text style={{ textAlign: 'center' }}>{`${item.description}`}</Text>
                        </View>
                        </TouchableWithoutFeedback>
                    )}
                }
            />
        );
    }
    render() {
        console.log("topInteretsts", this.props.topInterests);
        console.log('interestsLoaded', this.props.interestsLoaded);
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
                            marginRight: 0,
                        }}
                    >
                        <Icon name="ios-search" style={{ color: 'white' }} />
                    </View>
                </View>
                
                <Text style={{ color: '#807d83', fontSize: 16, marginLeft: 30, marginTop: 10 }}>Select minimum 5 interests</Text>
                <View style={{ height: 120 }}>
                    {this.renderSelectedInterests()}
                </View>            
                {this.props.interestsLoaded === 'true' && this.renderInterests()}
                
            </Container>
        );
    }
}

const { height, width } = Dimensions.get('window');
const gridwidth = (width / 3) - (80 / 3);

const styles = {
    topHeader: {
        flexDirection: 'row',
        paddingLeft: 30,
        justifyContent: 'space-between',
        alignItems: 'center'
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
        borderRadius: 4,
        // backgroundColor: 'red'
    },
};

const mapStateToProps = state => {
    return {
        topInterests: state.interests.topInterests,
        interestsLoaded: state.interests.interestsLoaded,
    };
};

export default connect(mapStateToProps, { getTopInterests })(Interests);
