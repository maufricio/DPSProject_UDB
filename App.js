import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Home from './src/Home';
import Config from './src/Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chatbot from './src/components/Chatbot';
import RegistroUsuario from './src/components/RegistroUsuario';
import InicioSesion from './src/components/InicioSesion';
//import VerificacionCorreo from './src/components/VerificacionCorreo';
import Stackdatos from './src/Stackdatos';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Stackdatos} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="home" size={size} color={color}/>
          ),
          headerShown: false
        }}/>
        <Tab.Screen name="Configuración" component={Config} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="cog" size={size} color={color}/>
          ),
          headerShown: false
        }}/>
          <Tab.Screen name='Chatbot' component={Chatbot} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="chat" size={size} color={color}/>
          ),
          headerShown: false
        }}/>
       {/* <Tab.Screen name='Registro de Usuario' component={RegistroUsuario} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="account-plus" size={size} color={color}/>
          ),
          headerShown: false
        }}/>*/}
           <Tab.Screen name='Inicio de Sesión' component={InicioSesion} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="account" size={size} color={color}/>
          ),
          headerShown: false
        }}/>
       {/* <Tab.Screen name='Verificación de Correo' component={VerificacionCorreo} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="email-check-outline" size={size} color={color}/>
          )
        }}/>*/}
        
      </Tab.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;