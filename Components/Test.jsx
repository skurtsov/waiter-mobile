import React from "react";
import { Text, View, FlatList,StyleSheet} from 'react-native';
import { Dimensions } from 'react-native';
//import {faCheck} from ';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, faTrash, faPen  } from '@fortawesome/free-solid-svg-icons'




let Test = (props) => {
    let arr = props.zakaz.split(",");
    
    let show_arr = arr.slice(1,arr.length);
   // console.log("array to show"+show_arr)
return(
<View style={st.card}>
<Text style={st.mesa}>Numero de mesa:{props.stolik}</Text>
<View style={st.card_c}>
<FlatList
        data={show_arr}
        renderItem={({item}) => <Text>{item}</Text>}
      />
     
              <FontAwesomeIcon  size={30} icon={ faCheck } />
              {/* <FontAwesomeIcon icon={ faTrash} /> */}
              <FontAwesomeIcon size={30} icon={ faPen} />
              </View>


</View>       
);
}
const st = StyleSheet.create({
    card: {
        borderStyle: "solid",
        borderColor: "#000",
        borderWidth: 1,
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

       
   
  });
export default Test;