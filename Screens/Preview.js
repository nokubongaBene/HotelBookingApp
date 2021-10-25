import React, {useState, Component} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Modal,Image,Dimensions, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import HotelDescriptionModal from './HotelDescriptionModal';
import data from '../Json/HotelInfo.json';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

const Stack = createNativeStackNavigator();
//const image = {uri: "https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGhvdGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"};


export default function Preview({navigation, }){
    const [modalVisible, setModalVisible] = useState(false);
    //To display hotel info on the modal Description
    const [hotelDetails, setHotelDetails] = useState({});

    //storing the data of the hotel
    const storeHotelDetails =(item) =>{
      console.log(item);
      setHotelDetails(item);
      setModalVisible(true);
    }

    const hideModal= () =>{
        setModalVisible(false);
    }

    // console.log(data.info[0].name);
  return(
    <ScrollView>
      <View style={styles.preview}>
          <Text></Text>
    
    {data.info.map((item, index) =>{
      return(
        <View key={index} >
          <View style={styles.previewCards}>
        <TouchableOpacity  onPress={() => storeHotelDetails(item) } >
          <Text style={styles.header}>{item.name}</Text>          
          <Text style={styles.description}>{item.Location}</Text>
          <Text style={styles.description}>{item.Description}</Text>
          <Image style={{height: height * 0.15, width: width * 0.30, borderRadius:15, position: 'absolute', marginTop: 20,}} source={{uri:item.image}}/>
          </TouchableOpacity>
          </View>
        </View>
      )
    })}



    
<HotelDescriptionModal hotelDetails={hotelDetails} showModal={modalVisible} hideModalGF={hideModal} navigation={navigation}/>

    </View>
    </ScrollView>
  )
}