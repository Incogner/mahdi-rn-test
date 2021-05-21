import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default RegistrationScreen = () => {
    const initialstate = {
        controls: {
            name: {
                placeholder: 'Full Name',
                value: '',
                validation: {
                    required: true
                }
            },
            dob: {
                placeholder: 'Date of Birth',
                value: '',
                validation: {
                    required: true
                }
            },
            email: {
                placeholder: 'Mail Address',
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            password: {
                placeholder: 'Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    // Initialize state for page elements
    const [data, setData] = useState(initialstate);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    // handler to assign input values to states while changed
    const inputChangedHandler = (val, controlName) => {
        const updatedControls = updateObject(data.controls, {
            [controlName]: updateObject(data.controls[controlName], {
                value: val
            })
        });
        setData({ controls: updatedControls });
    }

    // Saves the date to state after user enters a date
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate);
    };

    // opens Datepicker
    const showDatePicker = () => {
        setShow(true);
    };


    return (
        <View style={styles.container}>
            <Text>Registration</Text>
            <TextInput
                placeholder={data.controls.name.placeholder}
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: 'black'
                }]}
                autoCapitalize="none"
                onChangeText={(val) => inputChangedHandler(val, 'email')}
            />
            <View>
                <Text>{data.controls.dob.placeholder}</Text>
                <Text onPress={showDatePicker}>{date.toLocaleDateString()} (Click to change)</Text>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode='date'
                    is24Hour={true}
                    display="default"
                    maximumDate={new Date()}
                    onChange={onDateChange}
                />
            )}
            <TextInput
                placeholder={data.controls.email.placeholder}
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: 'black'
                }]}
                autoCapitalize="none"
                onChangeText={(val) => inputChangedHandler(val, 'email')}
            />
            <TextInput
                placeholder={data.controls.password.placeholder}
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: 'black'
                }]}
                autoCapitalize="none"
                onChangeText={(val) => inputChangedHandler(val, 'password')}
            />
            <TouchableOpacity
                onPress={() => { loginHandler() }}>
                <Text>Click Here</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});