import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/Home';
import Config from './src/Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="home" size={size} color={color}/>
          )
        }}/>
        <Tab.Screen name="Configuración" component={Config} options={{
          tabBarIcon: ({size,color}) => (
            <Icon name="cog" size={size} color={color}/>
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;