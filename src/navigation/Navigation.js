
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ShiftListScreen from '../screens/ShiftListScreen';

export default Navigation = () => {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
             <Stack.Screen name="Login" component={LoginScreen} />
             <Stack.Screen name="Registration" component={RegistrationScreen} />
             <Stack.Screen name="ShiftList" component={ShiftListScreen} />
        </NavigationContainer>
    );
}

