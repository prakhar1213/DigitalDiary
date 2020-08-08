import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, AsyncStorage, Text, FlatList, RefreshControl, Platform, Alert } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import AddButton from '../Components/AddButton'
import { TouchableOpacity } from 'react-native-gesture-handler';

function wait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Notes = (props) => {
    const [refreshing, setRefreshing] = useState(false);

    const [list, setList] = useState([])
    var notesid
    var title
    var description


    const cleardataHandler = () => {
        setList('')
    }


    const showdataHandler = async () => {
        var counter = await AsyncStorage.getItem('counternotes')
        var intCounter = parseInt(counter)
        counter = intCounter.toString()


        try {

            for (var i = 0; i <= intCounter; i++) {
                var j = i.toString()
                notesid = await AsyncStorage.getItem('notes' + j)
                title = await AsyncStorage.getItem('notestitle' + j)
                description = await AsyncStorage.getItem('notesdescription' + j)


                if (notesid != null) {
                    addItemsHandler()
                }


            }

        }
        catch (error) {
            alert(error)
        }
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        cleardataHandler()
        showdataHandler()
        wait(800).then(() => setRefreshing(false));
    }, [refreshing]);


    const addItemsHandler = () => {


        setList((mydata) => [...mydata,
        {
            id: notesid, text: [
                title,
                description,

            ]
        }

        ])


    }

    const deleteEventHandler = async (id) => {

        try {
            await AsyncStorage.removeItem('notes' + id);
            await AsyncStorage.removeItem('notestitle' + id);
            await AsyncStorage.removeItem('notesdescription' + id);


            onRefresh()
            alert('Notes Deleted')
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
                                    routeName: 'NotesViewDetails', params: {
                                        NotesId: item.item.id,
                                        Title: item.item.text[0],
                                        NotesDescription: item.item.text[1],

                                    }
                                })
                            }}>
                            <View style={styles.card}>
                                <View style={{ position: 'absolute', left: 15 }}>
                                    <Foundation name="clipboard-notes" size={40} color='white' />
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
                                routeName: 'AddNotes'
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

export default Notes;