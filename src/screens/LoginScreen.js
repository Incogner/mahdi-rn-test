import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { updateObject } from '../utility/utility';
import * as actions from '../redux/actions';

export default LoginScreen = () => {
    const initialstate = {
        controls: {
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

    // get the redux store states
    const loginState = useSelector(state => state.reducer);
    const dispatch = useDispatch();
    const fetchAuth = (email, password) => dispatch(actions.auth(email, password));

    // handler to assign input values to states while changed
    inputChangedHandler = (val, controlName) => {
        const updatedControls = updateObject(data.controls, {
            [controlName]: updateObject(data.controls[controlName], {
                value: val
            })
        });
        setData({ controls: updatedControls });
    }

    // on click user data will be fetched from firebase auth endpoint
    loginHandler = () => {
        fetchAuth(data.controls.email.value, data.controls.password.value);
    }

    // Pass either the loading status or sreen elements after loading data
    let content = <Text>Loading...</Text>;
    if (!loginState.loading) {
        content = (
            <>
                <Text>Login Here</Text>
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
            </>
        );
    }

    return (
        <View style={styles.container}>
            {content}
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