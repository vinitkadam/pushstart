import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Container, Button } from 'native-base';
import { connect } from 'react-redux';
import { colors } from '../../colors';

class AfterLoader extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Image 
                    source={{ uri: this.props.imageUrl }} 
                    style={styles.picture}
                />
                <Text style={styles.name}>{`${this.props.name}`}</Text>
                <Text style={styles.headline}>{`${this.props.headline}`}</Text>
                <Button style={styles.buttonStyle} onPress={() => this.props.navigation.navigate('register')}>
                    <Text style={{ color: 'white', fontSize: 18 }}>Continue</Text>
                </Button>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40
    },
    picture: {
        width: 140,
        height: 140,
        borderRadius: 70,
        resizeMode: 'cover',
        marginBottom: 15,
    },
    name: {
        fontFamily: 'Poppins-Medium',
        color: '#2a3455',
        fontSize: 20,
        textAlign: 'center'
    },
    headline: {
        fontFamily: 'Poppins-Light',
        fontSize: 16,
        color: '#807d83',
        textAlign: 'center'
    },
    buttonStyle: {
        backgroundColor: colors.purple,
        paddingHorizontal: 30,
        alignSelf: 'center',
        borderRadius: 8,
        marginTop: 30,
    }
};

const mapStateToProps = (state) => {
    return {
        imageUrl: state.auth.user.pictureUrls.values[0],
        headline: state.auth.user.headline,
        name: state.auth.user.firstName + ' ' + state.auth.user.lastName,
    };
};

export default connect(mapStateToProps)(AfterLoader);
