import React, { Component } from 'react';
import { Text, View, ScrollView, Image, Dimensions } from 'react-native';
import { Container, Content, Card } from 'native-base';
import { connect } from 'react-redux';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 60;
const PROFILE_IMAGE_MAX_HEIGHT = 122;
const PROFILE_IMAGE_MIN_HEIGHT = 60;

const win = Dimensions.get('window');

class ProfileScreen extends Component {
    render() {
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
                        <Text style={styles.summary}>{`${this.props.summary}`}</Text>
                    </View>
                    <View style={styles.card2}>
                        <Text style={{ color: '#2a3455', fontSize: 18, fontWeight: '500' }}>Interests</Text>
                    </View>
                    
                </Content>
            </View>
        );
    }
}

const styles = {
    name: {
        fontSize: 20, 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        textAlign: 'center', 
        color: 'black',
        marginTop: 10,
    },
    headline: {
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
        padding: 10,
    }
}

const mapStateToProps = (state) => {
    return {
        imageUrl: state.auth.pictureUrls.values[0],
        headline: state.auth.headline,
        name: state.auth.name,
        summary: state.auth.summary,
    };
};

export default connect(mapStateToProps)(ProfileScreen);
