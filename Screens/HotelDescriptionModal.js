import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import wifi from "../images/captureall.jpeg";
import styles from '../StyleSheet/styles';
import data from '../Json/HotelInfo.json';
import {icon} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

//const image = {uri: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"};

export default function HotelDescriptionModal({hotelDetails,showModal, hideModalGF, navigation}){
 //const {hotelDetails} = route.params;
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckout] = useState();
  const [roomDetails, setRoomDetails] = useState([]);

  const retrieveRooms = () =>{
    database().ref('Rooms/').on('value', snapshot => {
      if(snapshot.val() !== null || snapshot.val() !== undefined){
        //setRoomDetails(snapshot.val());
      console.log(snapshot.val());
      let rooms = snapshot.val();
      let keys = Object.keys(rooms);
      let temp = new Array()
      
      console.log('hey',keys);

      for(let i = 0; i<keys.length; i++){
          let tempRoom = rooms[keys[i]]
          tempRoom.key = keys[i]
        console.log(tempRoom);
        temp.push(tempRoom);
      }
      setRoomDetails(temp);
      console.log('this is',temp)
      }
      
    })
  }
  useEffect(() => {
    retrieveRooms();
   //handleDatabase();
  },[])
  
  const displayRoomDetails =() =>{
    return roomDetails.map((item, index) =>{
       return(
      
         <View key={item.key} >
           <View style={styles.previewCards}>
           
         <TouchableOpacity   >
           <Text style={styles.header}>{item.RoomType}</Text>          
           <Text style={styles.description}>{item.RoomNumber}</Text>
           <Text style={styles.description}>{item.Description}</Text>
           <Text style={styles.description}>{item.Amenities}</Text>
           <Image style={{height: height * 0.25, width: width * 0.32, borderRadius:15, position: 'absolute', marginTop: 20,}} source={{uri:item.image}}/> 
           </TouchableOpacity>
           </View>
         </View>
       )
     })}
    
    return(
      <SafeAreaView>
    <Modal visible={showModal} animationType="slide">
    <View style={styles.preview}>
      <ScrollView>
        <TouchableOpacity style={styles.close} onPress={()=>{hideModalGF()}}>
            <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            
          { roomDetails.map((item, index) =>{
      return(
        <View key={index} >
          <View style={styles.roomCard}>
      
          <Image style={{height: height * 0.50, width: width * 0.95, borderRadius:15,}} source={{uri:item.image}}/>
          <Text style={styles.header}>{hotelDetails.name}</Text>
          <Text style={styles.headerRoom}>{item.RoomType}</Text> 
          <Text style={styles.descriptionRoom}>{hotelDetails.Location}</Text>          
          <Text style={styles.descriptionRoom}>Room Number: {item.RoomNumber}</Text>
          <Text style={styles.descriptionRoom}> {item.Description}</Text>
          <Text style={styles.descriptionRoom}>Amenities:{item.Amenities}</Text>
       {/* <ion-icon name="wifi-outline"></ion-icon> */}
          {/* <Image style={{height: height * 0.04, width: width * 0.50, borderRadius:15,}} source={wifi}/> */}
        
          <TouchableOpacity style={styles.textSign} onPress={()=> {hideModalGF()}} >
            <Text style={styles.Login}>   Book Now  </Text>
          </TouchableOpacity>
          </View>
        </View>
      )
    })}

</ScrollView>
        </View>
</Modal>
</SafeAreaView>
    )
}

