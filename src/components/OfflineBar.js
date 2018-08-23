import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, NativeModules, NetInfo } from 'react-native';
import { connect } from 'react-redux';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const { width } = Dimensions.get('window');

class OfflineBar extends Component {
  state = {
    // fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    isConnected: true
  }

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    // Animated.timing(
    //   this.state.fadeAnim,
    //   {
    //     toValue: 1,
    //     duration: 3000,
    //   }
    // ).start();
  }
  
  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }
  
  handleConnectionChange = (isConnected) => {
    this.setState({ isConnected });
  };
  
  render() {
    if (!this.state.isConnected) {
      return (
        <Animated.View style={[styles.offlineContainer, { height: 30 }, this.props.style ]}>
          <Text style={styles.offlineText}>No Internet Connection</Text>
        </Animated.View>        
      );
    }
    return null;
  }
}

const styles = {
    offlineContainer: {
        backgroundColor: '#b52424',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        bottom: 0,
        position: 'absolute',
        zIndex: 100,
        
    },
    offlineText: { 
        color: '#fff'
    }
};


export default OfflineBar;

