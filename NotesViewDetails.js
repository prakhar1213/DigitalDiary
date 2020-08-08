import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, ScrollView, StyleSheet, AsyncStorage, Keyboard, Image, Alert } from 'react-native'
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker'

const NotesViewDetails = (props) => {
    const [description, setDescription] = useState('')
    const [descriptionError, setdescriptionError] = useState('')
    const [img, setImg] = useState()

    var notesId = props.navigation.getParam('NotesId')
    var title = props.navigation.getParam('Title')

    const descriptionHandler = (val) => {
        setDescription(val)
    }

    const validate = () => {

        if (description === '')
            setdescriptionError('Please add a note')
        else {
            setdescriptionError('')
            onSubmitHandler()
        }
    }

    const onSubmitHandler = async () => {
        AsyncStorage.setItem('notesdescription' + notesId, description)
        Keyboard.dismiss()

    }

    const getDetails = async () => {
        setDescription(await AsyncStorage.getItem('notesdescription' + notesId))
        setImg(await AsyncStorage.getItem('image' + notesId))

    }

    useEffect(() => {
        getDetails()
    }, [])

    const deleteImageHandler = async (id) => {
        try {
            await AsyncStorage.removeItem('image' + id)

        }
        catch (e) {
            alert(e)
        }
        getDetails()
    }

    const pickImageHandler = async (id) => {

        const pickedImage = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        setImg(pickedImage.uri)

        try {
            await AsyncStorage.setItem('image' + id, img)

        }
        catch (e) {
            alert(e)
        }

    }

    const takeImageHandler = async (id) => {

        const pickedImage = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        })
        setImg(pickedImage.uri)

        try {
            await AsyncStorage.setItem('image' + id, img)

        }
        catch (e) {
            alert(e)
        }
    }

    return (

        <View style={styles.screen}>

            <TouchableWithoutFeedback onPress={validate} style={{}}>
                <View style={{ padding: '5%' }}>
                    <ScrollView style={{}}>

                        <View style={{ marginTop: '2%', alignItems: 'center', marginBottom: '10%' }}>
                            <Text style={{ fontSize: 30, }}>{title}</Text>
                        </View>
                        <View style={styles.container}>
                            <TextInput style={styles.txtInput} value={description} onChangeText={descriptionHandler} multiline={true} />
                            <Text style={styles.errorMessage}>{descriptionError}</Text>
                        </View>

                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity onPress={() => { Keyboard.dismiss() }}
                activeOpacity={1}
                onLongPress={
                    () => {
                        Alert.alert(

                            'Please Pick A Optioin ',
                            'What Do You Want To Do',
                            [

                                {
                                    text: 'Delete', onPress: () => deleteImageHandler(notesId)
                                },
                                {
                                    text: 'Pick A New Image', onPress: () => pickImageHandler(notesId)
                                },
                                {
                                    text: 'Take A New Image', onPress: () => takeImageHandler(notesId)
                                },
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },

                            ],
                            { cancelable: false }
                        )
                    }
                }>
                {
                    !img ? (
                        <View>
                        </View>
                    )
                        : (
                            <View style={{ width: '100%', height: 400, borderColor: '#000000', borderWidth: 1, marginVertical: '5%' }}>
                                <Image source={{ uri: img }} style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }} />
                            </View>

                        )}
            </TouchableOpacity>

        </View >
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        minHeight: '100%'

    },
    txtInput: {
        borderBottomWidth: 1,
        borderRadius: 7,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 20,
        paddingHorizontal: 0,
        color: '#B10000',
        marginTop: 10,
        borderBottomColor: '#D6D6D6'

    },


    heading: {
        fontSize: 25,

    },
    container: {
        marginBottom: 30,
    },
    errorMessage: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '1%',
        marginLeft: '2%'
    }
})

export default NotesViewDetails