import React from 'react';
import { Button, View, StyleSheet, Text } from 'react-native';
import { useFormikContext } from 'formik';
// import touchableOpacity from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomButton = ({ title }) => {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 16,
        backgroundColor: '#596bff', // Color primario
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginLeft: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center', // Centra el texto dentro del botón
        width: '90%',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default CustomButton;