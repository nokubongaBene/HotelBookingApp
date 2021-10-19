import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
let width= Dimensions.get('window').width
let height= Dimensions.get('window').height

export default styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width : width,
        height: height,

    },
    viewText:{
        width: width * 0.5,
        marginTop: height * 0.25,
        marginLeft: width * 0.09,

    },
    signUp:{
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 25,
        marginLeft: width * 0.1,
        marginVertical: 5,
        marginHorizontal: 3,

    },
    textAccount: {
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8,
        marginLeft: width * 0.09,
        height: height * 0.08,
        marginTop: height * 0.22,
    },
    signIn: {
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 25,
        color: 'white',
    },
    textSignIn:{
        borderRadius: 30,
        borderWidth: 3,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.8,
        marginLeft: width * 0.09,
        height: height * 0.08,
        marginTop: height * 0.05,
        backgroundColor: 'black',
    },
    welcome:{
        backgroundColor: 'white',
        width : width,
        height: height,  
    },
    welcomeText:{
        fontSize: 60,
        color: 'white',
        fontWeight: 'bold',
        marginLeft: width * 0.09,
        marginTop: height * 0.08,
    },
    card: {
        marginTop: height * 0.08,
        borderRadius: 25,
        elevation: 3,
        backgroundColor: 'black',
        shadowRadius: 5,
        width: width * 0.9,
        marginLeft: width * 0.05,
        height: height * 0.8

    },
    loginTexts:{
        color: 'white',
        marginLeft: width * 0.05,
        marginTop: height * 0.05,
        
    },
    input:{
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 10,
        width: width * 0.75,
        marginLeft: width * 0.05,
        color: 'white'
    },
    Login:{
        color: 'white',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 25,
        borderColor: 'white',
        backgroundColor: 'black',
        marginHorizontal: width * 0.2,
        marginVertical: width * 0.1,
        borderColor: 'white',
        borderRadius: 6,
        borderWidth: width * 0.01,
        height: height * 0.05,
        width: width * 0.4,

    },
    hotels:{
        backgroundColor:'white',
        height: height * 0.15,
        width: width * 0.90,
        marginBottom: width * 0.04,
        borderRadius: 9,
        marginLeft: width * 0.05,
        
    },
    preview:{
        backgroundColor:'white',
        width: width,
        height: height,
      

    },
    close:{
        color: 'white'

    },
    closeText:{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: width * 0.95
    },
    description:{
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        position : 'absolute',
        width: width * 0.6,
        marginLeft: width * 0.25,
        padding: 7,
        marginHorizontal: height * 0.1
    },
    bookingCard:{
        backgroundColor: 'white',
        width: width,
        height: height,

    },
    heading:{
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width * 0.1,
    },
    bookingText:{
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * 0.03,

    },
    buttons:{
        marginTop: height *0.5,
    },
    next:{
        color: 'black',
        fontWeight: 'bold',
        alignItems: 'center',
        fontSize: 25,
        marginLeft: width * 0.1,
        marginHorizontal: 3,
        borderRadius: 6,
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: width*0.2,
        marginRight: width*0.2,
        marginTop: height * 0.05,
    }
    
})