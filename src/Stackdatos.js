import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegistroUsuario from './components/RegistroUsuario';
import VerificacionCorreo from './components/VerificacionCorreo';
import Home from './components/Home';
import Headerformularios from './components/Headerformularios';
import InicioSesion from './components/InicioSesion';
const Stack = createStackNavigator();

export default function Stackdatos({initialRouteName, setToken}) {
  return (
  
  <Stack.Navigator initialRouteName={initialRouteName}>

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

    <Stack.Screen
    name="InicioSesion"
    options={{
    header: () => <Headerformularios />,
    headerLeft: () => null,
    }}>
      {props => <InicioSesion {...props} setToken={setToken} />}
    </Stack.Screen>
    
  </Stack.Navigator>
  
  )
}