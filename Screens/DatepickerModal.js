import React, {useState,useRef,useEffect, memo} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import Calendar from 'react-native-calendario';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height


export default function DatepickerModal({showModal, hideModalGF, navigation}){

    return(
        <Modal visible={showModal} animationType="slide">
           
      </Modal>
    )
}


