import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import Test from './Components/Test';
import {Audio} from 'expo-av';
import { Root, Popup } from 'react-native-popup-confirm-toast'

export default function App() {
    let restoran = "gyros";
    const playSound= async()=>{
      await Audio.Sound.createAsync(
        { uri: 'https://makemesites.com/restoran/new.mp3' },
        { shouldPlay: true }
      );

    }
    const [responsew, setResponsew] = useState("");
    let  [pedidos, setPedidos] = useState(0);
    let [ptemp, setPtemp] = useState(0);
    const [newr, setNewr] = useState("");
    let arr = ["hello its my","bbbf"];
let get_orders=()=>{
  fetch("https://makemesites.com/restoran/app/waitermobb.php?restoran=gyros", {
    method: "GET", // POST, PUT, DELETE, etc.
    headers: {
      // значение этого заголовка обычно ставится автоматически,
      // в зависимости от тела запроса
      "Content-Type": "text/plain;charset=UTF-8"
    },
    cache: "no-cache", // no-store, reload, no-cache, force-cache или only-if-cached
  }).then(function (response) {
      response.text().then(function (data) {
       let q = JSON.parse(data)
        let n = q.map((el)=><Text key={el.id}>{el.zakaz}</Text>)
        let ordersToShow = q.map((el)=>{
          return <Test key={el.id} style={styles.full} zakaz={el.zakaz} id={el.id} stolik={el.stolik}></Test>
        })
        setNewr(ordersToShow)
        
      //  console.log(ordersToShow);
       })})
}
let clean_orders=()=>{     

    fetch("https://makemesites.com/restoran/app/cleanmob.php?restoran=gyros", {
      method: "GET", // POST, PUT, DELETE, etc.
      headers: {
        // значение этого заголовка обычно ставится автоматически,
        // в зависимости от тела запроса
        "Content-Type": "text/plain;charset=UTF-8"
      },
      cache: "no-cache", // no-store, reload, no-cache, force-cache или only-if-cached
    })

}
useEffect(() => {

  setInterval(() => {
    get_orders();
    setPedidos(newr.length)
  }, 2000);

  
}, []);
useEffect(() => {
  playSound();
 }, [newr.length]);
  return (
    <Root style={styles.blanco}>
    <View style={styles.container}>
      <Text style={styles.total}>Pedidos totales:{newr.length}</Text>
      <Text>{newr}</Text>

       
        <View style={styles.loginButtonSection}>
        <TouchableOpacity
         style={styles.button}
            onPress={() =>
                Popup.show({
                    type: 'confirm',
                    title: '¿Está seguro?',
                    textBody: 'Si hace clic en "sí", se borran todos los pedidos ',
                    buttonText: 'Sí',
                    confirmText: 'No',
                    callback: () => {
                        clean_orders();
                        Popup.hide();
                    },
                    cancelCallback: () => {
                        Popup.hide();
                    },
                    okButtonStyle: {
                      backgroundColor: 'green',
                    },
                })
            
            }
        >
            <Text style={styles.bu_text}>Limpiar todo</Text>
        </TouchableOpacity>
   
    </View>
    
    </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
     flex:1,
     alignSelf: "stretch",
     marginTop: 100,


  },
  full:{
    width: '100%',
  },
  limpia:{
    width:100,
    justifyContent:'center',
  },
  total:{
    textAlign:"center",
    fontSize:23,
    marginBottom:40,
    marginTop:-20,
  },
  loginButtonSection: {

    justifyContent: 'center',
    alignItems: 'center'
 },
 loginButton: {
  backgroundColor: 'transparent',
  color: '#40bb5e',
  width:250,
},
button: {
  alignItems: 'center',
  backgroundColor: "transparent",
  width: 150,
  height: 45,
  borderColor: "#40bb5e",
  color:'#40bb5e',
  borderWidth: 2,
  borderRadius: 5,
  marginTop: 250,
  padding:10
},
okButtonStyle:{
  backgroundColor:'#40bb5e',
},
blanco:{
  backgroundColor:'black',
},
bu_text:{
  color:'#40bb5e',
},
});
