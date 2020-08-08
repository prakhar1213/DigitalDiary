import React, { useState } from 'react'
import { Button, Text, StyleSheet, View, TouchableWithoutFeedback, TextInput, ScrollView, AsyncStorage, Keyboard, Platform } from 'react-native'
import { CheckBox, Picker, Icon } from 'native-base';
import DTP from '../Components/Repeater'



const UpdateDetails = (props) => {


    var eventId = props.navigation.getParam('EventId')


    const [title, setTitle] = useState(props.navigation.getParam('Title'))
    const [date, setDate] = useState(props.navigation.getParam('DateTime'))
    const [description, setdescription] = useState(props.navigation.getParam('Description'))
    const [location, setLocation] = useState(props.navigation.getParam('Location'))

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
        var count = eventId
        AsyncStorage.multiSet([
            ['event' + count, count],
            ['title' + count, title],
            ['date' + count, date],
            ['description' + count, description],
            ['location' + count, location],

        ])
        alert('Update Successful')
        props.navigation.popToTop()


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

                        <View style={styles.btn}>
                            <Button title='Update' color='#B10000' onPress={validate} />
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

    errorMessage: {
        color: 'red',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: '1%',
        marginLeft: '2%'
    },


})
export default UpdateDetails