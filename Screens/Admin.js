import React, {useState} from 'react';
import { SafeAreaView, Image, ScrollView,Dimensions,TouchableOpacity,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import data from '../Json/HotelInfo.json';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default function Admin({navigation, }){
 
    // console.log(data.info[0].name);
  return(
  
      <View style={styles.preview}>
          <ScrollView>
          <Text></Text>
    
    {data.info.map((item, index) =>{
      return(
        <ScrollView>
        <View key={index} >
          <View style={styles.previewCards}>
        <TouchableOpacity   >
          <Text style={styles.header}>{item.name}</Text>          
          <Text style={styles.description}>{item.Location}</Text>
          <Text style={styles.description}>{item.Description}</Text>
          <TouchableOpacity>
              <Text style={styles.description}>Update                        Delete</Text>
              </TouchableOpacity>
          <Image style={{height: height * 0.20, width: width * 0.30, borderRadius:15, position: 'absolute', marginTop: 20,}} source={{uri:item.image}}/> 
          
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