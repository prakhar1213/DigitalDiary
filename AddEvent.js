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
import { CheckBox, Picker, Icon } from 'native-base';
import DTP from '../Components/Repeater'







const AddEvent = (props) => {




    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [description, setdescription] = useState('')
    const [location, setLocation] = useState('')

    const [titleError, setTitleError] = useState('')
    const [dateError, setDateError] = useState('')
    const [descriptionError, setdescriptionError] = useState('')
    const [locationError, setLocationError] = useState('')




    const titleHandler = (val) => {
        setTitle(val)
    }
    const dateTimeHandler = (dateTime) => {
        setDate(dateTime)
    }

    const descriptionHandler = (val) => {
        setdescription(val)
    }
    const locationHandler = (val) => {
        setLocation(val)
    }






    const validate = () => {
        if (title === '')
            setTitleError('Please enter a title')
        else setTitleError('')

        if (date === '')
            setDateError('Please select date & time')
        else setDateError('')

        if (description === '')
            setdescriptionError('Please enter a description')
        else setdescriptionError('')

        if (location === '')
            setLocationError('Please enter a location')
        else setLocationError('')

        if (title != '' && date != '' && description != '' && location != '')
            onSubmitHandler()

    }



    const onSubmitHandler = async () => {
        var count = await AsyncStorage.getItem('counter')
        if (count === null) {
            AsyncStorage.setItem('counter', '0')
            var count = await AsyncStorage.getItem('counter')
        }
        else {
            var intCount = parseInt(count)
            intCount = intCount + 1
            count = intCount.toString()
            AsyncStorage.setItem('counter', count)
        }
        AsyncStorage.multiSet([
            ['event' + count, count],
            ['title' + count, title],
            ['date' + count, date],
            ['description' + count, description],
            ['location' + count, location],
            ['repeatvalue' + count, 'key0']
        ])

        alert('Event Added !!')

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
                            <Text style={styles.heading}>Date & Time</Text>
                            <View style={{ marginTop: '8%' }}>
                                <DTP dateTime={dateTimeHandler} />
                            </View>
                            <Text style={styles.errorMessage}>{dateError}</Text>


                        </View>

                        <View style={styles.container}>
                            <Text style={styles.heading}>Description</Text>
                            <TextInput style={styles.txtInput} value={description} onChangeText={descriptionHandler} multiline={true} />
                            <Text style={styles.errorMessage}>{descriptionError}</Text>
                        </View>
                        <View style={styles.container}>
                            <Text style={styles.heading}>Location</Text>
                            <TextInput style={styles.txtInput} value={location} onChangeText={locationHandler} />
                            <Text style={styles.errorMessage}>{locationError}</Text>
                        </View>



                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>

                            <View style={styles.btn}>
                                <Button title='ADD  EVENT' color='#B10000' onPress={validate} />
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

export default AddEvent;