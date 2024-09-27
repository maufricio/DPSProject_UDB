import { View, Text,TextInput,Button,Alert,Modal } from 'react-native'
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
          const errorMessage = error?.response?.data?.message || 'Problemas al realizar el registro intenta mas tarde';
      Alert.alert('¡ERROR!', errorMessage);
      console.error(error);
        } 
      };
  return (
    <Formik 
    initialValues={{ name: '', email: '', password: '' }}
    validationSchema={validacion}
    onSubmit={agregarusuario}>
         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View >
            <TextInput
            placeholder="Nombre"
            value={values.name}
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
          />
          {errors.name && touched.name && (
            <Text>{errors.name}</Text>
          )}
           <TextInput
            placeholder="Correo Electrónico"
            value={values.email}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            keyboardType="email-address"
          />
          {errors.email && touched.email && (
            <Text>{errors.email}</Text>
          )}
            <TextInput
                placeholder="Contraseña"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                secureTextEntry/>
                 {errors.password && touched.password && (
            <Text>{errors.password}</Text>
          )}

          <Button title="Registrar" onPress={handleSubmit } />
        </View>
      )}
    </Formik>

  )
}