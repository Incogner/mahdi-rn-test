import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';

export default ShiftListScreen = () => {

    const dispatch = useDispatch();
    const logout = () => dispatch(actions.logout());

    return (
        <View style={styles.container}>
            <Text>Shift List</Text>
            <TouchableOpacity
                onPress={() => { logout() }}
            ><Text>Click Here</Text></TouchableOpacity>
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