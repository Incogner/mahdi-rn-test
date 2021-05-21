import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import * as actions from '../redux/actions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';



const OpenScreen = () => {
    const dispatch = useDispatch();
    const logout = () => dispatch(actions.logout());
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#c8e6e2', alignItems: 'center' }}>
            <Text>Open List!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { logout() }}
            ><Text style={styles.text}>Click to Logout!</Text></TouchableOpacity>
        </View>
    );
}

const AppliedScreen = () => {
    const dispatch = useDispatch();
    const logout = () => dispatch(actions.logout());
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#e2c8e6', alignItems: 'center' }}>
            <Text>Applied list!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { logout() }}
            ><Text style={styles.text}>Click to Logout!</Text></TouchableOpacity>
        </View>
    );
}

const AcceptedScreen = () => {
    const dispatch = useDispatch();
    const logout = () => dispatch(actions.logout());
    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#e6d1c8', alignItems: 'center' }}>
            <Text>Accepted list!</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => { logout() }}
            ><Text style={styles.text}>Click to Logout!</Text></TouchableOpacity>
        </View>
    );
}


const Tab = createBottomTabNavigator();

export default ShiftListScreen = () => {
    const { colors } = useTheme();

    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        // switch logo name by screen name
                        if (route.name === 'Open') {
                            iconName = focused ? 'folder-open' : 'folder-open';
                        } else if (route.name === 'Accepted') {
                            iconName = focused ? 'user' : 'user';
                        } else if (route.name === 'Applied') {
                            iconName = focused ? 'edit' : 'edit';
                        }

                        // Return the Logo
                        return <FontAwesomeIcon
                            name={iconName}
                            color={color}
                            size={size}
                        />;
                    },
                })}
                tabBarOptions={{
                    activeTintColor: colors.text,
                    inactiveTintColor: colors.disabled,
                }}
            >
                <Tab.Screen name="Open" component={OpenScreen} />
                <Tab.Screen name="Applied" component={AppliedScreen} />
                <Tab.Screen name="Accepted" component={AcceptedScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: '70%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: '#009387',
        borderWidth: 1,
        marginTop: 15
    },
    text: {
        color: '#009387',
        fontSize: 18,
        fontWeight: 'bold'
    }
});




