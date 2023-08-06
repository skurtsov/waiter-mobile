import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Test from './Test';
import {Audio} from 'expo-av';
import { Root, Popup } from 'react-native-popup-confirm-toast'


let Auth=(props)=> {
  const [login,setLogin]= useState('');
  const [pass,setPass]= useState('');
  const [hidd,setHidd] = useState(false);
  // const [token,setToken]= useState('');
  // const [restoran,setRestoran]= useState('');
let go_login = () =>{
  fetch("https://reactive-cafe.com/api/getuser?username="+login+"&password="+pass, {
    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    },
    cache: "no-cache",
    mode:"no-cors", // no-store, reload, no-cache, force-cache или only-if-cached
  }).then(function (response) {
      response.json().then(function (data) {
        console.log("data token is:"+data.token)
        props.setRestoran(data.restoran);
        props.setToken(data.token)
       })})
      setTimeout(()=>setHidd(true),1000);
}
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/logo.png')}/>
      {/* <Text style={styles.headl}>Bienvenido a Reactive Cafe</Text> */}
          <TextInput autoCapitalize='none' placeholder='Login' style={styles.inpt} onChangeText={(text)=>setLogin(text)}/>
          <TextInput secureTextEntry={true} autoCapitalize="none" placeholder='Password' style={styles.inpt} onChangeText={(textq)=>setPass(textq)} />
          {hidd ? <Text style={styles.err}>El nombre de usuario o la contraseña no es válida</Text>:null}
         <TouchableOpacity style={styles.login__button}onPress={go_login}>
               <Text style={styles.login__text}>Iniciar sesión</Text>
         </TouchableOpacity>
         <Text></Text> 
         <TouchableOpacity style={styles.cuenta} onPress={()=>props.setRegister(true)}>
               <Text >¿ No tienes cuenta? Crear una cuenta</Text>
         </TouchableOpacity>
    </View>
  );
          

}

const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
     flex:1,
     alignSelf: "stretch",
     marginTop:-100,
     justifyContent:'center',
     alignItems:'center',
  },
  err:{
    fontFamily:'mt-medium',
    fontSize:10,
    color:'red',
  },
  cuenta:{
    fontFamily:'mt-medium',
    fontSize:10,
  },
  img:{
    width:250,
    height:250,
    resizeMode: 'stretch',
  },
  headl:{
    fontFamily:'mt-medium',
    fontSize:20,
    marginBottom:50,
  },
  inpt:{
    borderColor:'transparent',
    borderWidth:1,
    borderStyle:'solid',
    width:250,
    padding:10,
    margin: 10,
    borderRadius:50,
    backgroundColor:'#cfcfcf85',
    fontFamily:'mt-medium',
  },
  login__button:{
    width:200,
    backgroundColor:'#007053',
    padding:15,
    borderRadius:10,
    marginTop:30,
  },
  login__text:{
    textAlign:'center',
    color:'white',
    fontFamily:'mt-medium',
    fontSize:15,
  }
});
export default Auth ;