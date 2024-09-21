import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, ScrollView, Image, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "@rneui/base";
import { Button, Overlay, Input } from "@rneui/themed";
import { Formik, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import uri from "./Data";

const image = require('../img/pregunta.png');

const Schedule = () => {

    const [Visible, SetVisible] = useState(false);
    const [isTimePickerVisible, setTimePickerVisible] = useState(false);
    const [data, setdata] = useState([])
    const [selectedItem, setselectedItem] = useState(null)

    //token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJBbGJlcnRvIiwiZW1haWwiOiJvYTM5NzMzOTJAZ21haWwuY29tIiwiaWF0IjoxNzI2ODc0ODQ3LCJleHAiOjE3MjY4Nzg0NDd9.S4PHCsHHhLKG8weV1C2fOfSlZjW2LHuUX87SD-hQee8"

    //rutas que se estan utilizando
    const url = uri + '/listschedule'
    const url_post = uri + '/addschedule'
    const url_delete = uri + '/deleteschedule'
    const url_update = uri + '/updateschedule'

    //fetch para consumir toda la data
    const fetch_data = async (token) => {
        const requestOptions = configRequestOptionsAll(token);
        try {
            const res = await fetch(url, requestOptions);
            const resjson = await res.json();
            console.log("response", resjson);
            if (Array.isArray(resjson)) {
                setdata(resjson); //guardamos la data
            }
        } catch (error) {
            console.log("Error fetching: ", error);
        }
    }

    //fetch para agregar datos
    const fetch_add_data = async (token, data) => {
        const requestOptions = configRequestOptionsAdd(token, data);
        try {
            const res = await fetch(url_post, requestOptions);
            console.log("request: ", res);
            if (!res.ok) {
                throw new Error('HTTP Error status: ', res.status);
            }
            //una vez guardados volvemos a hacer la peticion de datos
            await fetch_data(token);
        } catch (error) {
            console.log("Error fetching: ", error);
        }
    }

    //fetch para actualizar datos
    const fetch_update_data = async (token, id, updated_data) => {
        const requestOptions = configRequestOptionsUpdate(token, updated_data);
        try {
            const res = await fetch(`${url_update}/${id}`, requestOptions)
            console.log("request: ", res);
            if (!res.ok) {
                throw new Error('HTTP Error status: ', res.status);
            }
            setdata(prev_data => prev_data.map(item => (item._id === id ? { ...item, ...updated_data } : item)))
            setselectedItem(null);
        } catch (error) {
            console.log("Error updating data: ", error);
        }
    }

    //fetch para eliminar los datos
    const fetch_delete_data = async (token, id) => {
        const requestOptions = configRequestOptionsdelete(token);
        try {
            const res = await fetch(`${url_delete}/${id}`, requestOptions)
            if (!res.ok) {
                throw new Error('HTTP Error status: ', res.status);
            }
            setdata(prev_data => prev_data.filter(item => item._id !== id));
        } catch (error) {
            console.log("Error deleting data: ", error);
        }
    }

    //configuraciones para la peticion http GET
    const configRequestOptionsAll = (token) => ({
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    //configuracion para la preticion POST
    const configRequestOptionsAdd = (token, data) => ({
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    //configuracion para hacer peticion put
    const configRequestOptionsUpdate = (token, data) => ({
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })

    //configuracion para hacer la solicitud delete
    const configRequestOptionsdelete = (token) => ({
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    useEffect(() => {
        fetch_data(token);
        //intervalo de tiempo para volver hacer la peticion de datos (600000ms = 10min)
        const interval = setInterval(() => {
            fetch_data(token);
            console.log("se volvio hacer la peticion");
        }, 600000)

        return () => clearInterval(interval); //limpia el componente
    }, [token])

    const toggleOverlay = () => {
        SetVisible(!Visible);
    }

    //mostrar u ocultar el time picker
    const showTimePicker = () => {
        setTimePickerVisible(true);
    }

    const hideTimePicker = () => {
        setTimePickerVisible(false);
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es obligatorio"),
        description: Yup.string().required("Este campo es obligatorio"),
        day: Yup.string().oneOf([
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
            'Domingo'
        ]).required("Debe seleccionar el día"),
        hour: Yup.string().required("Debe seleccionar la hora").matches(
            /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            "Debe ser una hora válida en formato HH:mm"
        ),
    })

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.container_button}>
                    <Button radius={"sm"} type="solid" buttonStyle={styles.button_new} onPress={() => {
                        setselectedItem(null); //en caso contrario, solo guardar
                        toggleOverlay()
                    }
                    } ><Icon name="plus" size={20} color={"white"} /> Agregar horario</Button>
                </View>
                <Overlay isVisible={Visible} onBackdropPress={toggleOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title_model}><Icon name={selectedItem ? "pencil-box-outline" : "book-edit-outline"} size={25} color={"black"} />{selectedItem ? "Editando horario" : "¡Nuevo horario!"}</Text>
                        <Formik
                            initialValues={{
                                name: selectedItem ? selectedItem.name : '',
                                description: selectedItem ? selectedItem.description : '',
                                day: selectedItem ? selectedItem.day : '',
                                hour: selectedItem ? selectedItem.hour : ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                if (selectedItem) {
                                    fetch_update_data(token, selectedItem._id, values); // Actualiza si hay un elemento seleccionado
                                } else {
                                    fetch_add_data(token, values); // Agrega si no hay elemento seleccionado
                                }
                                resetForm();
                                toggleOverlay(); // Cierra el modal después de la acción
                            }}
                        >
                            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                                <>
                                    <Input
                                        placeholder="Ingrese el titulo..."
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        errorMessage={touched.name && errors.name ? errors.name : ''}
                                    />
                                    <Input
                                        placeholder="Ingrese la descripción..."
                                        onChangeText={handleChange('description')}
                                        onBlur={handleBlur('description')}
                                        value={values.description}
                                        errorMessage={touched.description && errors.description ? errors.description : ''}
                                    />
                                    <Text><Icon name="calendar-today" size={18} color={"black"} />Seleccione el dia</Text>
                                    <Picker
                                        selectedValue={values.day}
                                        onValueChange={(itemValue) => setFieldValue('day', itemValue)}
                                        style={styles.picker}
                                    >
                                        <Picker.Item label="Selecciona el día" value="" />
                                        <Picker.Item label="Lunes" value="Lunes" />
                                        <Picker.Item label="Martes" value="Martes" />
                                        <Picker.Item label="Miercoles" value="Miercoles" />
                                        <Picker.Item label="Jueves" value="Jueves" />
                                        <Picker.Item label="Viernes" value="Viernes" />
                                        <Picker.Item label="Sabado" value="Sabado" />
                                        <Picker.Item label="Domingo" value="Domingo" />
                                    </Picker>
                                    <ErrorMessage name="day" component={Text} style={styles.error_selecs} />
                                    <Button onPress={showTimePicker} buttonStyle={styles.Button_hour}><Icon name="clock-time-four-outline" size={20} color={"black"} /> <Text>Seleccione la hora</Text></Button>
                                    <DateTimePicker
                                        isVisible={isTimePickerVisible}
                                        mode="time"
                                        onConfirm={(hour) => {
                                            const opciones = {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: false
                                            }

                                            const formattedhour = hour.toLocaleString('es-Es', opciones)
                                            setFieldValue('hour', formattedhour)
                                            hideTimePicker()
                                        }}
                                        onCancel={hideTimePicker}
                                        locale="es_ES"
                                        headerTextIOS="Elige una hora"
                                        cancelTextIOS="Cancelar"
                                        confirmTextIOS="Aceptar"
                                    />
                                    <Text style={{ marginBottom: 15 }}><Text style={{ fontWeight: 'bold' }}>Hora seleccionada: </Text>{values.hour}</Text>
                                    <ErrorMessage name="hour" component={Text} style={styles.error_selecs} />
                                    <Button title="Submit" onPress={handleSubmit} buttonStyle={styles.button_save}><Icon name="content-save-outline" size={20} color={"white"} /> <Text style={{ color: "white" }}>{selectedItem ? "Actualizar" : "Guardar"}</Text></Button>
                                </>
                            )}
                        </Formik>
                    </View>
                </Overlay>
                {/*Existe data? */}
                {data && data.length > 0 ? (
                    <>
                        {
                            data.map((item, index) => (
                                <Card key={index}>
                                    <Card.Title><Text style={{ fontWeight: 'bold', fontSize: 20 }}><Icon name="book-outline" size={25} color={"black"} />{item.name}</Text></Card.Title>
                                    <Card.Divider />
                                    <Text style={{ textAlign: 'center' }}>{item.description}</Text>
                                    <Card.Divider />
                                    <Text><Text style={{ fontWeight: 'bold' }}><Icon name="calendar-today" size={15} color={"black"} /> Dia:</Text> {item.day}</Text>
                                    <Card.Divider />
                                    <Text><Text style={{ fontWeight: 'bold' }}><Icon name="alarm" size={15} color={"black"} /> Hora de inicio:</Text> {item.hour}</Text>
                                    <Card.Divider />
                                    <View style={styles.container_button}>
                                        <View style={[styles.button_update, styles.button]}>
                                            <Button radius={"sm"} type="solid" buttonStyle={styles.button_update} onPress={() => {
                                                setselectedItem(item); //activar el model si vamos a actualizar aglo
                                                toggleOverlay();
                                            }}><Icon name="pencil-box" size={20} color={"white"} /> Editar</Button>
                                        </View>
                                        <View style={[styles.button_delete, styles.button]}>
                                            <Button radius={"sm"} type="solid" buttonStyle={styles.button_delete} onPress={() => {
                                                Alert.alert(
                                                    "Confirmar eliminación",
                                                    "¿Estas seguro que deseas eliminar este horario?",
                                                    [
                                                        { text: "Cancelar", style: "cancel" },
                                                        { text: "Eliminar", style: "destructive", onPress: () => fetch_delete_data(token, item._id) }
                                                    ]
                                                );
                                            }}><Icon name="delete" size={20} color={"white"} /> Eliminar</Button>
                                        </View>
                                    </View>
                                </Card>
                            ))
                        }
                    </>
                ) : (
                    <View style={styles.container_message}>
                        <Image source={image} style={styles.image} />
                        <Text style={styles.message}>¡Vaya!, parece que no tienes horarios..., puedes agregar uno dando click al boton "Agregar horario". <Icon name="emoticon-happy-outline" size={20} color={"black"} /></Text>
                    </View>
                )
                }
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
        fontSize: 20
    },
    container_button: {
        flexDirection: 'row', // Poner los elementos en fila
        justifyContent: 'space-between', // Espacio entre los botones
        padding: 15
    },
    button: {
        flex: 1, // Ocupan el mismo espacio
        marginHorizontal: 5, // Espaciado entre los botones
    },
    button_new: {
        backgroundColor: "green",

    },
    button_delete: {
        backgroundColor: "#FF3636"
    },
    button_update: {
        backgroundColor: "#3EAEEE"
    },
    modalContent: {
        padding: 20,
        width: 300,
    },
    picker: {
        height: 50,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1
    },
    error: {
        color: 'red',
        marginBottom: 10
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8
    },
    title_model: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    },
    error_selecs: {
        color: 'red',
        marginBottom: 20,
        marginTop: 0
    },
    Button_hour: {
        backgroundColor: "#23E8B5"
    },
    button_save: {
        backgroundColor: "green"
    },
    container_message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f2f2f2',
        padding: 20
    },
    message: {
        fontSize: 24,
        color: '#333',
        textAlign: 'center',
        marginVertical: 10
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20
    }
})

export default Schedule