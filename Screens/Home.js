import React from 'react';
import { SafeAreaView, Image, ScrollView,Dimensions,TouchableOpacity,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

const Stack = createNativeStackNavigator();
const image = {uri: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60"};

export default Home = ({navigation}) => {
  return(
    <View style={styles.container}>
      <Image style={{height: height, width: width, borderRadius:15, position: 'absolute'}} source={image} />
    <View style={styles.viewText}>
    </View>
    <View style={styles.buttons}>
    <TouchableOpacity style={styles.textSignIn} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signIn}>Sign Up</Text>
        </TouchableOpacity>
    <TouchableOpacity style={styles.textSign} onPress={() => navigation.navigate('SignIn')}>
        <Text style={styles.signUp}>Already Have An Account?</Text>
        </TouchableOpacity>

        </View>
</View>
  )
}
