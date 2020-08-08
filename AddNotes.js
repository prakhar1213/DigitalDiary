import React, { useRef } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    Platform,
    Button,
    Alert,
    AsyncStorage
} from 'react-native';
import { useState, state } from 'react';
import ImgPicker from '../Components/ImgPicker'








const AddNotes = (props) => {





    const [title, setTitle] = useState('')
    const [description, setdescription] = useState('')
    const [image, setImage] = useState('')

    const [titleError, setTitleError] = useState('')
    const [descriptionError, setdescriptionError] = useState('')




    const titleHandler = (val) => {
        setTitle(val)
    }


    const descriptionHandler = (val) => {
        setdescription(val)
    }

    const imageHandler = (img) => {
        setImage(img)
    }


    const validate = () => {
        if (title === '')
            setTitleError('Please enter a title')
        else setTitleError('')



        if (description === '')
            setdescriptionError('Please add a note')
        else setdescriptionError('')



        if (title != '' && description != '')
            onSubmitHandler()

    }



    const onSubmitHandler = async () => {
        var counterNotes = await AsyncStorage.getItem('counternotes')
        if (counterNotes === null) {
            AsyncStorage.setItem('counternotes', '0')
            var counterNotes = await AsyncStorage.getItem('counternotes')
        }
        else {
            var intCount = parseInt(counterNotes)
            intCount = intCount + 1
            counterNotes = intCount.toString()
            AsyncStorage.setItem('counternotes', counterNotes)
        }
        AsyncStorage.multiSet([
            ['notes' + counterNotes, counterNotes],
            ['notestitle' + counterNotes, title],
            ['notesdescription' + counterNotes, description],
            ['image' + counterNotes, image]

        ])

        alert('Note Added !!')


        props.navigation.goBack()


    }

    const showHandler = () => {
        AsyncStorage.clear();
    }





    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.screen}>
                    <View>
                        <View style={styles.container}>
                            <Text style={styles.heading}>Title</Text>
                            <TextInput style={styles.txtInput} value={title} onChangeText={titleHandler} />
                            <Text style={styles.errorMessage}>{titleError}</Text>
                        </View>


                        <View style={styles.container}>
                            <Text style={styles.heading}>Note</Text>
                            <TextInput style={styles.txtInput} value={description} onChangeText={descriptionHandler} multiline={true} />
                            <Text style={styles.errorMessage}>{descriptionError}</Text>
                        </View>
                        <ImgPicker onImageTaken={imageHandler} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: '5%' }}>
                            <View style={styles.btn}>
                                <Button title='Add Note' color='#B10000' onPress={validate} />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 50,
        paddingTop: 30,
        paddingLeft: 20,
        backgroundColor: 'white',
        minHeight: '100%'
    },
    txtInput: {
        borderBottomWidth: 1,
        borderRadius: 7,
        paddingTop: 10,
        paddingBottom: 5,
        fontSize: 25,
        paddingHorizontal: 25,
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

    btn: {
        width: "40%",
    },

    errorMessage: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '1%',
        marginLeft: '2%'
    }


})

export default AddNotes;