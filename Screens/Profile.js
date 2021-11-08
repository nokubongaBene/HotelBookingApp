import React from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions, Modal,Image,FlatList, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

const data =[{key: 1},{key: 2},{key: 3},{key: 4},{key: 5},{key: 6},{key: 7}];
  const numColumns = 2;
  
  export default function Profile({navigation}){
    const SignOut = () =>{
      // auth().signOut().then(() => {
      //   navigation.navigation('SignIn');
      // }).catch((error) => {
      //   alert('Oops, cannot seem to log out!')
      // });

      auth().signOut().then(()=>console.log('Signed Out'));
      
    }
    const formatData = (data, numColumns) => {
        const numRows = Math.floor(data.length / numColumns);
      
        let numberoflastRow = data.length - (numberoflastRow * numColumns);

        while(numberoflastRow !== numColumns && numberoflastRow !== 0){
          data.push({key: 'blank', empty: true});
          numberoflastRow= numberoflastRow + 1;
        }
      
      
        return data;
      }
    return(
      <View style={styles.preview}>
      <TouchableOpacity style={styles.close} onPress={()=>SignOut()}>
      <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
        <Text> </Text>
      <View style={styles.containerProfile}>
           <ScrollView>
        <View style={styles.box}>
          <View style={styles.inner}>
            <Text>Box 1</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Admin')} >
          <View style={styles.box}>
          <View style={styles.inner}>
            <Text>Box 2</Text>
            </View>
          </View>
         </TouchableOpacity>
          </ScrollView>
        </View>
        </View>
        
    )
  }
  