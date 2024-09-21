import React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { Card } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Dashboard = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.title}><Icon name="clock-outline" size={18} /> !Tus actividades mas proximas!</Text>
                <Card>
                    <Card.Title>Actividad 1</Card.Title>
                    <Card.Divider />
                    <Text>Texto de ejemplo</Text>
                    <Card.Divider />
                    <Text>Vence: fecha</Text>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 15
    }
})

export default Dashboard