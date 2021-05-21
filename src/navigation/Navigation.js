
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';

import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import ShiftListScreen from '../screens/ShiftListScreen';

export default Navigation = () => {
    const isAuthenticated = useSelector(state => state.reducer.token !== null);

    return (
        <NavigationContainer>
            <RootNavigator isAuth={isAuthenticated} />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator();
const RootNavigator = ({ isAuth }) => {
    //console.log(isAuth);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuth ? (
                // No token found, user isn't signed in
                <>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            title: 'Login',
                            animationTypeForReplace: isAuth ? 'pop' : 'push',
                        }}
                    />
                    <Stack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                        options={{
                            title: 'Registration',
                            animationTypeForReplace: isAuth ? 'pop' : 'push',
                        }}
                    />
                </>
            ) : (
                // User is signed in
                <Stack.Screen name="ShiftList" component={ShiftListScreen} />
            )}
        </Stack.Navigator>
    );
}
