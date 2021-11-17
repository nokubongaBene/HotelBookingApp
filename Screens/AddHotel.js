import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Button, Dimensions, Modal,Image,FlatList, TextInput, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import data from '../Json/HotelInfo.json';
import database from '@react-native-firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from "react-native-image-picker";
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function AddHotel({route, navigation}){
    const { title,buttonText, key,RoomType, RoomNumber, Amenities } = route.params;

    const [addroomType, setAddRoomType] = useState(RoomType);
    const [addroomNumber, setAddRoomNumber] = useState(RoomNumber);
    const [addamenities, setAddAmenities] = useState(Amenities);
    const [addimage, setAddImage] = useState();


    const handleDatabase=()=>{     
                database().ref('Rooms/' ).push({
                  RoomType: addroomType,
                  RoomNumber: addroomNumber,
                  image: addimage,
                  Amenities:addamenities
                        }).then(() => {
                            console.log('Rooms Added!');
                           
                        })

                        //console.log(RoomNumber);
                        navigation.navigate('Profile');
              }

              const handleUpdate = () =>{
                database().ref('Rooms/' + key).update({
                  RoomType:addroomType,
                  RoomNumber: addroomNumber,
                  Amenities: addamenities
                })
              }
    const chooseImage = () =>{
        var options ={
            title:'Select Image',
            storageOptions:{
                skipBackup: true,
                path: 'images',
            },
        }
        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }else if(response.error){
                //console.log('Image picker Error: ', response.error);
            }else if(response.customButton){
                console.log('user tapped custom button: ', response.customButton);
            }else{
                let source = 'data:image/jpeg;base64, ' + response.data ;
                setAddImage(source);
            }
        });
    }



    return(
        <ScrollView>
        <View  style={styles.preview}>
             <Text style={styles.welcomeText}>{title} </Text>
            <Text style={styles.loginTexts}>Room Name:</Text>
            <TextInput  multiline style={styles.input}
            value={addroomType}
            onChangeText={(val) => setAddRoomType(val)} />

            <Text style={styles.loginTexts}>Room Number:</Text>
            <TextInput style={styles.input}
            keyboardType='numeric'
            value={addroomNumber}
            onChangeText={(val) => setAddRoomNumber(val)}/>

            <Text style={styles.loginTexts}>Room Amenities:</Text>
            <TextInput  multiline style={styles.input}
            value={addamenities}
            onChangeText={(val) => setAddAmenities(val)}/>

            <View>
                <TouchableOpacity onPress={() => chooseImage()}>
                <Text style={styles.loginTexts}>Choose Image</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title={buttonText} onPress={()=> {buttonText === "Add" ? handleDatabase() : handleUpdate() }
                         }/>
                   
                    </View>
            </View>
            </ScrollView>
    )
}