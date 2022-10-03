import React, { useRef } from "react";
import { Text, View, FlatList,StyleSheet, Modal, TextInput, Button, TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';
//import {faCheck} from ';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faTrash, faPen  } from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect} from 'react';
import { Pressable } from "react-native"
import { Root, Popup } from 'react-native-popup-confirm-toast'



let Modal_me = (props) => {

    const [text,setText] = useState(props.zakaz);
  let go_redact=()=>{
  //  alert(text)
    fetch("https://makemesites.com/restoran/app/redactmob.php?restoran=gyros&id="+props.id+"&order="+text, {
      method: "GET", // POST, PUT, DELETE, etc.
      headers: {
        // значение этого заголовка обычно ставится автоматически,
        // в зависимости от тела запроса
        "Content-Type": "text/plain;charset=UTF-8"
      },
      cache: "no-cache", // no-store, reload, no-cache, force-cache или only-if-cached
    })
    Popup.hide();
  }
return(
<View>
<TextInput multiline={true} defaultValue={text} onChangeText={(text) => setText(text)} style={st.tarea}/>
<View style={st.loginButtonSection}>
<TouchableOpacity style={st.redact} onPress={go_redact}>
  <Text style={st.redact_txt}>Editar</Text>
</TouchableOpacity>
</View>
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
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        alignItems:'center',
        fontFamily:'mt-medium',
    },
    redact: {
      alignItems: 'center',
      backgroundColor: "green",
      color:'#fff',
      width: '100%',
      height: 45,
      borderColor: "green",
      borderWidth: 2,
      borderRadius: 10,
      marginTop: 25,
      padding:10,
    },
    loginButtonSection: {

      justifyContent: 'center',
      alignItems: 'center'
   },
   redact_txt:{
    color:'white',
   fontFamily:'mt-medium',
   }
   
  });
export default Modal_me;