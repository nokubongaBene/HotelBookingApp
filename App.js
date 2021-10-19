import React from 'react';
import { SafeAreaView, ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Screens/Home';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Booking from './Screens/Booking';
import Preview from './Screens/Preview';
import PreviewBooking from './Screens/PreviewBooking';


const Stack = createNativeStackNavigator();


export default function App({navigation}){
  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="SignIn" component={SignIn} />
   <Stack.Screen name="SignUp" component={SignUp}/>
     <Stack.Screen name="Preview" component={Preview}/>
     <Stack.Screen name="Booking" component={Booking} />
     <Stack.Screen name="PreviewBooking" component={PreviewBooking} />
     </Stack.Navigator>
   </NavigationContainer>
    
  )
}
