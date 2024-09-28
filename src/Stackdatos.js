import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroUsuario from './components/RegistroUsuario';
import VerificacionCorreo from './components/VerificacionCorreo';
import Home from './components/Home';
import Headerformularios from './components/Headerformularios';
const Stack = createStackNavigator();

export default function Stackdatos() {
  return (
    <Stack.Navigator initialRouteName="Home1">
    <Stack.Screen
      name="Registro Usuario"
      component={RegistroUsuario} 
      options={{ header:()=><Headerformularios></Headerformularios>, headerLeft: () => null, }}
    />
    <Stack.Screen
    name="VerificacionCorreo"
    component={VerificacionCorreo} 
    options={{ header:()=><Headerformularios></Headerformularios>,
    headerLeft: () => null,   }}
    />
    
    <Stack.Screen
    name="Home1"
    component={Home} 
    options={{title:'Home',
      headerLeft: () => null,headerBackTitleVisible: false, }}

    />
  
   
    
  </Stack.Navigator>

  )
}