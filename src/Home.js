import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Schedule from './components/Schedule'
import Dashboard from './components/Dashboard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const Home = () => {
    return (
        //agregar mas drawers para las demas funcionalidades
        <Drawer.Navigator initialRouteName="Dashboard">
            <Drawer.Screen name="Dashboard" component={Dashboard} options={{
                drawerIcon: ({color, size}) => (
                    <Icon name="view-dashboard" size={size} color={color}/>
                )
            }}/>
            <Drawer.Screen name="Tus horarios" component={Schedule} options={{
                drawerIcon: ({color, size}) => (
                    <Icon name="book-outline" size={size} color={color}/>
                )
            }}/>
        </Drawer.Navigator>
    );
}

export default Home;