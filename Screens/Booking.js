import React, {useState} from 'react';
import { SafeAreaView, ScrollView,StatusBar,TextInput,TouchableHighlight,Modal, Platform, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
// import Calendar from 'react-native-calendar-select';
import DropDownPicker from 'react-native-dropdown-picker';
import {Picker} from '@react-native-picker/picker';
import { Calendar, CalendarList, Agenda, LocaleConfig} from 'react-native-calendars';
import DatepickerModal from './DatepickerModal';


const Stack = createNativeStackNavigator();


LocaleConfig.locales['fr'] = {
  monthNames: ['January','February','March','April','May','June','Jully','August','September','October','November','Décember'],
  monthNamesShort: ['Jan.','Feb.','Mar','Apr','May','Jun','Jul.','Aug','Sept.','Oct.','Nov.','Déc.'],
  dayNames: ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
  dayNamesShort: ['Sun.','Mon.','Tue.','Wed.','Thu.','Fri.','Sat.'],
  today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'fr';



export default function Booking({navigation}){
  
  const [modalVisible, setModalVisible] = useState(false);    
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [kids, setKids] = useState();
  const [adults, setAdults] = useState();

  const hideModal= () =>{
    setModalVisible(false);
}

  
  return(
    <View style={styles.bookingCard} >
    
 <Text style={styles.heading}>Room Booking</Text>
<View>
<TouchableOpacity onPress={()=> setModalVisible(true)}>
 <Text style={styles.bookingText}>Date</Text>
 <DatepickerModal showModal={modalVisible} hideModalGF={hideModal} navigation={navigation}/>
</TouchableOpacity>
<View>
<Text style={styles.bookingText} >Guest(s):</Text>
<Text style={styles.bookingText}>Adult(s)</Text>
<Picker
  selectedValue ={adults}
  onValueChange={(itemValue, itemIndex)=>
  setAdults(itemValue)}>
<Picker.Item label="1" value="1"/>
<Picker.Item label="2" value="2"/>
<Picker.Item label="3" value="3"/>
<Picker.Item label="4" value="4"/>
<Picker.Item label="5" value="5"/>
<TextInput style={styles.input} />
</Picker>
<Text style={styles.bookingText}>Kid(s)</Text>
<Picker
  selectedValue ={kids}
  onValueChange={(itemValue, itemIndex)=>
  setKids(itemValue)}>
<Picker.Item label="1" value="1"/>
<Picker.Item label="2" value="2"/>
<Picker.Item label="3" value="3"/>
<Picker.Item label="4" value="4"/>
<Picker.Item label="5" value="5"/>
<TextInput style={styles.input} />
</Picker>

<View>
<Text style={styles.bookingText}>Room(s)</Text>
<Picker
  selectedValue ={value}
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
 <TouchableOpacity style={styles.textLogin} onPress={() => navigation.navigate('PreviewBooking')}>
     <Text style={styles.next}>     Next -></Text>
     </TouchableOpacity>
  </View>
    </View>
  )
}