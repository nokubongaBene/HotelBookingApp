import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image,FlatList, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function Profile({navigation}){

  
  const [displayBooking, setDisplayBooking] = useState([]);

  const getUserBooking=()=>{
    database().ref('Booking/').on('value', snapshot => {
      if(snapshot.val() !== null || snapshot.val() !== undefined){
          let bookings = snapshot.val();
          let keys = Object.keys(bookings);
          let temp = new Array();

         
        for(let i = 0; i<keys.length; i++){
          let tempBooking = bookings[keys[i]];
          tempBooking.key = keys[i];
          console.log(tempBooking);

          if(tempBooking.uid === auth().currentUser.uid){
            temp.push(tempBooking)
          }
          
        }
        console.log("temp is ",temp);
        setDisplayBooking(temp);
      }
    })
  }

  const getDisplayBooking =() =>{
    return displayBooking.map((item, index) =>{
      return(
        <ScrollView>
        <View key={item.key}>
          <ScrollView>
           <Text style={styles.header}>Previous Booking</Text>
                    <Text style={styles.bookingDetails}>{item.name} {item.surname}</Text>
                    <Text style={styles.bookingDetails}>{item.email}</Text>
                    <Text style={styles.bookingDetails}>{item.cellphone}</Text>
                    <Text style={styles.bookingDetails}>Adult Guest: {item.Adults}</Text>
                    <Text style={styles.bookingDetails}>Kids Guest: {item.Kids}</Text>
                    <Text style={styles.bookingDetails}>Rooms Booked: {item.rooms}</Text>
                    <Text style={styles.bookingDetails}> Date Booked:{item.checkIn} - {item.checkOut} </Text>
                    </ScrollView>
          </View>
          </ScrollView>
      )
    })}

    useEffect(() => {
      getUserBooking();
    },[])

    
    return(
      <View>
        <ScrollView>
        {getDisplayBooking()}
        </ScrollView>
      </View>
    )
  }