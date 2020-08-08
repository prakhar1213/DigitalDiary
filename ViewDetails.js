import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import AddButton from '../Components/AddButton'
import { CheckBox, Picker, Icon } from 'native-base'



const ViewDetails = (props) => {

    var eventId = props.navigation.getParam('EventId')
    var progress
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [datetime, setDateTime] = useState('')
    const [repeatValue, setRepeateValue] = useState()

    const getDetails = async () => {
        setTitle(await AsyncStorage.getItem('title' + eventId))
        var dateTime = await AsyncStorage.getItem('date' + eventId)
        setDateTime(dateTime)
        setDescription(await AsyncStorage.getItem('description' + eventId))
        setLocation(await AsyncStorage.getItem('location' + eventId))

        setRepeateValue(await AsyncStorage.getItem('repeatvalue' + eventId))


        if (dateTime != null) {
            setDate(dateTime.substring(0, 16))
            setTime(dateTime.substring(16, 25))
        }
    }

    const pickerHandler = (value) => {
        setRepeateValue(value)
        AsyncStorage.setItem('repeatvalue' + eventId, value)
    }

    useEffect(() => {
        getDetails()
    }, [])


    let repeater
    if (true) {
        repeater =
            <View style={styles.container}>
                <Picker
                    mode="dropdown"
                    iosHeader=""
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    selectedValue={repeatValue}
                    onValueChange={pickerHandler.bind(this)}
                >
                    <Picker.Item label="On Going" value='key0' />
                    <Picker.Item label="Success" value="key1" />
                    <Picker.Item label="Cancel" value="key2" />

                </Picker>
            </View>
    }
    else { repeater = <View></View> }

    return (
        <View style={styles.container}>

            <View style={{ margin: '3%', padding: '5%', flex: 1 }}>
                <ScrollView>
                    <View style={{ marginTop: '2%', alignItems: 'center', marginBottom: '10%' }}>
                        <Text style={{ fontSize: 30, }}>{title}</Text>
                    </View>
                    <View style={styles.holder}>
                        <Text style={styles.heading}>Date :</Text>
                        <Text style={styles.data}>{date}</Text>
                    </View>
                    <View style={styles.holder}>
                        <Text style={styles.heading}>Time :</Text>
                        <Text style={styles.data}>{time}</Text>
                    </View>
                    <View style={styles.holder}>
                        <Text style={styles.heading}>Description :</Text>
                        <Text style={styles.data}>{description}</Text>
                    </View>
                    <View style={styles.holder}>
                        <Text style={styles.heading}>Location :</Text>
                        <Text style={styles.data}>{location}</Text>
                    </View>

                    {repeater}
                </ScrollView>
            </View>

            <View style={{ position: 'absolute', bottom: 0, right: 0, marginRight: '6%', marginBottom: '11%' }}>
                <AddButton name='color-wand'
                    onPress={
                        () => {

                            props.navigation.navigate(
                                {
                                    routeName: 'UpdateDetails', params: {
                                        EventId: eventId,
                                        Title: title,
                                        Description: description,
                                        Location: location,
                                        RepeatValue: repeatValue,
                                        DateTime: datetime

                                    }
                                }
                            )
                        }
                    }>

                </AddButton>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    holder: {
        marginVertical: '5%'
    },
    heading: {
        fontSize: 25,
        marginBottom: '2%',


    },
    data: {
        fontSize: 15,
        color: '#B10000'
    },

})

export default ViewDetails;