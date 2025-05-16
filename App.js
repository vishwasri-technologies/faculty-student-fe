

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import FacultyDashboard from './screens/FacultyDashboard';
import ForgotScreen from './screens/Forgot';
import ScheduleScreen from './screens/Schedule';
import AttendanceScreen from './screens/Attendance';
// import CalendarScreen from './screens/CalendarScreen';
// import AssignmentsScreen from './screens/AssignmentsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#1C7988" 
        translucent={false} 
      />
      
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignUp">
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotScreen"
            component={ForgotScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={FacultyDashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ScheduleScreen"
            component={ScheduleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AttendanceScreen"
            component={AttendanceScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="CalendarScreen"
            component={CalendarScreen}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="AssignmentsScreen"
            component={AssignmentsScreen}
            options={{ headerShown: false }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
