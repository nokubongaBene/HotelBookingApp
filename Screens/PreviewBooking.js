import React, {useState, Component} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Modal,Image, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import data from '../Json/HotelInfo.json';

const Stack = createNativeStackNavigator();

export default function PreviewBooking({navigation}){
    return(
        <View>
            {data.ClientDetails.map((item, index) =>{
                return(
                    <View key={index}>
                        <Text style={styles.header}>Booking Details</Text>
                    <Text style={styles.bookingDetails}>{item.name} {item.Surname}</Text>
                    <Text style={styles.bookingDetails}>{item.Email}</Text>
                    <Text style={styles.bookingDetails}>{item.Cellphone}</Text>
                    <Text style={styles.bookingDetails}>Adult Guest: {item.adults}</Text>
                    <Text style={styles.bookingDetails}>Kids Guest: {item.kids}</Text>
                    <Text style={styles.bookingDetails}>Rooms Booked: {item.rooms}</Text>
                    <Text style={styles.bookingDetails}> Date Booked: </Text>
                    </View>
                )
            })}
            
            <TouchableOpacity style={styles.textLogin} onPress={() => navigation.navigate('Profile')}>
     <Text style={styles.next}>     Next -></Text>
     </TouchableOpacity>
            </View>
    )
}