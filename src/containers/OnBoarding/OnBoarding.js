// import React, { Component } from 'react';
// import { Text, View, Dimensions, Image, StatusBar } from 'react-native';
// import { Icon, Button } from 'native-base';

// import Swiper from './Swiper';
// import { colors } from '../../colors';

// const { width, height } = Dimensions.get('window');

// class OnBoarding extends Component {

//     render() {
//         return (
//             <View>
//                 <StatusBar
//                     backgroundColor="rgba(0,0,0,0.2)"
//                     barStyle="light-content"
//                 />
//                 <View style={styles.container}>
//                     <Swiper navigation={this.props.navigation}>
//                         {/* First screen */}
//                         <View style={[styles.slide]}>
//                             <Image source={require('./images/one.png')} style={styles.imgStyle}/>
//                             <Text style={styles.header}>
//                                 Welcome to India’s largest community for Entrepreneur’s
//                             </Text>
//                         </View>
//                         {/* Second screen */}
//                         <View style={[styles.slide]}>
//                             <Image source={require('./images/two.png')} />
//                             <Text style={styles.header}>
//                                 Learn, Share Knowledge and grow your business
//                             </Text>
//                         </View>
//                         {/* Third screen */}
//                         <View style={[styles.slide]}>
//                             <Image source={require('./images/one.png')} />
//                             <Text style={styles.header}>
//                                 Build your personal brand and increase visibility
//                             </Text>
//                         </View>
//                     </Swiper>
//                 </View>
//                 <View style={styles.bottonContainer}>
//                     <Button info style={styles.buttonStyle} onPress={() => { this.props.navigation.navigate('login'); }}>
//                         <Text style={styles.buttonTextStyle} >GET STARTED</Text>
//                     </Button>
//                 </View>
//             </View>

//         );
//     }
// }
// const styles = {
//     container: {
//         backgroundColor: '#ffffff',
//         height: height - 200,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     header: {
//         fontSize: 18,
//         color: '#865ed0',
//         marginHorizontal: 20,
//         textAlign: 'center',
//         marginBottom: 20,
//         marginTop: 10,

//     },
//     slide: {
//         flex: 1,
//         justifyContent: 'space-between',
//         paddingTop: 50,
//         alignItems: 'center',
//         padding: 15,
//     },
//     bottonContainer: {
//         backgroundColor: 'white',
//         height: 200,
//         alignItems: 'center',
//     },
//     buttonStyle: {
//         width: 150,
//         padding: 5,
//         alignSelf: 'center',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#865ed0',
//         borderRadius: 6,
//         marginTop: 40,
//     },
//     buttonTextStyle: {
//         color: 'rgba(255,255,255,1)',
//         fontSize: 18,
//     }
// };

// const iconStyles = {
//     size: 100,
//     color: "#FFFFFF"
// };

// export default OnBoarding;


import { Image, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-elements';

import Onboarding from 'react-native-onboarding-swiper';

const Square = ({ isLight, selected }) => {
  let backgroundColor;
  if (isLight) {
    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  } else {
    backgroundColor = selected ? '#fff' : 'rgba(255, 255, 255, 0.5)';
  }
  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const backgroundColor = isLight => (isLight ? 'blue' : 'lightblue');
const color = isLight => backgroundColor(!isLight);

const Done = ({ isLight, ...props }) => (
  <Button
    title={'Done'}
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const Skip = ({ isLight, skipLabel, ...props }) => (
  <Button
    title={'Skip'}
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  >
    {skipLabel}
  </Button>
);

const Next = ({ isLight, ...props }) => (
  <Button
    title={'Next'}
    buttonStyle={{
      backgroundColor: backgroundColor(isLight),
    }}
    containerViewStyle={{
      marginVertical: 10,
      width: 70,
      backgroundColor: backgroundColor(isLight),
    }}
    textStyle={{ color: color(isLight) }}
    {...props}
  />
);

const CustomButtons = () => (
  <Onboarding
    DotComponent={Square}
    NextButtonComponent={Next}
    SkipButtonComponent={Skip}
    DoneButtonComponent={Done}
    pages={[
      {
        backgroundColor: '#fff',
        image: <Image source={require('./images/one.png')} />,
        title: 'Onboarding',
        subtitle: 'Done with React Native Onboarding Swiper',
      },
      {
        backgroundColor: '#fe6e58',
        image: <Image source={require('./images/two.png')} />,
        title: 'The Title',
        subtitle: 'This is the subtitle that sumplements the title.',
      },
      {
        backgroundColor: '#999',
        image: <Image source={require('./images/two.png')} />,
        title: 'Triangle',
        subtitle: "Beautiful, isn't it?",
      },
    ]}
  />
);
export default CustomButtons;
