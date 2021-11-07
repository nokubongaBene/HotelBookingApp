import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,TextInput,TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Stack = createNativeStackNavigator();


export default function AdminLogIn({navigation}){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

    const handleSignIn = () => {
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
          //getting user info
          console.log('Logged In');
         
      }).catch(error=> {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
        else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        else{
            Alert.alert(error.message);
        }
      })
     // navigation.navigate('Preview');
      };
  return(
    <View style={styles.welcome}>
    <View style={styles.card}>
       
    <Text style={styles.welcomeText}>LOG IN</Text>

    <Text style={styles.loginTexts}>Email</Text>
<TextInput style={styles.input} onChangeText={setEmail} value={email} />
<Text style={styles.loginTexts} >Password:</Text>
<TextInput style={styles.input} secureTextEntry={true} onChangeText={setPassword} value={password} />
    <TouchableOpacity style={styles.textLogin} onPress={() => handleSignIn()}>
        <Text style={styles.Login}>     Log In</Text>
        </TouchableOpacity>

    
</View>
</View>


  )
}