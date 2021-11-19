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

export default function adminProfile({navigation}){

  const [adminName, setAdminName] = useState();
  const [adminSurname, setAdminSurname] = useState();
  const [role, setRole] = useState();
  const [hotel, setHotel] = useState();
  const [displayUser, setDisplayUser] = useState([]);
  const [addimage, setaddimage] = useState();

  const handleDatabase=()=>{  
     
    database().ref('Profile/' + auth().currentUser.uid ).push({
       // uid: auth().currentUser.uid,
      adminName: 'Test',
      adminSurname: 'Tester',
      UserRole: 'Admin',
      hotel:'Serenity Hotel',
      image:addimage,
            }).then(() => {
                console.log('Rooms Added!');
                navigation.navigate('Profile');
               
            })

            //console.log(RoomNumber);
            
  }
  const SignOut = () =>{
    // auth().signOut().then(() => {
    //   navigation.navigation('SignIn');
    // }).catch((error) => {
    //   alert('Oops, cannot seem to log out!')
    // });

    auth().signOut().then(()=>console.log('Signed Out'));
    
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
          
            setaddimage(source);
            console.log(source)
        }
    });
    Alert.alert('hello world');
}

  const getUser=()=>{
    database().ref('Profile/').on('value', snapshot => {
      if(snapshot.val() !== null || snapshot.val() !== undefined){
          let users = snapshot.val();
          let keys = Object.keys(users);
          let temp = new Array();

         
        for(let i = 0; i<keys.length; i++){
          let tempUser = users[keys[i]];
          tempUser.key = keys[i];
          console.log(tempUser);

          if(tempUser.uid === auth().currentUser.uid ){
            temp.push(tempUser)
          }
          //navigation.navigate('Admin');
        }
        console.log("temp is ",temp);
        setDisplayUser(temp);
      }
    })
  }

  const getDisplay =() =>{
    return displayUser.map((item, index) =>{
      return(
        <ScrollView>
        <View key={item.key}>
          <ScrollView>
          <TouchableOpacity onPress={()=> chooseImage()}>
        <Image style={{height: height * 0.40, width: width * 0.60, borderRadius:15, marginLeft: width*0.10}} source={{uri:addimage}}/>
        </TouchableOpacity>
           <Text style={styles.header}>Previous Booking</Text>
                    <Text style={styles.bookingDetails}>{item.email}</Text>
                    <Text style={styles.bookingDetails}>{item.adminName} {item.adminSurname}</Text>
                    <Text style={styles.bookingDetails}></Text>
                    <Text style={styles.bookingDetails}>{item.role}</Text>
                    
                    </ScrollView>
          </View>
          </ScrollView>
      )
    })}

    useEffect(() => {
      getUser();
 //handleDatabase();
    },[])

    
    return(
      <View style={styles.preview}>
         <TouchableOpacity style={styles.close} onPress={()=>SignOut()}>
        <Text style={styles.closeText}>X</Text>
        
        </TouchableOpacity>
        
        <ScrollView>
        {getDisplay()}
        </ScrollView>
      </View>
    )
  }