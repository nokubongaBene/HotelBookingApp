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
import ClientBookings from './Screens/ClientBookings';
import Profile from './Screens/Profile';
import Admin from './Screens/Admin';
import AdminLogIn from './Screens/AdminLogIn';
import AdminReg from './Screens/AdminReg';
import database from '@react-native-firebase/database';
import AddHotel from './Screens/AddHotel';
import adminProfile from './Screens/adminProfile';
import PreviewBooking from './Screens/PreviewBooking';


const Stack = createNativeStackNavigator();


export default function App({navigation}){
  const [loggedIn, setLogIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    handleAuth();
  },[])

  const getUserDetails = () =>{
    let user = auth().currentUser;
    database().ref('Users/' + user.uid).on('value', snapshot => {
      setUserDetails(snapshot.val());
      setLogIn(true);
      
    })
    
    console.log(user);
  }

  const handleAuth = () =>{
    auth().onAuthStateChanged(user => {
      if(user){
       getUserDetails();
      }else {
        setLogIn(false);
      }
    })
  }

  return(
    <NavigationContainer>
      {loggedIn ? 
        userDetails.userRole === 'Admin' ? 
      <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="AddHotel" component={AddHotel} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="adminProfile" component={adminProfile} />
      </Stack.Navigator>
      :
      <Stack.Navigator screenOptions={{ headerShown: false}}>
    <Stack.Screen name="Preview" component={Preview}/>
     <Stack.Screen name="Booking" component={Booking} />
     <Stack.Screen name="PreviewBooking" component={PreviewBooking}/>
     <Stack.Screen name="ClientBookings" component={ClientBookings} />
     <Stack.Screen name="Profile" component={Profile} />
      
   </Stack.Navigator>
   :  
    
   <Stack.Navigator screenOptions={{ headerShown: false}}>  
     <Stack.Screen name="Home" component={Home} />
     <Stack.Screen name="SignIn" component={SignIn} />
   <Stack.Screen name="SignUp" component={SignUp}/> 
   <Stack.Screen name="AdminReg" component={AdminReg} />
 
     </Stack.Navigator>
      }
   </NavigationContainer>
    
  );
}
