import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, AsyncStorage, Text, FlatList, RefreshControl, Platform, Alert } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import AddButton from '../Components/AddButton'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';



function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Event = (props) => {
    const xyz = async () => {
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS, Permissions.CAMERA_ROLL, Permissions.CAMERA);

        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }

        Notifications.addListener(this._handleNotification);
    }

    const [refreshing, setRefreshing] = useState(false);

    const [list, setList] = useState([])
    var eventid
    var title
    var date
    var time
    var datetime
    var description
    var location
    var repeatValue


    const cleardataHandler = () => {
        setList('')
    }

    let progress
    const showdataHandler = async () => {
        var counter = await AsyncStorage.getItem('counter')
        var intCounter = parseInt(counter)
        counter = intCounter.toString()


        try {
            Notifications.cancelAllScheduledNotificationsAsync()
            for (let i = 0; i <= intCounter; i++) {
                var j = i.toString()
                eventid = await AsyncStorage.getItem('event' + j)
                if (eventid === null) {
                    continue
                }
                title = await AsyncStorage.getItem('title' + j)
                datetime = await AsyncStorage.getItem('date' + j)
                description = await AsyncStorage.getItem('description' + j)
                location = await AsyncStorage.getItem('location' + j)
                repeatValue = await AsyncStorage.getItem('repeatvalue' + j)
                if (repeatValue === 'key0') {
                    progress = <View style={{ position: 'absolute', right: 15 }}>
                        <Entypo name="dots-three-horizontal" size={40} color="yellow" />
                    </View>
                }
                if (repeatValue === 'key1') {
                    progress = <View style={{ position: 'absolute', right: 15 }}>
                        <MaterialIcons name="done" size={40} color="#31FF0C" />
                    </View>
                }
                if (repeatValue === 'key2') {
                    progress = <View style={{ position: 'absolute', right: 15 }}>
                        <MaterialIcons name="cancel" size={50} color="#FF0000" />
                    </View>
                }

                notiHandler()


                if (eventid != null) {
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
                title: "Event !!",
                body: '' + title
            },
            trigger,
        });

    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        cleardataHandler()
        showdataHandler()
        progressHandler()
        wait(800).then(() => setRefreshing(false));
    }, [refreshing]);


    const addItemsHandler = () => {
        if (datetime != null) {
            date = datetime.substring(0, 16)
            time = datetime.substring(16, 25)
        }

        setList((mydata) => [...mydata,
        {

            id: eventid, text: [
                title,
                date,
                time,
                description,
                location,
                repeatValue,
                datetime,
                progress

            ]
        }

        ])


    }

    const deleteEventHandler = async (id) => {

        try {
            await AsyncStorage.removeItem('event' + id);
            await AsyncStorage.removeItem('title' + id);
            await AsyncStorage.removeItem('date' + id);
            await AsyncStorage.removeItem('description' + id);
            await AsyncStorage.removeItem('location' + id);
            await AsyncStorage.removeItem('repeatvalue' + id);
            onRefresh()
            alert('Event Deleted')
        }
        catch (exception) {
            alert(exception);
        }

    }

    useEffect(() => {
        onRefresh()
        xyz()
    }, [])


    const progressHandler = () => {


    }



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
                                    routeName: 'ViewDetails', params: {
                                        EventId: item.item.id,
                                    }
                                })
                            }}>
                            <View style={styles.card}>
                                <View style={{ position: 'absolute', left: 15 }}>
                                    <EvilIcons name="calendar" size={50} color='white' />
                                </View>
                                <Text style={styles.heading}>{item.item.text[0]}</Text>
                                {item.item.text[7]}

                            </View>
                        </TouchableOpacity>
                    )} />
            </View>

            <View style={{ position: 'absolute', bottom: 0, right: 0, marginRight: '6%', marginBottom: '11%' }}>
                <AddButton name='md-add' onPress={
                    () => {

                        props.navigation.navigate(
                            {
                                routeName: 'AddEvent'
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
        backgroundColor: '#000000',
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


export default Event;