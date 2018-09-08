import { Image, View, Text, Dimensions, ImageBackground } from 'react-native';
import React from 'react';

import { Button } from 'native-base';

// import { Button } from 'react-native-elements';

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
      height: 70,
      width: 70,
      borderRadius: 35,
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center'
    }}
    {...props}
  >
    <Text style={{ color: 'white' }} >D</Text>
  </Button>
);

const Next = ({ isLight, ...props }) => (
  <Button
    style={{
      backgroundColor: '#865ed0',
      height: 70,
      width: 70,
      borderRadius: 35,
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
    <Text style={{ color: 'white' }}>N</Text>
  </Button>
);

const CustomButtons = () => (
  <Onboarding
    showSkip={false}
    bottomBarHeight={120}
    bottomBarHighlight={false}
    DotComponent={Square}
    NextButtonComponent={Next}
    DoneButtonComponent={Done}
    pages={[
      {
        backgroundColor: '#fff',
        image: <ImageBackground style={styles.img1} source={require('./images/one.png')} />,
        title: 'Hello PushStarters',
        subtitle: 'Welcome to India’s most active community for Entrepreneur’s',
      },
      {
        backgroundColor: '#fff',
        image: <Image style={styles.img2} source={require('./images/two.png')} />,
        title: 'Get Relevent Content ',
        subtitle: 'Get notified about relevant content from Pushstart anytime, anywhere',
      },
      {
        backgroundColor: '#fff',
        image: <Image style={styles.img3} source={require('./images/three.png')} />,
        title: 'Archive Access',
        subtitle: 'Access Relevent content from our Archive anytime, anywhere',
      },
    ]}
/>
);

const win = Dimensions.get('window');
const ratio1 = win.width / 1079;
const ratio2 = win.width / 1081;
const ratio3 = win.width / 1082;

const styles = {
  img1: {
    width: win.width+2,
    height: 994 * ratio1,
  },
  img2: {
    width: win.width+1,
    height: 994 * ratio2,
  },
  img3: {
    width: win.width+2,
    height: 960 * ratio3,
  }
};

export default class OnboardingScreen extends React.Component {

  render() {
    return (
      <CustomButtons navigateToLogin={() => { this.props.navigation.navigate('login'); }} />
    );
  }
}

