import React, { Component } from 'react';
import { 
    Text, 
    View, 
    FlatList, 
    TouchableNativeFeedback, 
    TouchableWithoutFeedback,
    Animated, 
    Dimensions, 
    Alert,
    TextInput,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { Container, Icon, Content, Button } from 'native-base';
import { colors } from '../../colors';
import { getTopInterests, setSelectInterests, setUserInterests } from './InterestActions';
import InterestsItem from './InterestsItem';
import SelectedInterestsItem from './SelectedInterestsItem';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';

class Interests extends Component {
    state = {
        selectedInterests: [],
        searchResults: []
    }

    componentWillMount() {
        this.wwidth = Dimensions.get('window').width;
        this.wheight = Dimensions.get('window').height;
        this.props.getTopInterests();
        this.searchBarLeft = new Animated.Value(this.wwidth);
        this.headerTextOpacity = new Animated.Value(1);
        this.searchResultsTop = new Animated.Value(this.wheight);
    }

    onContinueButtonPress = () => {
        if (this.state.selectedInterests.length < 5) {
            Alert.alert(
                'Please Select atleast 4 interests',
                '',
                [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                { cancelable: false }
            );
        } else {
            this.props.setUserInterests(this.state.selectedInterests, this.props.emailAddress, (nav) => {
                if (nav === 'app') {
                    this.props.navigation.navigate(StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'app' })],
                      }))
                } else if (nav === 'after_loader') {
                    this.props.navigation.navigate('after_loader')
                } else {
                    Alert.alert(
                        'Oops',
                        'Something went wrong. Please try again later.',
                        [
                            { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ],
                        { cancelable: false }
                    );
                }
                }
            );
        }
    }

    displaySearchScreen = () => {
        Animated.parallel([
            Animated.timing(this.searchBarLeft, {
                toValue: 30,
                duration: 500,
            }),
            Animated.timing(this.headerTextOpacity, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }),
            Animated.timing(this.searchResultsTop, {
                toValue: 0,
                duration: 500
            })
        ]).start(() => {
            this.refs.searchInput.focus();
        });
    }

    hideSearchScreen = () => {
        this.refs.searchInput.setNativeProps({text: ''})
        this.refs.searchInput.blur();
        this.setState({ searchResults: [] })
        Animated.parallel([
            Animated.timing(this.searchBarLeft, {
                toValue: this.wwidth,
                duration: 500,
            }),
            Animated.timing(this.headerTextOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.timing(this.searchResultsTop, {
                toValue: this.wheight,
                duration: 1000
            })
        ]).start();
    }

    // search firestore interests
    makeRemoteRequest = (term) => {
        const searchTerm = term.charAt(0).toUpperCase() + term.slice(1);
        firebase
        .firestore()
        .collection('interests')
        .where("description", ">=", searchTerm)
        .limit(5)
        .get()
        .then((docSnapshot) => {
            console.log('search', docSnapshot.docs);
            this.setState({ searchResults: docSnapshot.docs });
        });
    }

    toggleInterests(item) {
        let tmp = this.props.selectedInterests;
        console.log("toogle item", item);
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
        this.props.setSelectInterests(tmp);
        this.setState({
            selectedInterests: tmp
        });
        this.flatList.scrollToEnd({ animated: true });
        
    }

    renderInterests() {
        return (
            <Animatable.View
                animation="fadeIn"
                duration={300}
                iterationCount={1}
            >
                <FlatList
                    style={{ padding: 10 }}
                    
                    data={this.props.topInterests}
                    numColumns={3}
                    keyExtractor={(item, index) => item.data().code}
                    renderItem={({ item }) => {
                            return (
                                <InterestsItem item={item.data()} toggleInterests={() => { this.toggleInterests(item.data()); }} />
                        )}
                    }
                />
                {/* search results container */}
                <Animated.View
                        style={{
                            position: 'absolute',
                            top: this.searchResultsTop,
                            flex: 1,
                            width: this.wwidth,
                            height: this.wheight,
                            zIndex: 100,
                            backgroundColor: 'white',
                            borderColor: '#ededed',
                            borderTopWidth: 1
                        }}
                    >
                        <FlatList
                            data={this.state.searchResults}
                            keyExtractor={(item, index) => 'search'.concat(item.data().code)}
                            renderItem={({ item }) => {
                                    return (
                                        <TouchableNativeFeedback
                                            onPress={() => { 
                                                this.toggleInterests(item.data())
                                            }}
                                        >
                                            <View style={{ width: this.wwidth, padding: 15, borderColor: '#ededed', borderBottomWidth: 1 }}>
                                                <Text style={{ fontFamily: 'Poppins-Light', fontSize: 16 }}>{`${item.data().description}`}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                )}
                            }
                        />
                    </Animated.View>
                </Animatable.View>
        );
    }

    renderLoadingInterests() {
        return (
            <View
                style={{ alignItems: 'center', justifyContent: 'center' }}
            >
                <Text style={{ fontFamily: 'Poppins-SemiBold' }}>Loading Top Interests</Text>
                <ActivityIndicator
                    style={{ marginTop: 15 }}
                    size="large"
                    color={colors.purple}
                />
            </View>
        )
    }

    render() {

        console.log("topInteretsts", this.props.topInterests);
        console.log('interestsLoaded', this.props.interestsLoaded);
        console.log('render selected interests', this.props.selectedInterests);
        return (
            <Container style={{ flex: 1 }}>
                <Content>
                    <View style={styles.topHeader}>
                    <Animated.View
                        style={{
                            opacity: this.headerTextOpacity,
                            flexShrink: 1,
                            paddingRight: 0,
                        }}
                    >
                        <Text 
                            style={{
                                fontSize: 26,
                                fontFamily: 'Poppins-Medium',
                            }}
                        >
                            Choose Your Interests
                        </Text>
                    </Animated.View>
                    <TouchableWithoutFeedback
                        onPress={() => this.displaySearchScreen()}
                    >                    
                    <Animated.View                        
                        style={{ 
                            backgroundColor: colors.purple, 
                            width: 80,
                            height: 50, 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius: 20,
                            marginRight: 0,
                            zIndex: 100,
                            opacity: this.headerTextOpacity,
                        }}
                    >

                        <Icon name="ios-search" style={{ color: 'white' }} />
                    </Animated.View>
                    </TouchableWithoutFeedback>

                    {/* search input */}
                    <Animated.View
                        style={{ 
                             
                            position: 'absolute', 
                            left: this.searchBarLeft, 
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                        }}
                    > 
                        <TextInput 
                            ref="searchInput"
                            style={{
                                width: this.wwidth - 120,
                            }}
                            onChangeText={this.makeRemoteRequest}
                            underlineColorAndroid="transparent"
                        />
                        <TouchableWithoutFeedback
                            onPress={() => this.hideSearchScreen()}
                        >                    
                            <View
                                
                                style={{ 
                                    width: 80,
                                    height: 50, 
                                    justifyContent: 'center', 
                                    alignItems: 'center',
                                    borderBottomLeftRadius: 20,
                                    borderTopLeftRadius: 20,
                                    marginRight: 0,
                                    zIndex: 100,
                                }}
                            >
                                <Icon name="ios-close-circle-outline" style={{ color: 'grey', fontSize: 26 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Animated.View>
                </View>
                
                <Text style={{ color: '#807d83', fontSize: 16, marginLeft: 30, marginTop: 10, fontFamily: 'Poppins-Light' }}>Select minimum 5 interests</Text>
                <View style={{ height: 120 }}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        ref={ref => this.flatList = ref}
                        style={{ padding: 10 }}
                        data={this.props.selectedInterests}
                        horizontal
                        keyExtractor={(item, index) => item.code}
                        renderItem={({ item }) => {
                                console.log(item);
                                return (
                                    <SelectedInterestsItem item={item} toggleInterests={() => { this.toggleInterests(item); }} />
                            )}
                        }
                    />
                </View>
                <View
                    style={{ 
                        height: 300,
                        alignItems: 'center',
                        justifyContent: 'center'
                    
                    }}
                >
                    {this.props.interestsLoaded === 'true' && this.renderInterests()}
                    {this.props.interestsLoaded === 'false' && this.renderLoadingInterests()}
                </View>
                
                
                <Button style={styles.continueButton} onPress={this.onContinueButtonPress}>
                        <Text style={styles.continueButtonText} >Continue</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const win = Dimensions.get('window');
const gridwidth = (this.wwidth / 3) - (80 / 3);

const styles = {
    topHeader: {
        flexDirection: 'row',
        paddingLeft: 30,
        justifyContent: 'space-between',
        marginTop: 30,
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
    continueButton: {
        backgroundColor: colors.darkpurple,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        height: 60,
        margin: 15,
        width: win.width - 30,
        borderRadius: 8,
        elevation: 5,
        shadowColor: 'rgba(134, 94, 208, 0.42)',
        shadowOffset: { height: 5, width: 3 },
        shadowOpacity: 1.0,
        shadowRadius: 6,

    },
    continueButtonText: {
        fontFamily: 'Poppins-Light',
        color: 'white',
        textAlign: 'center',
        fontSize: 22,
        marginVertical: 20
    }
};

const mapStateToProps = state => {
    return {
        topInterests: state.interests.topInterests,
        interestsLoaded: state.interests.interestsLoaded,
        selectedInterests: state.interests.selectedInterests,
        emailAddress: state.auth.emailAddress,
    };
};

export default connect(mapStateToProps, { getTopInterests, setSelectInterests, setUserInterests })(Interests);
