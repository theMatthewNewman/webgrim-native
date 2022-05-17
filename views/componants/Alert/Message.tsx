import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {Audio} from 'expo-av';
import { useEffect } from 'react';
import {useDispatch} from "../../../redux/hooks"
import {pageAction}from "../../../redux/pages";


type messageType = {
    active:boolean
    type:"correct"|"wrong"
    message:string
}

function Message({active,message, type}:messageType) {
    const {height, width} = useWindowDimensions()
    const dispatch = useDispatch()

    useEffect(() => {
        setTimeout(() => {
            pageAction.updateMessage({
                active:false,
                type:'correct',
                message:"Error",
            }) (dispatch)
        },1000)
    },[active])

    return ( 
        <View>
            {active?
                <View style={type==="correct"? {...style.correct, height, width} : {...style.wrong, height, width}}>
                    <Text style={style.text}>{message}</Text>
                </View>
            : null}
        </View>
     );
}

const style = StyleSheet.create({
    correct:{
        backgroundColor:'#00b300',
        borderTopWidth:2,
        padding:10,
        position:"absolute",
        bottom:0,
        
    },
    wrong:{
        backgroundColor:'#ff8989',
        borderTopWidth:2,
        padding:10,
        position:"absolute",
        bottom:0,
    },
    text:{
        color:'black',
        fontSize:30,
    }
})
export default Message;