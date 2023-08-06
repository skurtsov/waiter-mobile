import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Image,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Test from './Test';
import {Audio} from 'expo-av';
import { Root, Popup } from 'react-native-popup-confirm-toast'
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

let Register=(props)=> {
  const [nombre,setNombre]= useState('');
  const [cafe,setCafe]= useState('');
  const [tel,setTel]= useState('');
  const [mail,setMail]= useState('');
  const [ciudad,setCiudad]= useState('');
  const [adress,setAdress]= useState('');
  const [camareros,setCamareros]= useState(0);
  const [mesas,setMesas]= useState(0);
const[success,setSuccess]=useState(false);

  const [hidd,setHidd] = useState(false);

  // const [token,setToken]= useState('');
  // const [restoran,setRestoran]= useState('');
let go_login = () =>{
  fetch("https://reactive-cafe.com/api/newuser?nombre="+nombre+"&cafe="+cafe+"&tel="+tel+"&mail="+mail+"&ciudad="+ciudad+"&adress="+adress+"&camareros="+camareros+"&mesas="+mesas , {
    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    },
    cache: "no-cache",
    cors:"no-cors", // no-store, reload, no-cache, force-cache или only-if-cached
  }).then(function (response) {
      console.log('OK')
       });
       setSuccess(true)
}
  return (
    
    <View style={styles.container}>
      {success ? (
     <View>
        <Text style={styles.success_txt}>Su mensaje fue enviado exitosamente{"\n"}</Text>
        <Text style={styles.success_txt}>Nuestro gerente se comunicará con usted pronto</Text>
        <TouchableOpacity style={styles.success_btn} onPress={()=>props.setRegister(false)}>
          <Text style={styles.success_btn_txt}>OK</Text>
        </TouchableOpacity>
      </View> ) : (


      <View>
      <Image style={styles.img} source={require('../assets/logo.png')}/>
      <Text style={styles.headr}>Registro</Text>
          {/* Table cuantity */}
          <TextInput  placeholder='Nombre i Apellido ' style={styles.inpt} onChangeText={(text)=>setNombre(text)}/>
              {/* Table cuantity */}
          <TextInput placeholder='Nombre del café' style={styles.inpt} onChangeText={(texta)=>setCafe(texta)} />
              {/* Table cuantity */}
          <TextInput placeholder='Su teléfono' style={styles.inpt} onChangeText={(textb)=>setTel(textb)} />
                {/* Table cuantity */}
                <TextInput placeholder='Mail' style={styles.inpt} onChangeText={(textc)=>setMail(textc)} />
              {/* Table cuantity */}
          <TextInput placeholder='Ciudad' style={styles.inpt} onChangeText={(textd)=>setCiudad(textd)} />
              {/* Table cuantity */}
          <TextInput placeholder='Adress' style={styles.inpt} onChangeText={(texte)=>setAdress(texte)} />
        
          {/* Table cuantity */}
    
    {/*Waiter */}
    <Text style={styles.m__bot}>¿Cuántos camareros tienes?</Text>
          <View style={[styles.tables]}>
      
          <TouchableOpacity  onPress={()=>setCamareros(camareros-1)} style={styles.minus}>
              <Text style={styles.plus__minus}>-</Text>
         </TouchableOpacity>
          <Text style={styles.txt} >{camareros}</Text>
          <TouchableOpacity onPress={()=>setCamareros(camareros+1)} style={styles.plus}> 
           <Text style={styles.plus__minus}>+</Text>
          </TouchableOpacity>
          </View>
           {/* Waiter cuantity */}
           <Text style={styles.m__bot}>¿Cuántos mesas tienes?</Text>
           <View style={styles.tables}>
 
          <TouchableOpacity  onPress={()=>setMesas(mesas-1)} style={styles.minus}>  
          <Text style={styles.plus__minus}>-</Text>
          </TouchableOpacity>
          <Text style={styles.txt}>{mesas}</Text>
          <TouchableOpacity onPress={()=>setMesas(mesas+1)} style={styles.plus}>
              <Text style={styles.plus__minus}>+</Text>
              </TouchableOpacity>
    </View>
    



          {hidd ? <Text style={styles.err}>El nombre de usuario o la contraseña no es válida</Text>:null}
         <TouchableOpacity style={styles.login__button}onPress={go_login}>
               <Text style={styles.login__text}>Crear una cuenta</Text>
         </TouchableOpacity>
         </View>

    )}
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
  headr:{
    fontFamily:'mt-bold',
    fontSize:25,
    bottom:'1%',
    alignSelf:'center',
  },
  minus:{
    backgroundColor:'green',
    width:25,
    height:25,
    borderRadius:50,
    color: 'white',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    marginRight:5,
  },
  plus__minus:{
    fontFamily:'mt-medium',
    color:'white',
  },
  txt:{
    fontFamily:'mt-medium',
    fontSize:17,
    top:1,
    marginLeft:5,
    marginRight:5,
  },
  plus:{
    backgroundColor:'green',
    width:25,
    height:25,
    borderRadius:50,
    color: 'white',
    textAlign:'center',
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
  },
m__bot:{
  fontFamily:'mt-medium',
  marginBottom:10,
  marginTop:10,
  alignSelf:'center',
},
  tables:{
    flexDirection:'row',
    justifyContent:"center",
    alignSelf:'center',
    textAlign:'center',
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
    top:'5%'
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
    marginTop:10,
    alignSelf:'center',
  },
  login__text:{
    textAlign:'center',
    color:'white',
    fontFamily:'mt-medium',
    fontSize:15,
  },
  success_txt:{
    color: '#007053',
    fontFamily:'mt-bold',
    fontSize:22,
    textAlign:'center',
  },
  success_btn:{
    width:200,
    backgroundColor:'#007053',
    padding:15,
    borderRadius:10,
    marginTop:30,
    justifyContent:'center',
    alignSelf:'center'

  },
  success_btn_txt:{
    textAlign:'center',
    color:'white',
  }
});
export default Register ;