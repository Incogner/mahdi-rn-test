import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default ShiftListScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Shift List</Text>
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