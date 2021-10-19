import React, {useState, Component} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Modal,Image, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';

const Stack = createNativeStackNavigator();

export default function PreviewBooking(){
    return(
        <View>
            <Text>Hello World</Text>
            </View>
    )
}