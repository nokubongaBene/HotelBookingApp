import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Button, Dimensions, Alert,Modal,Image,FlatList, TextInput, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import data from '../Json/HotelInfo.json';
import database from '@react-native-firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';

let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function AddHotel({route, navigation}){
    const {title,buttonText, key,RoomType, RoomNumber, Description,Amenities, image } = route.params;

    const [addroomType, setAddRoomType] = useState(RoomType);
    const [addroomNumber, setAddRoomNumber] = useState(RoomNumber);
    const [addroomDescription, setAddRoomDescription] = useState(Description);
    const [addamenities, setAddAmenities] = useState(Amenities);
    const [addimage, setaddimage] = useState(image);


    const handleDatabase=()=>{     
                database().ref('Rooms/' ).push({
                  RoomType: addroomType,
                  RoomNumber: addroomNumber,
                  Description:addroomDescription,
                  image: addimage,
                  Amenities:addamenities,
                  image:addimage
                        }).then(() => {
                            console.log('Rooms Added!');
                            navigation.navigate('Admin');
                           
                        })

                        //console.log(RoomNumber);
                        
              }

              const handleUpdate = () =>{
                database().ref('Rooms/' + key).update({
                  RoomType:addroomType,
                  RoomNumber: addroomNumber,
                  Description: addroomDescription,
                  Amenities: addamenities,
                  image: addimage
                })
                navigation.navigate('Admin');
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
            }
        });
        Alert.alert('hello world');
    }



    return(
        <ScrollView>
        <View  style={styles.preview}>
            <ScrollView>
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

            <Text style={styles.loginTexts}>Room Description:</Text>
            <TextInput style={styles.input}
            value={addroomDescription}
            onChangeText={(val) => setAddRoomDescription(val)}/>

            <Text style={styles.loginTexts}>Room Amenities:</Text>
           <Picker
                selectedValue ={addamenities}
                style={{color: 'white'}}
                onValueChange={(itemValue, itemIndex)=>
                setAddAmenities(itemValue)}>
                <Picker.Item label="+Wifi +Pool +Jacuzzi +Breakfast +Aircon" value="+Wifi +Pool +Jacuzzi +Breakfast +Aircon"/>
                <Picker.Item label="+Wifi +Pool +Jacuzzi +Breakfast " value="+Wifi +Pool +Jacuzzi +Breakfast"/>
                <Picker.Item label="+Wifi +Pool +Breakfast +Aircon" value="+Wifi +Pool +Breakfast +Aircon"/>
                <Picker.Item label="+Wifi +Pool +Breakfast" value="+Wifi +Pool +Breakfast"/>
                <Picker.Item label="+Aircon +Pool +Breakfast " value="+Aircon +Pool  +Breakfast"/>
                <TextInput style={styles.input} />
                </Picker>

            <View>
                <TouchableOpacity onPress={() => chooseImage()}>
                <Text style={styles.loginTexts}>Choose Image</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title={buttonText} onPress={()=> {buttonText === "Add" ? handleDatabase() : handleUpdate() }
                         }/>
                   
                    </View>
                    </ScrollView>
            </View>
            </ScrollView>
    )
}