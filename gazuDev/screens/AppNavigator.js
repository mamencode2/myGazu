import {useState, useEffect} from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import HomeScreen from '../nav/appNav/HomeScreen';
import ResultScreen from '../nav/appNav/ResultScreen';
import ProfileScreen from '../nav/appNav/ProfileScreen';
import SettingScreen from '../nav/appNav/SettingScreen';
import RecentScreen from '../nav/appNav/RecentScreen';
import PaymentScreen from '../nav/appNav/PaymentScreen'


const Stack = createNativeStackNavigator();


const AppNavigator = ()=> {
  const [location, setLocation] = useState(null);
  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }
    requestPermissions()
  }, [])

    return (
        <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
   <Stack.Screen name="result" component={ResultScreen} initialParams={{coords:[ location.coords.longitude, 
        location.coords.latitude]}}/>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="setting" component={SettingScreen} />
      <Stack.Screen name="activity" component={RecentScreen} />
      <Stack.Screen name="payment" component={PaymentScreen} />
    </Stack.Navigator>  
    )
}


export default AppNavigator