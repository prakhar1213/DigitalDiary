import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import AddButton from '../Components/AddButton'




const ViewReminder = (props) => {

    var reminderId = props.navigation.getParam('ReminderId')
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [datetime, setDateTime] = useState('')



    const getDetails = async () => {
        setTitle(await AsyncStorage.getItem('reminderTitle' + reminderId))
        var dateTime = await AsyncStorage.getItem('reminderDate' + reminderId)
        setDateTime(dateTime)


        if (dateTime != null) {
            setDate(dateTime.substring(0, 16))
            setTime(dateTime.substring(16, 25))
        }
    }

    useEffect(() => {
        getDetails()
    }, [])


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

                </ScrollView>
            </View>

            <View style={{ position: 'absolute', bottom: 0, right: 0, marginRight: '6%', marginBottom: '11%' }}>
                <AddButton name='color-wand'
                    onPress={
                        () => {

                            props.navigation.navigate(
                                {
                                    routeName: 'UpdateReminder', params: {
                                        ReminderId: reminderId,
                                        Title: title,
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
    }

})

export default ViewReminder;