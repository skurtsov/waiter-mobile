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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './Components/Register';

const fonts= () => Font.loadAsync({
  'mt-medium': require('./assets/fonts/Montserrat-Medium.ttf'),
  'mt-bold': require('./assets/fonts/Montserrat-Bold.ttf')
});


export default function App() {
  const [font, setFont] = useState(false)
  const [token,setToken] = useState('marta')
  const [register,setRegister] = useState(false)
  const [restoran,setRestoran] = useState('marta')
if(font){
  return (   
        
        <NavigationContainer>
         {token !== null ? <Main token={token} restoran={restoran} /> : register !== false ? <Register setRegister={setRegister}/> :  <Auth token={token} setRegister={setRegister} setRestoran={setRestoran} setToken={setToken}/> } 
      </NavigationContainer>
     
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
