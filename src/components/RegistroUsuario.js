import { View, Text,TextInput,Button,Alert,Modal,TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react';
import { Formik } from "formik";
import * as Yup from 'yup';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import uri from "./Data";
import { useNavigation } from "@react-navigation/native";
const validacion = Yup.object().shape({
    name: Yup.string().typeError("El nombre debe ser en texto").required("Digite su nombre"),
    email: Yup.string().email('debe ser un correo').required("Debe digitar su correo"),
    password: Yup.string().typeError("la contraseña debe ser una cadena de texto").required("Digite su contraseña"),
      
  });

export default function RegistroUsuario() {
  const navigation = useNavigation();
    //para el dispositivo fisico
    const url_post = uri + '/adduser';
    
  //const url= 'http://localhost:3001/api/adduser'
  //para el emulador
  //const url = 'http://10.0.2.2:3001/api/adduser';

      const agregarusuario = async(values)=>{
        try {
          const response = await axios.post(url_post, {
            name: values.name,
            email: values.email,
            password: values.password
          });
          //Alert.alert('¡Éxito!',response.data.message);
         


          navigation.navigate('VerificacionCorreo');
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response) {
          const errorMessage = error?.response?.data?.message || 'Problemas al realizar el registro intenta mas tarde';
      Alert.alert('¡ERROR!', errorMessage);  
        } else if (error.request) {
            
            Alert.alert('¡ERROR!', 'Revisa tu conexión a Internet.');
        } else {
            
            Alert.alert('¡ERROR!', 'Ocurrió un error en la solicitud.');
        }
    } else {
        
        Alert.alert('¡ERROR!', 'Ocurrió un error inesperado.');
    }
}
      };
  return (
    <Formik  StyleSheet={estilo.contenedor}
    initialValues={{ name: '', email: '', password: '' }}
    validationSchema={validacion}
    onSubmit={agregarusuario}>
         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View  style={estilo.caja}>
            <TextInput style={estilo.input}
            placeholder="Nombre"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
          />
          {errors.name && touched.name && (
            <Text style={estilo.error}>{errors.name}</Text>
          )}
           <TextInput style={estilo.input}
            placeholder="Correo Electrónico"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text style={estilo.error}>{errors.email}</Text>
          )}
            <TextInput style={estilo.input}
                placeholder="Contraseña"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry/>
                 {errors.password && touched.password && (
            <Text style={estilo.error}>{errors.password}</Text>
          )}

          <TouchableOpacity   onPress={handleSubmit} style={estilo.registrar}>
            <Text style={{color:'#fff', fontWeight: 'bold', fontSize: 18}}> Registrar
              {/*Icono de registro*/}
              <Icon name="account-plus" size={30} color="#fff"/>
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>

  )
}
const estilo=StyleSheet.create({
  contenedor:
  {
    backgroundColor : '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 20,
  },
  tittle:{
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input:{
    borderWidth:1,
    borderColor: '#dddd',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical:10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
  
  },
  caja:{marginTop:20,
    marginLeft: 15,
    marginRight:15,
    
  },

  registrar:{
    backgroundColor: '#4CAF50',
    borderRadius: 10, 
    paddingVertical: 5,
    //paddingHorizontal: 10,
    //marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //tamaño
    //width: '100%',
    //height: 50,
  },
  error:{
    color:'red',
    marginBottom: 10,
    fontSize: 14,
   marginLeft: 10,

  }

})