import { View, Text,TextInput, SafeAreaView,Button,FlatList } from 'react-native';
import React, {useState} from 'react';


export default function Chatbot() {
    //arreglos para el mensaje de prueba  en ambos lados(usuario y chatbot)
    //arreglo para el chat  
    const [chat, setChat]= useState("")
    //arreglo para el usuario
    const [usuario, setUsuario]= useState("");
    const Enviar_mensaje_usuario=()=>{
        if(usuario.trim()){
            const usuario_mensaje={
                mensaje: usuario,
                quien: 'usuario'
            };
              //agregando nuevo mensaje al chat  de parte de usuario
            setChat(agregarmensaje=>[...agregarmensaje,usuario_mensaje]);

            setTimeout(()=>{
                //respuesta del chatbot
                const chatbot={
                   mensaje: 'Hola soy tu asistente virtual de tareas en que puedo ayudarte', quien: 'chatbot'
                };
                //agregando nueva mensaje al chat  de parte de chatbot
                setChat(agregarmensaje=>[...agregarmensaje, chatbot]);
                
            },1000)
            setUsuario("");


        }
    };

    //para determinar los estilos dependiendo quien es si es chatbot o usuario
    const estilo= ({item})=>{
        let diseño_mensaje;
        if(item.quien==='usuario'){
            //estilo usuario
            //por el momento no hay estilo 
    }
    else{
        //estilo del chatbot
       
    }return (
        //sin estilo 
        <View>
            <Text>{item.mensaje}</Text>
        </View>
    );};


  return (
     <SafeAreaView>
        <FlatList 
        data={chat}
        renderItem={estilo}
        keyExtractor={(item, index) => index.toString()}/>
        <View>
            <TextInput
            placeholder="Escribe un mensaje"
            onChangeText={setUsuario}
            value={usuario}
            />
            <Button title='Enviar' onPress={Enviar_mensaje_usuario}>
            </Button>
</View>
</SafeAreaView>

  )
}