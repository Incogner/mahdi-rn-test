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
import { useSelector, useDispatch } from 'react-redux';
import { updateObject, checkValidity } from '../utility/utility';
import * as actions from '../redux/actions';

import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';

export default LoginScreen = ({ navigation }) => {
    const initialstate = {
        controls: {
            username: {
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
            allValid: false,
            secureTextEntry: true
        }
    }

    // Initialize state for page elements
    const [data, setData] = useState(initialstate);

    // get the redux store states
    const loginState = useSelector(state => state.reducer);
    const dispatch = useDispatch();
    const fetchAuth = (email, password) => dispatch(actions.auth(email, password));
    const removeError = () => dispatch(actions.errorRemove());

    // use react-native-paper material design library for text color and background
    const { colors } = useTheme();

    // handler to assign input values to states while changed
    const inputChangedHandler = (val, controlName) => {
        const updatedControls = updateObject(data.controls, {
            [controlName]: updateObject(data.controls[controlName], {
                value: val,
                valid: checkValidity(val, data.controls[controlName].validation),
                showError: !checkValidity(val, data.controls[controlName].validation) && val !== "",
                editing: val !== ""
            })
        });
        // will check if inputs are valid to enable signin button
        const updatedControlsWithValidation = updateObject(updatedControls, {
            allValid: updatedControls.username.valid && updatedControls.password.valid
        });
        setData({ controls: updatedControlsWithValidation });
    }

    // this will make sure error will not show up while editing
    const validUsernameHandler = (controlName) => {
        if (!data.controls[controlName].valid) {
            const updatedControls = updateObject(data.controls, {
                [controlName]: updateObject(data.controls[controlName], {
                    editing: false
                })
            });
            setData({ controls: updatedControls });
        }
    }

    // on click user data will be fetched from firebase auth endpoint
    const loginHandler = () => {
        fetchAuth(data.controls.username.value, data.controls.password.value);
    }

    // navigate to registration page
    const registrationHandler = () => {
        navigation.navigate('Registration');
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

    // UserName field
    const usernameView = (
        <>
            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Username</Text>
            <View style={styles.action}>
                <FontAwesome
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput
                    placeholder={data.controls.username.placeholder}
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => inputChangedHandler(val, 'username')}
                    onEndEditing={() => validUsernameHandler('username')}
                />
                {data.controls.username.valid ?
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
                {data.controls.username.showError ?
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
            {data.controls.username.showError && !data.controls.username.editing ?
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{data.controls.username.validation.errorMessage}</Text>
                </Animatable.View>
                :
                null
            }
        </>
    );

    // Password Field
    const passwordView = (
        <>
            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput
                    placeholder={data.controls.password.placeholder}
                    placeholderTextColor="#666666"
                    secureTextEntry={data.controls.secureTextEntry}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => inputChangedHandler(val, 'password')}
                    onEndEditing={() => validUsernameHandler('password')}
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
                null
            }
        </>
    );

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Login</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                {usernameView}
                {passwordView}

                <View style={styles.button}>
                    <TouchableOpacity
                        disabled={!data.controls.allValid || loginState.loading}
                        style={styles.signIn}
                        onPress={() => { loginHandler() }}
                    >
                        <LinearGradient
                            colors={!data.controls.allValid || loginState.loading ? ['#cfe6e4', '#bad1cf'] : ['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            {/* Loading Text while fetching data */}
                            {loginState.loading ?
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Loading...</Text>
                                :
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Sign In</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => registrationHandler()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Register</Text>
                    </TouchableOpacity>
                </View>
                {/* Showing server errors fom firebase */}
                {loginState.error ?
                    showErrorAlert(loginState.error.message)
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
        paddingBottom: 50
    },
    footer: {
        flex: 3,
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
        marginTop: 50
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