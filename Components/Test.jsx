import React, { useRef } from "react";
import { Text, View, FlatList,StyleSheet, Modal, TextInput, Button, TouchableOpacity} from 'react-native';
import { Dimensions } from 'react-native';
//import {faCheck} from ';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faTrash, faPen  } from '@fortawesome/free-solid-svg-icons'
import { useState,useEffect} from 'react';
import { Pressable } from "react-native"
import { Root, Popup } from 'react-native-popup-confirm-toast'
import Modal_me from "./Modal";



let Test = (props) => {
    let arr = props.zakaz.split(",");
    const [hidden, setHidden] = useState(true);
    const [modl, setModl] = useState(false);
    const inputRef = useRef(null);
    const updateRef = ref => {
      inputRef.current = ref.current;
    };
    let show_arr = arr.slice(1,arr.length);
    const [text,setText] = useState('');
   // console.log("array to show"+show_arr)
   let deleteById=(prod_id)=>{
    fetch("https://makemesites.com/restoran/app/delete_idmob.php?restoran="+props.restoran+"&id="+prod_id, {
      method: "GET", // POST, PUT, DELETE, etc.
      headers: {
        // значение этого заголовка обычно ставится автоматически,
        // в зависимости от тела запроса
        "Content-Type": "text/plain;charset=UTF-8"
      },
      cache: "no-cache", // no-store, reload, no-cache, force-cache или only-if-cached
    })
    props.setIgnore(true)
     }

return(
<View style={st.card}>
<Text style={st.mesa}>Numero de mesa:{props.stolik}</Text>
<View style={st.card_c}>
  
<FlatList
        data={show_arr}
        style={st.listl}
        renderItem={({item}) => <Text  style={st.listl_txt}>{item}</Text>}
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

        <Pressable
      
            onPress={() =>
                Popup.show({
                    type: 'confirm',
                    title: 'Quieres editar?',
                    bodyComponent: () => <Modal_me restoran={props.restoran} id={props.id} zakaz={show_arr.toString()}/>,
                    confirmText: 'Cancelar',
                    callback: () => {
                      alert(text)
                    //  console.log(inputRef.current.value)
                        Popup.hide();
                    },
                    cancelCallback: () => {
                        Popup.hide();
                    },
                    okButtonStyle: {
                      display: 'none',
                    },
                    
                })
            
            }
        >
            <FontAwesomeIcon style={st.edit} size={25} icon={faPen} />
        </Pressable>

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
        fontFamily:'mt-medium',
      },
      card_c:{
        flexDirection:"row",
      },
      check:{
        color:"green",
        marginTop:30,
        marginRight:20,

      },
      trash:{
        color:'red',
        marginTop:30,
        marginRight:20,
      },
      edit:{
        color:'blue',
        marginTop:30,
        marginRight:20,

      },
      tarea: {
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
        alignItems:'center',
    },
    listl:{
      padding:20,
      fontFamily:'mt-bold',

    },
    listl_txt:{
      fontFamily:'mt-medium',
    }

       
   
  });
export default Test;