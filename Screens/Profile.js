import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image,Alert,FlatList, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
import profile from "../images/orangeProfile.jpeg";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function Profile({navigation}){

  const [addimage, setaddimage] = useState();
  const [displayBooking, setDisplayBooking] = useState([]);
  const [profileImage, setProfileimage] = useState();

  const SignOut = () =>{
    // auth().signOut().then(() => {
    //   navigation.navigation('SignIn');
    // }).catch((error) => {
    //   alert('Oops, cannot seem to log out!')
    // });

    auth().signOut().then(()=>console.log('Signed Out'));
    
  }
  const getPRofile=()=>{
    let user = auth().currentUser;
    database().ref('Profile/' + user.uid).on('value', snapshot => {
      setProfileimage(snapshot.val());
      
    })
    
    console.log(user);
  }
  useEffect(() => {
    getPRofile();
//handleDatabase();
  },[])
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
          }else {
            temp.push(tempBooking);
            //Alert.alert('No bookings for this user.');
           
          }
          //navigation.navigate('Admin');
        }
        console.log("temp is ",temp);
        setDisplayBooking(temp);
      }
    })
  }
  const chooseImage = () =>{
    var options ={
        title:'Select Image',
        includeBase64: true,
        storageOptions:{
            skipBackup: true,
            path: 'images',
        },
    }
   // ImagePicker.launchCamera
   launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
            console.log('User cancelled image picker');
        }else if(response.error){
            //console.log('Image picker Error: ', response.error);
        }else if(response.customButton){
            console.log('user tapped custom button: ', response.customButton);
        }else{
            let source = 'data:image/jpeg;base64, ' + response.assets[0].base64 ;
            console.log(source)
            setaddimage(source);
            handleProfile(source);
        }
    });
    Alert.alert('hello world');
}
const handleProfile=(source)=>{  
  
 database().ref('Profile/' + auth().currentUser.uid ).set({
    // uid: auth().currentUser.uid,
   adminName: 'Test',
   adminSurname: 'Tester',
   UserRole: 'Admin',
   hotel:'Serenity Hotel',
   addimage:source,
         }).then(() => {
             console.log('Rooms Added!');
            // navigation.navigate('Profile');
            
         })

         //console.log(RoomNumber);
         
}



  const getDisplayBooking =() =>{
    return displayBooking.map((item, index) =>{
      return(
        <ScrollView>
        <View key={item.key}>
          <ScrollView>
           <Text style={styles.headerProfile}>Previous Booking</Text>
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
        <TouchableOpacity onPress={()=> chooseImage()}>
        <Image style={{height: height * 0.4, width: width * 0.6, borderRadius:15, marginLeft: width*0.20}} source={{uri:addimage}}/>
        </TouchableOpacity>
        <ScrollView>
        {getDisplayBooking()}
        </ScrollView>
      </View>
    )
  }