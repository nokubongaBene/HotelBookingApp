import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import wifi from "../images/captureall.jpeg";
import styles from '../StyleSheet/styles';
import data from '../Json/HotelInfo.json';
import {icon} from 'react-native-elements';


let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

//const image = {uri: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"};

export default function HotelDescriptionModal({hotelDetails,showModal, hideModalGF, navigation}){

    
    return(
      <SafeAreaView>
    <Modal visible={showModal} animationType="slide">
    <View style={styles.preview}>
        <TouchableOpacity style={styles.close} onPress={()=>{hideModalGF()}}>
            <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
            
            {data.roomDetails.map((item, index) =>{
      return(
        <View key={index} >
          <View style={styles.roomCard}>
      
          <Image style={{height: height * 0.50, width: width * 0.95, borderRadius:15,}} source={{uri:item.image}}/>
          <Text style={styles.header}>{hotelDetails.name}</Text>
          <Text style={styles.headerRoom}>{item.RoomType}</Text> 
          <Text style={styles.descriptionRoom}>{hotelDetails.Location}</Text>          
          <Text style={styles.descriptionRoom}>Room Number: {item.RoomNumber}</Text>
          <Text style={styles.descriptionRoom}>Amenities:</Text>
       {/* <ion-icon name="wifi-outline"></ion-icon> */}
          <Image style={{height: height * 0.04, width: width * 0.50, borderRadius:15,}} source={wifi}/>

          <TouchableOpacity style={styles.textSign} onPress={()=> {hideModalGF();navigation.navigate('Booking')}} >
            <Text style={styles.Login}>   Book Now</Text>
          </TouchableOpacity>
          </View>
        </View>
      )
    })}

        </View>
</Modal>
</SafeAreaView>
    )
}

