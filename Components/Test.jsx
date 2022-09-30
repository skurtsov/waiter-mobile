import React from "react";
import { Text, View, FlatList,StyleSheet, Modal, TextInput, Button} from 'react-native';
import { Dimensions } from 'react-native';
//import {faCheck} from ';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faTrash, faPen  } from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect} from 'react';
import { Pressable } from "react-native"




let Test = (props) => {
    let arr = props.zakaz.split(",");
    const [hidden, setHidden] = useState(false);
    let show_arr = arr.slice(1,arr.length);
   // console.log("array to show"+show_arr)
   let deleteById=(prod_id)=>{
    alert('deleted'+prod_id)
    fetch("https://makemesites.com/restoran/app/delete_idmob.php?restoran=gyros&id="+prod_id, {
      method: "GET", // POST, PUT, DELETE, etc.
      headers: {
        // значение этого заголовка обычно ставится автоматически,
        // в зависимости от тела запроса
        "Content-Type": "text/plain;charset=UTF-8"
      },
      cache: "no-cache", // no-store, reload, no-cache, force-cache или only-if-cached
    })
        // var xhr = new XMLHttpRequest();

        // var body = "id="+prod_id+"&restoran="+restoran;
        
        // console.log(props.orders);
        // xhr.open("POST", 'https://makemesites.com/restoran/delete_id.php', true);
        // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // xhr.send(body);
        // console.log(xhr)
        // props.setIgnore(true)
     }
return(
<View style={st.card}>
<Text style={st.mesa}>Numero de mesa:{props.stolik}</Text>
<View style={st.card_c}>
<FlatList
        data={show_arr}
        renderItem={({item}) => <Text>{item}</Text>}
      />
     
              {/* <FontAwesomeIcon  size={30} icon={ faCheck } /> */}
              {/* <FontAwesomeIcon icon={ faTrash} /> */}
              {/* <FontAwesomeIcon size={30} icon={ faPen} /> */}
              
              {hidden ? <Pressable onPress={()=> setHidden(false)}>
  <FontAwesomeIcon style={st.check} icon={faCheck} size={25} />
</Pressable> :
            <Pressable onPress={()=> deleteById(props.id)}>
            <FontAwesomeIcon style={st.trash} icon={faTrash} size={25} />
          </Pressable>}
          <Pressable onPress={()=>setHidden(true)}>
            <FontAwesomeIcon style={st.edit} size={25} icon={faPen} />
            </Pressable>
              </View>
<Modal style={st.mmodal} visible={hidden}>
  <View>
    <Text>Modalll</Text>
  <TextInput style={st.tarea}
    multiline={true}
    numberOfLines={50}
    defaultValue={show_arr.toString()}
    />
    <Button title="redact" onPress={()=>setHidden(false)}/> 
  </View>
</Modal>

</View>       
);
}
const st = StyleSheet.create({
    card: {
        borderBottomStyle: "solid",
        borderBottomColor: "#000",
        borderBottomWidth: 1,
        width: Dimensions.get('window').width,
    },
      mesa:{
        width: Dimensions.get('window').width,
        textAlign:"center",
        justifyContent:"center",
        selfAlign:"center",
        textAlignVertical: "center",
      },
      card_c:{
        flexDirection:"row",
      },
      check:{
        color:"green",
        margin:20,
      },
      trash:{
        color:'red',
        margin:20,

      },
      edit:{
        color:'blue',
        margin:20,
      },
      tarea: {
        width:Dimensions.get('window').width,
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        alignItems:'center',
    },

       
   
  });
export default Test;