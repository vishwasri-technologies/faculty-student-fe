
import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';

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
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
