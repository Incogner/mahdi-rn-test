import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Login Here</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                    color: 'black'
                }]}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Password"
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