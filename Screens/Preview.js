import React, {useState, Component, useEffect} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Modal,useLayoutEffect,Alert, Image,Dimensions, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import data from '../Json/HotelInfo.json';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import profile from "../images/orangeProfile.jpeg";
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

const Stack = createNativeStackNavigator();
//const image = {uri: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"};


export default function Preview({navigation }){

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.close} onPress={()=>SignOut()}>
        <Text style={styles.closeText}>Log Out</Text>
        </TouchableOpacity>
      )
    })
  })

    const [modalVisible, setModalVisible] = useState(false);
    //To display hotel info on the modal Description
    const [hotelDetails, setHotelDetails] = useState({});
    const [roomDetails, setRoomDetails] = useState([]);

    const handleDatabase=()=>{

      for(let i=0; i < data.info.length; i++ ){
      let item = data.info[i]      
        database().ref('Hotels/' ).push({
          name: item.name,
          Location: item.Location,
          image: item.image,
          Description: item.Description
                }).then(() => {
                    console.log('Hotel Added!');
                   
                })
      }
     
    }
   
    
    //storing the data of the hotel
    const storeHotelDetails =(item) =>{
      console.log('item ', item);
      setHotelDetails(item)
      navigation.navigate('Dates',{hotelDetails:item})
    }


    const SignOut = () =>{
      // auth().signOut().then(() => {
      //   navigation.navigation('SignIn');
      // }).catch((error) => {
      //   alert('Oops, cannot seem to log out!')
      // });

      auth().signOut().then(()=>console.log('Signed Out'));
      
    }
    const displayRoomDetails =() =>{
      return roomDetails.map((item, index) =>{
         return(
        
           <View key={item.key} >
             <View style={styles.previewCards}>
             
           <TouchableOpacity   >
             <Text style={styles.header}>{item.RoomType}</Text>          
             <Text style={styles.description}>{item.RoomNumber}</Text>
             <Text style={styles.description}>{item.Amenities}</Text>
             <Image style={{height: height * 0.04, width: width * 0.50, borderRadius:15, marginLeft: width*0.30}} source={wifi}/>
             <Image style={{height: height * 0.25, width: width * 0.32, borderRadius:15, position: 'absolute', marginTop: 20,}} source={{uri:item.image}}/> 
             </TouchableOpacity>
             </View>
           </View>
         )
       })}
     
    // console.log(data.info[0].name);
  return(
  
      <View style={styles.preview}>
        <TouchableOpacity style={styles.close} onPress={()=>SignOut()}>
        <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
           <TouchableOpacity onPress={()=> navigation.navigate('Profile')}>
        <Image style={{height: height * 0.04, width: width * 0.08, borderRadius:15, marginLeft: width*0.10}} source={profile}/>
        </TouchableOpacity>
          <ScrollView>
          <Text> </Text>
    
    {data && data.info.map((item, index) =>{
      {/* database().ref('Hotels/' + 'hotel').set({
        name: item.name,
        Location: item.Location,
        image: item.image,
        Description: item.Description
              }).then(() => {
                 // Alert.alert('User account created & signed in!');
                 
              }) */}
      return(
        <ScrollView key={index}>
        <View  >
     
          <View style={styles.previewCards}>
        <TouchableOpacity  onPress={() => storeHotelDetails(item) } >
          <Text style={styles.header}>{item.name}</Text>          
          <Text style={styles.description}>{item.Location}</Text>
          <Text style={styles.description}>{item.Description}</Text>
          <Image style={{height: height * 0.15, width: width * 0.30, borderRadius:15, position: 'absolute', marginTop: 20,}} source={{uri:item.image}}/>
          </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      )
    })}



    

</ScrollView>
    </View>
   
  )
}