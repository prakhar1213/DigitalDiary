import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, AsyncStorage, Text, FlatList, RefreshControl, Platform, Alert } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import AddButton from '../Components/AddButton'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { setNotificationHandler } from 'expo-notifications';




function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Reminder = (props) => {


    const [refreshing, setRefreshing] = useState(false);

    const [list, setList] = useState([])
    var reminderid
    var title
    var datetime
    var date
    var time
    var i


    const cleardataHandler = () => {
        setList('')
    }


    const showdataHandler = async () => {
        var counter = await AsyncStorage.getItem('reminderId')
        var intCounter = parseInt(counter)
        counter = intCounter.toString()


        try {
            Notifications.cancelAllScheduledNotificationsAsync()
            for (i = 0; i <= intCounter; i++) {
                var j = i.toString()
                reminderid = await AsyncStorage.getItem('reminder' + j)
                if (reminderid === null) {
                    continue
                }
                title = await AsyncStorage.getItem('reminderTitle' + j)
                datetime = await AsyncStorage.getItem('reminderDate' + j)

                notiHandler()
                if (datetime < Date()) {
                    deleteEventHandler(reminderid)
                }

                if (reminderid != null) {
                    addItemsHandler()
                }


            }

        }
        catch (error) {
            alert(error)
        }
    }
    const notiHandler = () => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: true,
                shouldSetBadge: true
            }),
        });

        const trigger = new Date(datetime);
        Notifications.scheduleNotificationAsync({
            content: {
                title: "Reminder !!",
                body: '' + title
            },
            trigger,
        });

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        cleardataHandler()
        showdataHandler()
        wait(800).then(() => setRefreshing(false));
    }, [refreshing]);


    const addItemsHandler = () => {
        if (datetime != null) {
            date = datetime.substring(0, 16)
            time = datetime.substring(16, 25)
        }


        setList((mydata) => [...mydata,
        {
            id: reminderid, text: [
                title,
                date,
                time,


            ]
        }

        ])


    }

    const deleteEventHandler = async (id) => {

        try {
            await AsyncStorage.removeItem('reminder' + id);
            await AsyncStorage.removeItem('reminderTitle' + id);
            await AsyncStorage.removeItem('reminderDate' + id);


            onRefresh()
        }
        catch (exception) {
            alert(exception);
        }

    }
    useEffect(() => {
        onRefresh()
    }, [])



    return (
        <View style={styles.container}>

            <View style={{ flex: 1, minHeight: '100%' }} >
                <FlatList
                    style={{ flex: 1, minHeight: '100%' }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    keyExtractor={item => item.id}
                    data={list}
                    renderItem={item => (
                        <TouchableOpacity activeOpacity={Platform.OS === 'android' ? 1 : 0.5}
                            onLongPress={
                                () => {
                                    Alert.alert(

                                        'Delete Event',
                                        item.item.text[0],
                                        [
                                            {
                                                text: 'Cancel',
                                                style: 'cancel',
                                            },
                                            {
                                                text: 'Delete', onPress: () => deleteEventHandler(item.item.id)
                                            },

                                        ],
                                        { cancelable: false }
                                    )
                                }

                            }
                            onPress={() => {
                                props.navigation.navigate({
                                    routeName: 'ViewReminder', params: {
                                        ReminderId: item.item.id,
                                        Title: item.item.text[0],
                                        Date: item.item.text[1],
                                        Time: item.item.text[2],

                                    }
                                })
                            }}>
                            <View style={styles.card}>
                                <View style={{ position: 'absolute', left: 15 }}>
                                    <Ionicons name="md-alarm" size={40} color='white' />
                                </View>
                                <Text style={styles.heading}>{item.item.text[0]}</Text>
                            </View>
                        </TouchableOpacity>
                    )} />
            </View>
            <View style={{ position: 'absolute', bottom: 0, right: 0, marginRight: '6%', marginBottom: '11%' }}>
                <AddButton name='md-add' onPress={
                    () => {

                        props.navigation.navigate(
                            {
                                routeName: 'AddReminder'
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
        backgroundColor: '#ffffff',

    },


    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 15, height: 10 },
        shadowOpacity: 0.4,
        elevation: 10,
        shadowRadius: 6,
        marginVertical: Platform.OS === 'android' ? '2%' : '4%',
        padding: '5%',
        marginHorizontal: '10%',
        width: '80%',
        borderRadius: 20,
        backgroundColor: '#000000'


    },
    heading: {
        fontSize: 23,
        textAlign: 'center',
        marginTop: '2%',
        marginBottom: '3%',
        fontWeight: 'bold',
        color: '#ffffff',
    },
    date: {
        marginVertical: '3%',
        fontSize: 18,
        color: '#ffffff'
    }
})

export default Reminder;