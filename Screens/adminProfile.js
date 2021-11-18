import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image,Alert,FlatList, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/FontAwesome';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function adminProfile({navigation}){

  const [adminName, setAdminName] = useState();
  const [adminSurname, setAdminSurname] = useState();
  const [role, setRole] = useState();
  const [hotel, setHotel] = useState();
  const [displayUser, setDisplayUser] = useState([]);

  const handleDatabase=()=>{     
    database().ref('Users/' ).push({
        uid: auth().currentUser.uid,
      adminName: 'Asanda',
      adminSurname: 'Nkambule',
      UserRole: 'Admin',
      hotel:'Serenity Hotel'
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
  const getUser=()=>{
    database().ref('Users/').on('value', snapshot => {
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
        <Text style={styles.loginText}>Profile
          <Icon name="edit" size={30} color='white' /> Profile
          </Text>
        <ScrollView>
        {getDisplay()}
        </ScrollView>
      </View>
    )
  }