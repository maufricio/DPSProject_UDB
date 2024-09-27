import { View, Text,TextInput,Button,Alert } from 'react-native'
import React from 'react'
import { Formik } from "formik";
import * as Yup from 'yup';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from 'axios';
import uri from "./Data";
import { useNavigation } from '@react-navigation/native';
const validacion = Yup.object().shape({
    email: Yup.string().email('debe ser un correo').required("Debe digitar su correo"),
    code: Yup.string().typeError("la contraseña debe ser una cadena de texto").required("Digite su codigo"),
      
  });



export default function VerificacionCorreo() {
  const url_post = uri + '/verifyuser';
  const navigation = useNavigation();
  const verificacion = async(values)=>{
    try {
      const response = await axios.post(url_post, {
        email: values.email,
        code: values.code
      });
      //Alert.alert('¡Éxito!', response.data.message);
      
      navigation.navigate('Home1');
    } catch (error) {
      //console.error('Error en la respuesta:', error.response?.data);
      if (axios.isAxiosError(error)) {
        if (error.response) {
      const errorMessage = error?.response?.data?.message || 'Problemas al realizar la verificación intenta mas tarde';
      Alert.alert('¡ERROR!', errorMessage);
    } else if (error.request) {
            
      Alert.alert('¡ERROR!', 'Revisa tu conexión a Internet.');
  } else {
      
      Alert.alert('¡ERROR!', 'Ocurrió un error en la solicitud.');
  }
} else {
  
  Alert.alert('¡ERROR!', 'Ocurrió un error inesperado.');
  };
}
}

  return (
    <View>
      <Text>VerificacionCorreo</Text>
      <Formik 
    initialValues={{ email: '', code: '' }}
    validationSchema={validacion}
    onSubmit={verificacion}>
         {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View >
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
                placeholder="Codigo"
                value={values.code}
                onChangeText={handleChange('code')}
                onBlur={handleBlur('code')}
                secureTextEntry/>
                 {errors.code && touched.code && (
            <Text>{errors.code}</Text>
          )}

          <Button title="Verificar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>

    </View>
  )
}