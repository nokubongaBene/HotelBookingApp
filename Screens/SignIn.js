import React from 'react';
import { SafeAreaView, ScrollView,StatusBar,TextInput,TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';

const Stack = createNativeStackNavigator();


export default function SignIn({navigation}){
  return(
    <View style={styles.welcome}>
    <View style={styles.card}>
       
    <Text style={styles.welcomeText}>Welcome!</Text>

    <Text style={styles.loginTexts}>Email</Text>
<TextInput style={styles.input} />
<Text style={styles.loginTexts} >Password:</Text>
<TextInput style={styles.input} />
    <TouchableOpacity style={styles.textLogin} onPress={() => navigation.navigate('Preview')}>
        <Text style={styles.Login}>     Sign In</Text>
        </TouchableOpacity>

    
</View>
</View>


  )
}