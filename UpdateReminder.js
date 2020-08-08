import React, { useState } from 'react'
import { Button, Text, StyleSheet, View, TouchableWithoutFeedback, TextInput, ScrollView, AsyncStorage, Keyboard, Platform } from 'react-native'
import { CheckBox, Picker, Icon } from 'native-base';
import DTP from '../Components/Repeater'



const UpdateReminder = (props) => {


    var reminderId = props.navigation.getParam('ReminderId')



    const [title, setTitle] = useState(props.navigation.getParam('Title'))
    const [date, setDate] = useState(props.navigation.getParam('DateTime'))


    const [titleError, setTitleError] = useState('')
    const [dateError, setDateError] = useState('')






    const titleHandler = (val) => {
        setTitle(val)
    }
    const dateTimeHandler = (dateTime) => {
        setDate(dateTime)
    }



    const validate = () => {
        if (title === '')
            setTitleError('Please enter a title')
        else setTitleError('')

        if (date === '')
            setDateError('Please select date & time')
        else setDateError('')



        if (title != '' && date != '')
            onSubmitHandler()

    }

    const onSubmitHandler = async () => {
        var count = reminderId
        AsyncStorage.multiSet([
            ['reminder' + count, count],
            ['reminderTitle' + count, title],
            ['reminderDate' + count, date],

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
export default UpdateReminder