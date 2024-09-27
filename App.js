import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import Home from './src/Home';
import Config from './src/Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Chatbot from './src/components/Chatbot';
import RegistroUsuario from './src/components/RegistroUsuario';
//import VerificacionCorreo from './src/components/VerificacionCorreo';
import Stackdatos from './src/Stackdatos';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Stackdatos} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="home" size={size} color={color}/>
          )
        }}/>
        <Tab.Screen name="Configuración" component={Config} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="cog" size={size} color={color}/>
          )
        }}/>
          <Tab.Screen name='Chatbot' component={Chatbot} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="chat" size={size} color={color}/>
          )
        }}/>
        <Tab.Screen name='Registro de Usuario' component={RegistroUsuario} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="account-plus" size={size} color={color}/>
          )
        }}/>
       {/* <Tab.Screen name='Verificación de Correo' component={VerificacionCorreo} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="email-check-outline" size={size} color={color}/>
          )
        }}/>*/}
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;