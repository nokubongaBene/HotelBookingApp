import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,TextInput,TouchableHighlight,Modal,Dimensions, Platform, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import { Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import PaymentModal from './PaymentModal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker';
import HotelDescriptionModal from './HotelDescriptionModal';
import data from '../Json/HotelInfo.json';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function Dates({route,navigation}){
    const {hotelDetails} = route.params;
    const [checkIn, setCheckIn] = useState();
    const [checkOut, setCheckoutdate] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    //const [hotelDetails, setHotelDetails] = useState({});
    console.log(route.params);
    const storeHotelDetails =(item) =>{
        console.log(item);
       // hotelDetails(item);
        setModalVisible(true);
        
        //navigation.navigate('Dates', {item:item})
      }
  
    const saveCheckInDate = (date) =>{
        console.log(date.date.toDateString())
        
        setCheckIn(date.date.toDateString());
        
      }
      
      const saveCheckOutDate = (date) =>{
        setCheckoutdate(date.date.toDateString());
      }
      const hideModal= () =>{
        setModalVisible(false);
        console.log('something')
        navigation.navigate('Booking', {checkIn:checkIn, checkOut:checkOut})
    }

    const SignOut = () =>{
      // auth().signOut().then(() => {
      //   navigation.navigation('SignIn');
      // }).catch((error) => {
      //   alert('Oops, cannot seem to log out!')
      // });

      auth().signOut().then(()=>console.log('Signed Out'));
      
    }
    return(
        <View style={styles.bookingCard}>
            <Text style={styles.dates}>Check In Date: {checkIn}</Text>
                <DatePicker
                style={{width: 200, marginLeft: width * 0.2}}
                date= {new Date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2021-11-20"
                maxDate="2026-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                        }}
                        onDateChange={(date) => saveCheckInDate({date})}
                    />

 <Text style={styles.dates}>Check Out Date: {checkOut}</Text>
 <DatePicker
                style={{width: 200, marginLeft: width * 0.2}}
                date= {new Date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                minDate="2021-11-20"
                maxDate="2026-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                        }}
                        onDateChange={(date) => saveCheckOutDate({date})}
                    />
           

            <TouchableOpacity style={styles.textLogin}  onPress={() => storeHotelDetails()}>
     <Text style={styles.next}>     Next -></Text>
     </TouchableOpacity>
            <HotelDescriptionModal hotelDetails={hotelDetails} showModal={modalVisible} hideModalGF={hideModal} navigation={navigation}/> 
            </View>
    )
}