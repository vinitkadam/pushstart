import React, { Component } from 'react';
import { View, Dimensions, Image, ScrollView, Text } from 'react-native';
import { Icon, Container } from 'native-base';
import moment from 'moment';
import { colors } from '../../colors';

const win = Dimensions.get('window');

class EventDescScreen extends Component {
    
    render() {
        const dt1 = moment(new Date()).format("Do");
        const dt2 = moment(new Date()).format("MMM' YY");    
        const time = moment(new Date()).format("h:mm a")
        return (
            <Container>
                <ScrollView>
                    <View style={{ width: win.width, height: 200 }}>
                        <Image 
                            source={require('../HomeScreen/images/pt_1.png')}
                            style={{ width: win.width, height: 200 }}
                        />
                    </View>
                    <View style={styles.topHeader}>
                        <View style={{ flexShrink: 1, paddingRight: 0 }}>
                            <Text numberOfLines={2} style={{ fontSize: 24, paddingRight: 2, fontFamily: 'Poppins-Medium' }}>How to make things GO Viral</Text>
                        </View>
                        <View style={{ backgroundColor: colors.purple, padding: 4, alignSelf: 'flex-start' }}>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Regular' }} >{dt1}</Text>
                            <Text style={{ color: 'white', textAlign: 'center', fontSize: 14, fontFamily: 'Poppins-Regular' }} >{dt2}</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: '#707070', paddingRight: 10, borderRightWidth: 1, borderRightColor: '#707070'}}>{time}</Text>
                        <Icon name="logo-facebook" style={{ color: '#425f9c', marginLeft: 10 }} />
                        <View style={{ backgroundColor: 'red', height: 22, paddingHorizontal: 2, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white' }}>Live</Text>
                        </View>
                    </View>
                    <View style={{ height: 1, marginHorizontal: 20, marginVertical: 30, backgroundColor: '#d1cfd2' }}/>
                    <Text style={{ fontFamily: 'Poppins-Light', fontSize: 14, padding: 20 }}>
                    Lorem ipsum dolor sit amet, prima putent et pri. His apeirian urbanitas rationibus ex. Atqui admodum eleifend mea ad. Mutat dicunt cu per, intellegat mnesarchum ei usu. Cu mei quando legere torquatos. Nemore commune mel ei. Qui ut commune imperdiet, ponderum maluisset forensibus his cu, vix labores eligendi mandamus ea. Pri te primis intellegam, eu est congue graece voluptua. Populo alterum ne per, legere eligendi salutatus an mea, qui ei quas sententiae. Quo no nihil recusabo.
                    </Text>
                </ScrollView>
            </Container>
        );
    }
}

const styles = {
    topHeader: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

}

export default EventDescScreen;
