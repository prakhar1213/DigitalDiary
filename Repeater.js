import React, { useState } from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const DTP = (props) => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState('')



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setShowDate(currentDate.toString())
        props.dateTime(currentDate.toString())

    };

    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');

    };

    const showTimepicker = () => {
        showMode('time');
    };
    const select = () => {
        setShowDate(date.toString())
        setShow(false)

    }
    let btn
    if (Platform.OS === 'android') {
        btn = <View></View>
    }
    else {
        btn = <View style={styles.btn}>
            <Button onPress={select} title="Select" color="#000000" />
        </View>
    }

    return (
        <View >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <View style={{ width: '40%' }}>
                    <Button onPress={showDatepicker} title="Pick a date" color='#B10000' />
                </View>
                <View style={{ width: '40%' }}>
                    <Button onPress={showTimepicker} title="Pick a time" color='#B10000' />
                </View>
            </View>

            {show && (
                <DateTimePicker
                    minimumDate={new Date()}
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

            {btn}
        </View>
    );
};

const styles = StyleSheet.create({
    btn: {

        marginTop: 10,
        marginLeft: '4%',
        width: '92%'

    }
})
export default DTP;