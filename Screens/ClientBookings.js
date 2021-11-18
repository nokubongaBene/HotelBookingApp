import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image,Alert,FlatList, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function PreviewBooking({navigation}){

  
  const [displayBooking, setDisplayBooking] = useState([]);

  const SignOut = () =>{
    // auth().signOut().then(() => {
    //   navigation.navigation('SignIn');
    // }).catch((error) => {
    //   alert('Oops, cannot seem to log out!')
    // });

    auth().signOut().then(()=>console.log('Signed Out'));
    
  }
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
          //navigation.navigate('Admin');
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
           <Text style={styles.headerProfile}>Booking</Text>
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
      <View style={styles.preview}>
         <TouchableOpacity style={styles.close} onPress={()=>SignOut()}>
        <Text style={styles.closeText}>X</Text>
        
        </TouchableOpacity>
        <Text style={styles.loginText}>Profile
          <Icon name="edit" size={30} color='white' /> Profile
          </Text>
        <ScrollView>
        {getDisplayBooking()}
        </ScrollView>
      </View>
    )
  }