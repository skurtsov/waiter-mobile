import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Test from './Components/Test';
import {Audio} from 'expo-av';
import { Root, Popup } from 'react-native-popup-confirm-toast'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Main from './Components/Main';
import Auth from './Components/Auth';


const fonts= () => Font.loadAsync({
  'mt-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
  'mt-bold': require('./assets/fonts/Montserrat-Bold.ttf')
});


export default function App() {
  const [font, setFont] = useState(false)
if(font){
  return (   
        <Auth/>  
  );}
  else{
    return(
    <AppLoading onError={console.warn} startAsync={fonts} onFinish={()=>setFont(true)}/>
    );
  }
}


const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
     flex:1,
     alignSelf: "stretch",
     marginTop: 100,
  }
});
