import React, {useState, useEffect} from 'react';
import { SafeAreaView, Image, ScrollView,Dimensions,Alert,Button,TouchableOpacity,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import data from '../Json/HotelInfo.json';
import auth from '@react-native-firebase/auth';
import wifi from "../images/captureall.jpeg";
import database from '@react-native-firebase/database';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function Admin({navigation, }){
  const [id, setId] = useState();
  const [hotelDetails, setHotelDetails] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [RoomType, setRoomType] = useState();
  const [RoomNumber, setRoomNumber] = useState();
  const [Amenities, setAmenities] = useState();

  useEffect(() => {
    retrieveRooms();
   //handleDatabase();
  },[])

  const handleAddRoom=()=>{

  }
  
      const handleDatabase=()=>{
  
        for(let i=0; i < data.roomDetails.length; i++ ){
        let item = data.roomDetails[i]      
          database().ref('Rooms/' ).push({
            RoomType: item.RoomType,
            RoomNumber: item.RoomNumber,
            image: item.image,
            Amenities: item.Amenities
                  }).then(() => {
                      console.log('Hotel Added!');
                     
                  })
        }
       
      }

      const retrieveRooms = () =>{
        database().ref('Rooms/').on('value', snapshot => {
          if(snapshot.val() !== null || snapshot.val() !== undefined){
            //setRoomDetails(snapshot.val());
          console.log(snapshot.val());
          let rooms = snapshot.val();
          let keys = Object.keys(rooms);
          let temp = new Array()
          
          console.log(keys);

          for(let i = 0; i<keys.length; i++){
              let tempRoom = rooms[keys[i]]
              tempRoom.key = keys[i]
            
            temp.push(tempRoom);
          }
          setRoomDetails(temp);
          console.log(temp)
          }
          
        })
      }
      const handleUpdate = () =>{
        database().ref('Rooms/' + item.key).update({
          RoomType: RoomType,
          RoomNumber: RoomNumber,
          Amenities: Amenities
        })
      }

    const handleDelete = (item) =>{
      Alert.alert(
        "",
        "Are you sure you want to Delete Room?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () =>  {database().ref('Rooms/' + item.key).remove()} }
        ]
      );
     console.log(item);
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
        <TouchableOpacity  onPress={()=> navigation.navigate('AddHotel', {
          RoomType:RoomType,
          RoomNumber: RoomNumber,
          Amenities: Amenities,
          })} >
          <Text style={styles.header}>{item.RoomType}</Text>          
          <Text style={styles.description}>{item.RoomNumber}</Text>
          <Text style={styles.description}>{item.Amenities}</Text>
          <Image style={{height: height * 0.04, width: width * 0.50, borderRadius:15, marginLeft: width*0.30}} source={wifi}/>
          
              <Button title="Update" color='black' onPress={()=> handleUpdate()}  /> 
              <Button title="Delete" onPress={()=> handleDelete(item)} />

          <Image style={{height: height * 0.25, width: width * 0.32, borderRadius:15, position: 'absolute', marginTop: 20,}} source={{uri:item.image}}/> 
          </TouchableOpacity>
          </View>
        </View>
      )
    })}
  
 
    // console.log(data.info[0].name);
  return(
    <ScrollView>
    <View style={styles.preview}>
    <TouchableOpacity style={styles.close} onPress={()=>SignOut()}>
    <Text style={styles.closeText}>X</Text>
    </TouchableOpacity>
      <View style={styles.preview}>
          
          <Text></Text>
    
   {displayRoomDetails()}

   

 
<TouchableOpacity >
      <Text>Add Hotel </Text>
      </TouchableOpacity>
</View>
</View>
</ScrollView>
    )
}