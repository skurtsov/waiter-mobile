import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, ProgressViewIOSComponent, ScrollView, FlatList } from 'react-native';
import Test from './Test';
import {Audio} from 'expo-av';
import { Root, Popup } from 'react-native-popup-confirm-toast'


let Main=(props)=> {
    let restoran = props.restoran;
    const playSound= async()=>{
      await Audio.Sound.createAsync(
        { uri: 'https://makemesites.com/restoran/new.mp3' },
        { shouldPlay: true }
      );

    }
    const [responsew, setResponsew] = useState("");
    let  [pedidos, setPedidos] = useState(0);
    let [ptemp, setPtemp] = useState(0);
    let [ignore, setIgnore] = useState(false);
    const [newr, setNewr] = useState("");
    let arr = ["hello its my","bbbf"];
    let get_orders=()=>{
  fetch("https://makemesites.com/restoran/app/waitermobb.php?restoran="+restoran, {
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
          return <Test restoran={restoran} key={el.id} style={styles.full} setIgnore={setIgnore} zakaz={el.zakaz} id={el.id} stolik={el.stolik}></Test>
        })
        setNewr(ordersToShow)
        
      //  console.log(ordersToShow);
       })})
}
let clean_orders=()=>{     

    fetch("https://makemesites.com/restoran/app/cleanmob.php?restoran="+restoran, {
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
  if(newr.length !== 0 && !ignore)
  playSound();
  setIgnore(false);
 }, [newr.length]);
  return (
    <Root style={styles.blanco}>
        <View style={styles.container}>
                <View style={styles.content}>
                      <Text style={styles.total}>Pedidos totales:{newr.length}</Text>

                      <View style={styles.scrl}>
                            <ScrollView style={{height:800}}>
                                <Text>
                                    {newr}
                                </Text>
                            </ScrollView>
                      </View>
           
            </View>
            
        </View>
                     
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
                                    fontFamily:'mt-bold',
                                    },
                                })
                            
                            }
                        >
                            <Text style={styles.bu_text}>Limpiar todo</Text>
                        </TouchableOpacity>
                  
                </View>
    </Root>
  );
          

}

const styles = StyleSheet.create({
  container: {
     backgroundColor: '#fff',
     flex:1,
     alignSelf: "stretch",
    backgroundColor:'white'

  },
  content:{
    marginTop:'15%',
  },
  full:{
    width: '100%',
  },
  scrl:{
    height:'87%',
    },
  limpia:{
    width:100,
    justifyContent:'center',
  },
  total:{
    textAlign:"center",
    fontFamily:'mt-bold',
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
 // marginTop: '5%',
  padding:10,
  position:'absolute',
  bottom:10,
},
okButtonStyle:{
  backgroundColor:'#40bb5e',
},
blanco:{
  backgroundColor:'white',
},
bu_text:{
  color:'#40bb5e',
  fontFamily:'mt-medium',
},
});
export default Main ;