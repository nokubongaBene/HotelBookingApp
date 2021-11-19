import React, {useState, Component, useEffect} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Modal,useLayoutEffect,Alert, Image,Dimensions, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import HotelDescriptionModal from './HotelDescriptionModal';
import data from '../Json/HotelInfo.json';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import PaymentModal from './PaymentModal';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function PreviewBooking({navigation, route}){
    const {checkIn,checkOut,name,surname,email,cellphone,address,kids,adults,value,} = route.params;

    const [modalVisible, setModalVisible] = useState(false);  
    const [open, setOpen] = useState(false);
    const [bookingDetails, setBookingDetails] = useState();

    const handleDatabase=()=>{     
        database().ref('Booking/'  ).push({
          uid:auth().currentUser.uid,
          checkIn: checkIn,
          checkOut: checkOut,
          name:name,
          surname:surname,
          email:email,
          cellphone:cellphone,
          address:address,
          Kids: kids,
          Adults:adults,
          rooms:value,
                }).then(() => {
                    console.log('Booking Added!');
                    setModalVisible(true);
                })
      
               navigation.navigate('PreviewBooking', {
                checkIn: checkIn,
                checkOut: checkOut,
                name:name,
                surname:surname,
                email:email,
                cellphone:cellphone,
                address:address,
                Kids: kids,
                Adults:adults,
                rooms:value,
               })
              
      }
      
    const hideModal= () =>{
        setModalVisible(false);
    }
    const retrieveBooking = () =>{
        database().ref('Booking/').on('value', snapshot => {
          if(snapshot.val() !== null || snapshot.val() !== undefined){
            //setRoomDetails(snapshot.val());
          console.log(snapshot.val());
          let booking = snapshot.val();
          let keys = Object.keys(booking);
          let temp = new Array()
          
          console.log(keys);

          for(let i = 0; i<keys.length; i++){
              let tempBooking = booking[keys[i]]
              tempBooking.key = keys[i]
            
            temp.push(tempBooking);
          }
          setBookingDetails(temp);
          console.log(temp)
          }
          
        })
      }
      useEffect(() => {
        retrieveBooking();
       //handleDatabase();
      },[])
      return bookingDetails.map((item, index) =>{
        return(
            
               <View key={item.key} >
                
                 <View>
               <TouchableOpacity   >
                 <Text style={styles.header}>{item.RoomType}</Text>          
                 <Text style={styles.description}>{item.RoomNumber}</Text>
                 <Text style={styles.description}>{item.Amenities}</Text>
       
                 {retrieveBooking()}
                 <TouchableOpacity style={styles.textLogin} kids={kids} adults={adults} rooms={value} onPress={() => handleDatabase()}>
                 <Text style={styles.next}>     Next -></Text>
                 <PaymentModal  showModal={modalVisible} hideModalGF={hideModal} navigation={navigation}/>
                 </TouchableOpacity>
                </TouchableOpacity>
                </View>
                 </View>
     
        
    )
})}
