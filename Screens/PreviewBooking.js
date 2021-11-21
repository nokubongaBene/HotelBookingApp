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

    const showModal=()=>{
      setModalVisible(true);
    }
    const hideModal= () =>{
        setModalVisible(false);
    }
    
        return(
            
               <View  >
                
                 <View style={styles.bookingCard}>
               <TouchableOpacity   >
               <Text style={styles.description}>Your Booking</Text>
                 <Text style={styles.header}>{checkIn}</Text>          
                 <Text style={styles.loginTexts}>{checkOut}</Text>
                 <Text style={styles.loginTexts}>{name}</Text>
                 <Text style={styles.loginTexts}>{surname}</Text>
                 <Text style={styles.loginTexts}>{email}</Text>
                 <Text style={styles.loginTexts}>{cellphone}</Text>
                 <Text style={styles.loginTexts}>{address}</Text>
                 <Text style={styles.loginTexts}>{kids}</Text>
                 <Text style={styles.loginTexts}>{adults}</Text>
                 <Text style={styles.loginTexts}>{value}</Text>
                 
       
                 <TouchableOpacity style={styles.textLogin} kids={kids} adults={adults} rooms={value} onPress={() => showModal()}>
                 <Text style={styles.next}>     Next -></Text>
                 <PaymentModal  showModal={modalVisible} hideModalGF={hideModal} navigation={navigation}/>
                 </TouchableOpacity>
                </TouchableOpacity>
                </View>
                 </View>
     
        
    )
  }
