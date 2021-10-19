import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

//const image = {uri: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"};

export default function HotelDescriptionModal({hotelDetails,showModal, hideModalGF, navigation}){

    
    return(
    <Modal visible={showModal} animationType="slide">
    <View>
        <TouchableOpacity style={styles.close} onPress={()=>{hideModalGF()}}>
            <Text style={styles.closeText}>X</Text>
            </TouchableOpacity>

            <View>
            {/* <Image style={{height: height * 0.50, width: width * 0.85, borderRadius:15,}} source={image} /> */}
            <Image style={{height: height * 0.50, width: width * 0.85, borderRadius:15,}} source = {{uri:hotelDetails.image}}/>
            <Text>{hotelDetails.name}</Text>
            <Text>{hotelDetails.Location} </Text>
        <Text>{hotelDetails.Description} </Text>
            
            <Text>Amenities</Text>

            <View style={styles.description}>
        
            </View>
             
                </View>

            <TouchableOpacity style={styles.textSignIn} onPress={()=> {hideModalGF();navigation.navigate('Booking')}}>
        <Text style={styles.signIn}>Book Now</Text>
        </TouchableOpacity>
        </View>
</Modal>
    )
}

