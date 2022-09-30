import { StatusBar } from 'expo-status-bar';
import { useState,useEffect} from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import Test from './Components/Test';
import {Audio} from 'expo-av';

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
        
        console.log(ordersToShow);
       })})
}
// useEffect(() => {
  // fetch('https://makemesites.com/restoran/waitermob.php?restoran=gyros')
  // .then(function (response) {
  //   response.text().then(function (data) {
  //  setNewr(data)
  //   })
  // })

// })
useEffect(() => {

  setInterval(() => {
    get_orders();
    setPedidos(newr.length)

  // 
 //   try {
  //     // play the file tone.mp3
  //    // SoundPlayer.playSoundFile('tone', 'mp3')
  //     // or play from url
     
  // } catch (e) {
  //     console.log(`cannot play the sound file`, e)
  // }
  //console.log("ped:"+pedidos);
  }, 2000);

  
}, []);
useEffect(() => {
  playSound();
 }, [newr.length]);
  return (
    <View style={styles.container}>
      <Text style={styles.total}>Pedidos totales:{newr.length}</Text>
      <Text>{newr}</Text>
      <View  style={styles.limpia}>
      <Button title="go" onPress={playSound}></Button>
        </View>     
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
  full:{
    width: '100%',
  },
  limpia:{
    justifyContent:"center",
    alignContent:"center",
  //  position:"absolute",
    bottom:0,
  },
  total:{
    textAlign:"center",
    fontSize:23,
    marginBottom:40,
    marginTop:-20,
  }
});
