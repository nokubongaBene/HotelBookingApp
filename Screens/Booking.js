import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,TextInput,TouchableHighlight,Modal, Platform, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import { Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import PaymentModal from './PaymentModal';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import DatePicker from 'react-native-date-picker';


const Stack = createNativeStackNavigator();


LocaleConfig.locales['fr'] = {
  monthNames: ['January','February','March','April','May','June','Jully','August','September','October','November','Décember'],
  monthNamesShort: ['Jan.','Feb.','Mar','Apr','May','Jun','Jul.','Aug','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';



export default function Booking({route ,navigation }){
  const {checkIn, checkOut} = route.params;

  const [modalVisible, setModalVisible] = useState(false);    
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [kids, setKids] = useState();
  const [adults, setAdults] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email,setEmail] = useState();
  const [cellphone, setPhone] = useState();
  const [address,setAddress] = useState();

  const setDate = (selectedDate) =>{
    setCheckIn(selectedDate);
  }
 const setCheckoutdate = (selectedDateCheckout) =>{
   setCheckout(selectedDateCheckout);
 }

  const hideModal= () =>{
    setModalVisible(false);
}


const handleDatabase=()=>{     
  database().ref('Booking/'  ).push({
    uid:auth().currentUser.uid,
    checkIn: checkIn,
    checkOut: checkOut,
    name:name,
    surname:surname,
    email:email,
    cellphone:cellphone,
    address:address,
    Kids: kids,
    Adults:adults,
    rooms:value,
          }).then(() => {
              console.log('Booking Added!');
              setModalVisible(true);
          })

         navigation.navigate('PreviewBooking', {
          checkIn: checkIn,
          checkOut: checkOut,
          name:name,
          surname:surname,
          email:email,
          cellphone:cellphone,
          address:address,
          Kids: kids,
          Adults:adults,
          rooms:value,
         })
        
}



  return(
   
    <View style={styles.bookingCard} >
     <ScrollView>  
    
 <Text style={styles.heading}>Room Booking</Text>
<View>



 <Text style={styles.loginTexts}>Guest Name:</Text>
 <TextInput style={styles.input} onChangeText={setName} value={name} />
 <Text style={styles.loginTexts}>Guest Surname: </Text>
 <TextInput style={styles.input} onChangeText={setSurname} value={surname} />
 <Text style={styles.loginTexts}>Email:</Text>
 <TextInput style={styles.input} onChangeText={setEmail} value={email} />
 <Text style={styles.loginTexts}>Cellphone:</Text>
 <TextInput style={styles.input} keyboardType='numeric' onChangeText={setPhone} value={cellphone} />
 <Text style={styles.loginTexts}>Enter Address:</Text>
 <TextInput style={styles.input} onChangeText={setAddress} value={address} />
 {/* <CalendarList
            horizontal={true}
            pastScrollRange={0}
            futureScrollRange={50}
            markingType={'period'}
            onDayPress={(day)=>{setDate(day.dateString)}}
            onDayPress={(day)=>{setCheckoutdate(day.dateString)}} 
            onDayLongPress={(day)=> {selectedDateCheckout (day.dateString)}}
            //onDateChange={(day)=> setCheckout(day.dateString)}
            markedDates={{
            /* [checkIn]: {selected: true,startingDay:true, color: 'green', textColor: 'gray'},
            [checkOut]: {selected: false, endingDay:true, color: 'yellow', textColor: 'gray'}
            [checkIn]:{startingDay: true, color:'green'},
            [checkOut]:{selected:true,  endingDay:true, color:'green', textColor:'gray'},
            [checkIn]:{disabled:true, startingDay:true, color:'green', endingDay:true}
            
 }} /> */}
 {/* <Text style={styles.bookingText}>Date {checkOut}</Text>
 <Calendar
            minDate={Date()}
            markingType={'period'}
            onDayPress={(day)=>{setCheckoutdate(day.dateString)}}
            onDayLongPress={(day)=> {('selected day', day)}}
            markedDates={{
            [checkOut]: {selected: true, endingDay:true, color: 'green', textColor: 'gray'},
            
 }} /> */}


<View>
<Text style={styles.loginTexts} >Guest(s):</Text>
<Text style={styles.loginTexts}>Adult(s)</Text>
<Picker
  selectedValue ={adults}
  style={{color: 'white'}}
  onValueChange={(itemValue, itemIndex)=>
  setAdults(itemValue)}>
<Picker.Item label="1" value="1"/>
<Picker.Item label="2" value="2"/>
<Picker.Item label="3" value="3"/>
<Picker.Item label="4" value="4"/>
<Picker.Item label="5" value="5"/>
<TextInput style={styles.input} />
</Picker>
<Text style={styles.loginTexts}>Kid(s)</Text>
<Picker
  selectedValue ={kids}
  style={{color: 'white'}}
  onValueChange={(itemValue, itemIndex)=>
  setKids(itemValue)}>
  <Picker.Item label="0" value="0"/>
<Picker.Item label="1" value="1"/>
<Picker.Item label="2" value="2"/>
<Picker.Item label="3" value="3"/>
<Picker.Item label="4" value="4"/>
<Picker.Item label="5" value="5"/>
<TextInput style={styles.input} />
</Picker>

<View>
<Text style={styles.loginTexts}>Room(s)</Text>
<Picker
  selectedValue ={value}
  style={{color: 'white'}}
  onValueChange={(itemValue, itemIndex)=>
  setValue(itemValue)}>
<Picker.Item label="1" value="1"/>
<Picker.Item label="2" value="2"/>
<Picker.Item label="3" value="3"/>
<Picker.Item label="4" value="4"/>
<Picker.Item label="5" value="5"/>
<TextInput style={styles.input} />
</Picker>
</View>
</View>
 <TouchableOpacity style={styles.textLogin} kids={kids} adults={adults} rooms={value} onPress={() => handleDatabase()}>
     <Text style={styles.next}>     Next -></Text>
     <PaymentModal  showModal={modalVisible} hideModalGF={hideModal} navigation={navigation}/>
     </TouchableOpacity>
  </View>
  </ScrollView>
    </View>
   
  )
}