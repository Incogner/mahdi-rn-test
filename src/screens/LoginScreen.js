import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import updateObject from '../utility/utility';

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

      const [data, setData] = useState(initialstate);

      inputChangedHandler = (val, controlName) => {
        const updatedControls = updateObject(data.controls, {
          [controlName]: updateObject(data.controls[controlName], {
            value: val
          })
        });
        setData({ controls: updatedControls });
      }

    return (
        <View style={styles.container}>
            <Text>Login Here</Text>
            <TextInput
                placeholder={data.controls.email.placeholder}
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: 'black'
                }]}
                autoCapitalize="none"
            />
            <TextInput
                placeholder={data.controls.password.placeholder}
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: 'black'
                }]}
                autoCapitalize="none"
            />
            <TouchableOpacity>
                <Text>Click Here</Text>
            </TouchableOpacity>
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