import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Button,ImagePicker, Dimensions, Modal,Image,FlatList, TextInput, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function AddHotel({route, navigation}){
    const { RoomType, RoomNumber, Amenities } = route.params;

    const [addroomType, setRoomType] = useState();
    const [addroomNumber, setRoomNumber] = useState();
    const [addamenities, setAmenities] = useState();
    const [addimage, setImage] = useState();

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
                setImage(source);
            }
        });
    }



    return(
        <View  style={styles.preview}>
             <Text style={styles.welcomeText}>Add Room </Text>
            <Text style={styles.loginTexts}>Room Name:</Text>
            <TextInput  multiline style={styles.input}
            value={RoomType}
            onChangeText={(val) => setRoomType(val)} />

            <Text style={styles.loginTexts}>Room Number:</Text>
            <TextInput style={styles.input}
            value={RoomNumber}
            onChangeText={(val) => setRoomNumber(val)}/>

            <Text style={styles.loginTexts}>Room Amenities:</Text>
            <TextInput  multiline style={styles.input}
            value={Amenities}
            onChangeText={(val) => setAmenities(val)}/>

            <View>
                <TouchableOpacity onPress={() => chooseImage()}>
                <Text style={styles.loginTexts}>Choose Image</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title='Add Room'/>
                    </View>
            </View>
            
    )
}