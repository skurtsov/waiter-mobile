import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Test from './Test';
import {Audio} from 'expo-av';
import { Root, Popup } from 'react-native-popup-confirm-toast'


let Auth=(props)=> {
  const [login,setLogin]= useState('');
  const [pass,setPass]= useState('');
  const [token,setToken]= useState('');
  const [restoran,setRestoran]= useState('');
let go_login = () =>{
  fetch("https://makemesites.com/restoran/app/loginmoba.php?username="+login+"&password="+pass, {
    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    },
    cache: "no-cache", // no-store, reload, no-cache, force-cache или only-if-cached
  }).then(function (response) {
      response.json().then(function (data) {
        console.log(data)
        props.setRestoran(data.restoran);
        props.setToken(data.token)
       })})
}
  return (
    <View style={styles.container}>
          <TextInput placeholder='login' onChangeText={(text)=>setLogin(text)}/>
          <TextInput placeholder='password' onChangeText={(textq)=>setPass(textq)} />
      <Button title="Login" onPress={go_login} ></Button>
    </View>
  );
          

}

const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
     flex:1,
     alignSelf: "stretch",
     marginTop: 100,


  },
});
export default Auth ;