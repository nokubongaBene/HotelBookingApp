import React, {useState,useRef,useEffect, memo} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import Calendar from 'react-native-calendario';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height


export default function DatepickerModal({showModal, hideModalGF, navigation}){
    
    
    // const [date, setDate] = useState();
    const [checkIn, setCheckIn] = useState([]);
    const [checkOut, setCheckout] = useState([]);
    //const [dates,setDate] = useState();

    const hideModal= () =>{
        setModalVisible(false);
    }

    const setDate = (selectedDate) =>{
        setCheckIn(selectedDate);
      }

    return(
        <Modal visible={showModal} animationType="slide">
            <View>
            <TouchableOpacity style={styles.close} onPress={()=>{hideModalGF()}}>
            <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>
    
        <Calendar
            minDate={Date()}
            markingType={'period'}
            onDayPress={(day)=>{setDate(day.dateString)}}
            onDayLongPress={(day)=> {console.log('selected day', day)}}
            markedDates={{
            [checkIn]: {
            selected: true, endingDay:true, color: 'green', textColor: 'gray'
    },
 }} />
        </View>
      </Modal>
    )
}


