import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../nav/authNav/SplashScreen';
import PhoneNumber from '../nav/authNav/PhoneNumber';
import Otp from '../nav/authNav/Otp';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="splash">
   <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="phonenumber"
            component={PhoneNumber}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="otp"
            component={Otp}
            options={{ headerShown: false }}
          />
</Stack.Navigator>
  )
}

export default AuthNavigator