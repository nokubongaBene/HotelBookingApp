import React, {useState} from 'react';
import { SafeAreaView, ScrollView,TextInput,TouchableOpacity,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const Stack = createNativeStackNavigator();


export default function SignUp({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirmp] = useState('');

    const handleSignUp = () => {
      auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
          //getting user info
          let user = auth().currentUser;
          var today = new Date();
          var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          var dateTime = date+' '+time;

          //pushing or setting user to details
          database().ref('Users/' + user.uid).set({
              email: email,
               password: password, 
               date: dateTime
              }).then(() => {
                  // Alert.alert('User account created & signed in!');
                  navigation.navigate('Preview');
              })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('That email address is already in use!');
        }
    
        else if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
        }
        else{
            Alert.alert(error.message);
        }
      });
      
        
      };

  return(
    <View style={styles.welcome}>
    <View style={styles.card}>
       
    <Text style={styles.welcomeText}>Welcome!</Text>

    <Text style={styles.loginTexts}>Email</Text>
<TextInput style={styles.input} onChangeText={setEmail} value={email}/>
<Text style={styles.loginTexts} >Password:</Text>
<TextInput style={styles.input} secureTextEntry={true} onChangeText={setPassword} value={password} />
<Text style={styles.loginTexts} >Confirm Password:</Text>
<TextInput style={styles.input} secureTextEntry={true}/>
    <TouchableOpacity style={styles.textLogin} onPress={() => handleSignUp()}>
        <Text style={styles.Login}>     Sign Up</Text>
        </TouchableOpacity>

    
</View>
</View>
  )
}