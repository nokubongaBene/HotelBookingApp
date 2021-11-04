import React, {useEffect, useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import Home from './Screens/Home';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Booking from './Screens/Booking';
import Preview from './Screens/Preview';
import PreviewBooking from './Screens/PreviewBooking';
import Profile from './Screens/Profile';


const Stack = createNativeStackNavigator();


export default function App({navigation}){
  const [loggedIn, setLogIn] = useState(false);

  useEffect(() => {
    handleAuth();
  },[])


  const handleAuth = () =>{
    auth().onAuthStateChanged(user => {
      if(user){
        setLogIn(true);
      }
    })
  }

  return(
    <NavigationContainer>
      {loggedIn ? 
      <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Preview" component={Preview}/>
     <Stack.Screen name="Booking" component={Booking} />
     <Stack.Screen name="PreviewBooking" component={PreviewBooking} />
     <Stack.Screen name="Profile" component={Profile} />
   </Stack.Navigator>
   :     
   <Stack.Navigator>  
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="SignIn" component={SignIn} />
   <Stack.Screen name="SignUp" component={SignUp}/> 
     </Stack.Navigator>
      }
   </NavigationContainer>
    
  );
}
