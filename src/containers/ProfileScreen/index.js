import React, { Component } from 'react';
import { Text, View, ScrollView, ImageBackground, Image, Dimensions, FlatList } from 'react-native';
import { Container, Content, Button } from 'native-base';
import { connect } from 'react-redux';
import { colors } from '../../colors';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 60;
const PROFILE_IMAGE_MAX_HEIGHT = 122;
const PROFILE_IMAGE_MIN_HEIGHT = 60;

const win = Dimensions.get('window');

class ProfileScreen extends Component {
    
    renderInterests(interests){
        return (
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={6}
                style={{ padding: 10 }}
                data={interests}
                keyExtractor={(item, index) => item.code}
                renderItem={({ item }) => {
                    console.log(item);
                        return (
                            <View
                                style={styles.item}
                            >
                                <Image 
                                    source={require('../Interests/images/icon-skills.png')}
                                    style={{ width: 50, height: 50 }}
                                />
                                <Text numberOfLines={2}  style={{ textAlign: 'center' }}>{`${item.description}`}</Text>
                            </View>
                    );
                }}
            />
        )
    }
    render() {
        console.log(this.props.interests);
        return (
            <View style={{ flex: 1 }}>
                <Content>
                    <Image 
                        source={{ uri: this.props.imageUrl }}
                        style={{ 
                            flex: 1, 
                            height: HEADER_MAX_HEIGHT, 
                            width: win.width,
                            }}
                            blurRadius={2}
                    />
                    <Image 
                        source={{ uri: this.props.imageUrl }}
                        style={{
                            height: 120,
                            width: 120,
                            zIndex: 10,
                            alignSelf: 'center',
                            borderRadius: 60,
                            marginTop: -60,
                        }}
                    />
                    <View style={styles.card1}>    
                        <Text style={styles.name}>{`${this.props.name}`}</Text>
                        <Text style={styles.headline}>{`${this.props.headline}`}</Text>
                    </View>
                    <View style={styles.card2}>
                        <Text style={{ color: '#2a3455', fontSize: 18, fontWeight: '500', margin: 10 }}>Interests</Text>
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                            style={{ padding: 10 }}
                            data={this.props.interests}
                            keyExtractor={(item, index) => item.code}
                            renderItem={({ item }) => {
                                console.log(item);
                                    return (
                                            <ImageBackground
                                                source={require('../Interests/images/icon-skills.png')}
                                                style={styles.item}
                                            >
                                                <View 
                                                    style={{ 
                                                        borderRadius: interestsCircleWidth, 
                                                        backgroundColor: 'rgba(134, 94, 208, 0.67)', 
                                                        height: '100%', 
                                                        width: '100%',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}
                                                >
                                                    <Text 
                                                        numberOfLines={3} 
                                                        style={{ 
                                                            textAlign: 'center', 
                                                            fontFamily: 'Poppins-Medium', 
                                                            fontSize: 10,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        {`${item.description}`}
                                                    </Text>
                                                </View>
                                            </ImageBackground>
                                );
                            }}
                        />
                    </View>

                    <View style={styles.card2}>
                        <Text style={{ color: '#2a3455', fontSize: 18, fontWeight: '500', margin: 10 }}>Expertise</Text>
                        <Button bordered style={{ borderColor: colors.purple, padding: 10, margin: 10, borderRadius: 8 }}>
                            <Text style={{ fontFamily: 'Poppins-Medium', color: colors.purple }}>{this.props.industry}</Text>
                        </Button>
                    </View>
                    
                </Content>
            </View>
        );
    }
}


const interestsCircleWidth = (win.width / 3) - 18;

const styles = {
    name: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        alignSelf: 'center', 
        textAlign: 'center', 
        color: 'black',
        marginTop: 10,
    },
    headline: {
        fontFamily: 'Poppins-Light',
        fontSize: 14,
        textAlign: 'center',
        color: '#807d83',
        marginTop: 5
    },
    card1: {
        paddingTop: 70,
        backgroundColor: 'white',
        marginTop: -68,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingBottom: 10,
        paddingHorizontal: 10, 
        marginBottom: 10,
    }, 
    summary: {
        marginTop: 10,
        textAlign: 'center',
        color: '#2a3455',
        fontSize: 16
    },
    card2: {
        backgroundColor: 'white',
        marginBottom: 10,
    },
    item: {
        marginVertical: 10,
        width: interestsCircleWidth,
        height: interestsCircleWidth,
        borderRadius: interestsCircleWidth / 2,
        alignItems: 'center',
        margin: 6
        // backgroundColor: 'red'
    },
}

const mapStateToProps = (state) => {
    return {
        imageUrl: state.auth.pictureUrls.values[0],
        headline: state.auth.headline,
        name: state.auth.name,
        summary: state.auth.summary,
        interests: state.auth.interests,
        industry: state.auth.industry,
    };
};

export default connect(mapStateToProps)(ProfileScreen);
