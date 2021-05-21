import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSelector, useDispatch } from 'react-redux';
import { updateObject, checkValidity } from '../utility/utility';
import * as actions from '../redux/actions';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';


export default RegistrationScreen = ({ navigation }) => {
    const initialstate = {
        controls: {
            name: {
                placeholder: 'Full Name',
                value: '',
                validation: {
                    required: true,
                    errorMessage: 'Please enter your full name'
                },
                valid: false,
                showError: false,
                editing: false
            },
            dob: {
                placeholder: 'Date of Birth',
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                showError: false,
                editing: false
            },
            email: {
                placeholder: 'Your Email Address',
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                    errorMessage: 'Please enter valid email address'
                },
                valid: false,
                showError: false,
                editing: false
            },
            password: {
                placeholder: 'Your Password',
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    errorMessage: 'Password must be 6 characters long'
                },
                valid: false,
                showError: false,
                editing: false
            },
            secondPassword: {
                placeholder: 'Your Password again',
                value: '',
                validation: {
                    required: true,
                    checkPassword: true,
                    errorMessage: 'Passwords are not same'
                },
                valid: false,
                showError: false,
                editing: false
            },
            allValid: false,
            secureTextEntry: true
        }
    }

    // Initialize state for page elements
    const [data, setData] = useState(initialstate);
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    // get the redux store states
    const registerState = useSelector(state => state.reducer);
    const dispatch = useDispatch();
    const fetchAuth = (email, password, name) => dispatch(actions.auth(email, password, name, true));
    const removeError = () => dispatch(actions.errorRemove());

    // use react-native-paper material design library for text color and background
    const { colors } = useTheme();

    // handler to assign input values to states while changed
    const inputChangedHandler = (val, controlName) => {
        const updatedControls = updateObject(data.controls, {
            [controlName]: updateObject(data.controls[controlName], {
                value: val,
                valid: checkValidity(val, data.controls[controlName].validation, data.controls.password.value),
                showError: !checkValidity(val, data.controls[controlName].validation, data.controls.password.value),
                editing: val !== ""
            })
        });
        // will check if inputs are valid to enable signin button
        const updatedControlsWithValidation = updateObject(updatedControls, {
            allValid: updatedControls.email.valid && updatedControls.password.valid
                && updatedControls.name.valid && updatedControls.secondPassword.valid
        });
        setData({ controls: updatedControlsWithValidation });
    }

    // this will make sure error will not show up while editing
    const validInputHandler = (controlName) => {
        if (!data.controls[controlName].valid) {
            const updatedControls = updateObject(data.controls, {
                [controlName]: updateObject(data.controls[controlName], {
                    editing: false
                })
            });
            setData({ controls: updatedControls });
        }
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

    // on click user data will be fetched from firebase auth endpoint
    const registerHandler = () => {
        fetchAuth(data.controls.email.value, data.controls.password.value, data.controls.name.value);
        Alert.alert(
            "Congratulations "+data.controls.name.value+"!",
            'Your account has been created and you are already signed in.',
            [
                { text: "OK" }
            ]
        );
    }

    // navigate to Login
    const cancelHandler = () => {
        navigation.goBack();
    }

    // handler to toggle between password secretText
    const updateSecureTextEntry = () => {
        const updatedControls = updateObject(data.controls, {
            secureTextEntry: !data.controls.secureTextEntry
        });
        setData({ controls: updatedControls });
    }

    // Alert to show error from server
    const showErrorAlert = (message) =>
        Alert.alert(
            "Error",
            message,
            [
                { text: "OK", onPress: () => removeError() }
            ]
        );

    // Name field
    const nameView = (
        <>
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Full Name</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder={data.controls.name.placeholder}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => inputChangedHandler(val, 'name')}
                    onEndEditing={() => validInputHandler('name')}
                />
                {data.controls.name.valid ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                {data.controls.name.showError ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <FontAwesome
                            name="times-circle"
                            color="red"
                            size={20}
                        />
                    </Animatable.View>
                    :
                    null
                }
            </View>
            {data.controls.name.showError && !data.controls.name.editing ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{data.controls.name.validation.errorMessage}</Text>
                </Animatable.View>
                :
                <Text style={styles.errorMsg}></Text>
            }
        </>
    );

    // DatePicker field
    const dateView = (
        <>
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>{data.controls.dob.placeholder}</Text>
            <View style={styles.action}>
                <Text
                    onPress={showDatePicker}
                    style={[styles.dateInput, {
                        color: colors.text
                    }]}
                >{date.toLocaleDateString()}</Text>
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather
                        name="calendar"
                        color={colors.text}
                        size={20}
                        onPress={showDatePicker}
                    />
                </Animatable.View>
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
            </View>
        </>
    );

    // Email field
    const emailView = (
        <>
            <Text style={[styles.text_footer, {
                color: colors.text,
                paddingTop: 15
            }]}>Email (Username)</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder={data.controls.email.placeholder}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => inputChangedHandler(val, 'email')}
                    onEndEditing={() => validInputHandler('email')}
                />
                {data.controls.email.valid ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <Feather
                            name="check-circle"
                            color="green"
                            size={20}
                        />
                    </Animatable.View>
                    : null}
                {data.controls.email.showError ?
                    <Animatable.View
                        animation="bounceIn"
                    >
                        <FontAwesome
                            name="times-circle"
                            color="red"
                            size={20}
                        />
                    </Animatable.View>
                    :
                    null
                }
            </View>
            {data.controls.email.showError && !data.controls.email.editing ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{data.controls.email.validation.errorMessage}</Text>
                </Animatable.View>
                :
                <Text style={styles.errorMsg}></Text>
            }
        </>
    );

    // Password Field
    const passwordView = (
        <>
            <Text style={[styles.text_footer, {
                color: colors.text,
                paddingTop: 5
            }]}>Password</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder={data.controls.password.placeholder}
                    placeholderTextColor="#666666"
                    secureTextEntry={data.controls.secureTextEntry}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => inputChangedHandler(val, 'password')}
                    onEndEditing={() => validInputHandler('password')}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.controls.secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                    }
                </TouchableOpacity>
            </View>
            {data.controls.password.showError ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{data.controls.password.validation.errorMessage}</Text>
                </Animatable.View>
                :
                <Text style={styles.errorMsg}></Text>
            }

            <Text style={[styles.text_footer, {
                color: colors.text,
                paddingTop: 5
            }]}>Re-enter Password</Text>
            <View style={styles.action}>
                <TextInput
                    placeholder={data.controls.secondPassword.placeholder}
                    placeholderTextColor="#666666"
                    secureTextEntry={data.controls.secureTextEntry}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => inputChangedHandler(val, 'secondPassword')}
                    onEndEditing={() => validInputHandler('secondPassword')}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.controls.secureTextEntry ?
                        <Feather
                            name="eye-off"
                            color="grey"
                            size={20}
                        />
                        :
                        <Feather
                            name="eye"
                            color="grey"
                            size={20}
                        />
                    }
                </TouchableOpacity>
            </View>
            {data.controls.secondPassword.showError ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{data.controls.secondPassword.validation.errorMessage}</Text>
                </Animatable.View>
                :
                <Text style={styles.errorMsg}></Text>
            }
        </>
    );


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Registration</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                {nameView}
                {dateView}
                {emailView}
                {passwordView}

                <View style={styles.button}>
                    <TouchableOpacity
                        disabled={!data.controls.allValid || registerState.loading}
                        style={styles.signIn}
                        onPress={() => { registerHandler() }}
                    >
                        <LinearGradient
                            colors={!data.controls.allValid || registerState.loading ? ['#cfe6e4', '#bad1cf'] : ['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            {/* Loading Text while fetching data */}
                            {registerState.loading ?
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Loading...</Text>
                                :
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Register</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => cancelHandler()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Cancel</Text>
                    </TouchableOpacity>
                </View>
                {/* Showing server errors fom firebase */}
                {registerState.error ?
                    showErrorAlert(registerState.error.message)
                    :
                    null}
            </Animatable.View>
        </View>
    );
}

// Styles for the Screen Views
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    footer: {
        flex: 8,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    dateInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -5,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    serverErrorMsg: {
        color: '#FF0000',
        fontSize: 20,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        marginTop: 15
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});