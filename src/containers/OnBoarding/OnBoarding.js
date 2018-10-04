import { Image, View, Dimensions, ImageBackground, Text } from 'react-native';
import React from 'react';

import { Button, Icon } from 'native-base';


import Onboarding from 'react-native-onboarding-swiper'; // Version can be specified in package.json

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(134, 94, 208, 1)' : 'rgba(196, 177, 232, 1)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 22,
        height: 4,
        marginHorizontal: 4,
        borderRadius: 2,
        backgroundColor,
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Done = ({ isLight, ...props }) => (
  <Button
    style={{
      backgroundColor: '#865ed0',
      height: 60,
      width: 60,
      borderRadius: 30,
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    {...props}
  >
  <Icon name="ios-checkmark" style={{ color: 'white', fontSize: 50 }} />
  </Button>
);

const Next = ({ isLight, ...props }) => (
  <Button
    style={{
      backgroundColor: '#865ed0',
      height: 60,
      width: 60,
      borderRadius: 30,
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { height: 0, width: 0 },
      elevation: 6,
      shadowColor: '#865ed0',
      shadowOpacity: 0.5,
      shadowRadius: 6,
    }}
    {...props}
  >
    <Icon name="ios-arrow-forward" style={{ color: 'white', fontSize: 30 }} />
  </Button>
);


const win = Dimensions.get('window');
const ratio1 = win.width / 1079;
const ratio2 = win.width / 1081;
const ratio3 = win.width / 1082;

const styles = {
  img1: {
    width: win.width + 2,
    height: 994 * ratio1,
  },
  img2: {
    width: win.width + 1,
    height: 994 * ratio2,
  },
  img3: {
    width: win.width + 2,
    height: 960 * ratio3,
  },
  title: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    paddingHorizontal: 20,
  },
  desc: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    paddingHorizontal: 20,
    lineHeight: 20,
  }
};

export default class OnboardingScreen extends React.Component {

  render() {
    return (
      <Onboarding
        onDone={() => { this.props.navigation.navigate('auth'); }}
        showSkip={false}
        bottomBarHeight={80}
        bottomBarHighlight={false}
        DotComponent={Square}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        pages={[
          {
            backgroundColor: '#fff',
            image: <ImageBackground style={styles.img1} source={require('./images/one.png')} />,
            title: <Text style={styles.title}>Hello PushStarters</Text>,
            subtitle: <Text style={styles.desc}>Welcome to India’s most active community for Entrepreneur’s</Text>,
          },
          {
            backgroundColor: '#fff',
            image: <Image style={styles.img2} source={require('./images/two.png')} />,
            title: <Text style={styles.title}>Get Relevent Content</Text>,
            subtitle: <Text style={styles.desc}>Get notified about relevant content from Pushstart anytime, anywhere</Text>,
          },
          {
            backgroundColor: '#fff',
            image: <Image style={styles.img3} source={require('./images/three.png')} />,
            title: <Text style={styles.title}>Archive Access</Text>,
            subtitle: <Text style={styles.desc}>Access Relevent content from our Archive anytime, anywhere</Text>,
          },
        ]}
      />
    );
  }
}

