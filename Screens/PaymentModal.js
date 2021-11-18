import React, {useState,useRef,useEffect, memo} from 'react';
import { SafeAreaView, ScrollView,StatusBar,Dimensions,Button, Modal,Image,TextInput, TouchableOpacity,StyleSheet,Text,useColorScheme,View} from 'react-native';
import {NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import styles from '../StyleSheet/styles';
import Calendar from 'react-native-calendario';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height


export default function PaymentModal({showModal, hideModalGF, navigation}){
    const [cardNum, setCardnum] = useState();
    const [nameOnCard, setnameCard] = useState();
    const [expMonth, setExpM] = useState();
    const [expYear, setexpYear] = useState();
    const [cvv, setCvv] = useState();

    return(
        
        <Modal visible={showModal} animationType="slide">

        <View style={styles.bookingCard} >
            <TouchableOpacity style={styles.close} onPress={()=>{hideModalGF()}}>
            <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
           
            <View>
           <Text style={styles.loginTexts}>Name On Card: </Text>
            <TextInput style={styles.input} onChangeText={setnameCard} value={nameOnCard} />
            <Text style={styles.loginTexts}>Card Number:</Text>
            <TextInput style={styles.input} onChangeText={setCardnum} value={cardNum} />
            <Text style={styles.loginTexts}>Exp Month:</Text>
            <TextInput style={styles.input} onChangeText={setExpM} value={expMonth} />
            <Text style={styles.loginTexts}>Exp Year: </Text>
            <TextInput style={styles.input} onChangeText={setexpYear} value={expYear} />
            <Text style={styles.loginTexts}>CVV:</Text>
            <TextInput style={styles.input} onChangeText={setCvv} value={cvv} />

            {/* <TouchableOpacity style={styles.textSign} onPress={()=> {hideModalGF();navigation.navigate('PreviewBooking')}} > */}
            <Button title="Make Payment" style={styles.buttonBlue} onPress={()=>navigation.navigate('ClientBookings') } />
          {/* </TouchableOpacity> */}
          </View>
          </View>
      </Modal>
    )
}


