

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('../assets/Signup-illustration.png')}
            style={styles.topImage}
            resizeMode="contain"
          />

          <Text style={styles.heading}>Sign Up</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={fullName}
              onChangeText={setFullName}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>ID Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your ID"
              value={idNumber}
              onChangeText={setIdNumber}
              keyboardType="numeric"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text
                style={styles.loginLink}
                onPress={() => navigation.navigate('LoginScreen')}
              >
                Login
              </Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp('4%'),
    paddingHorizontal: wp('5%'),
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topImage: {
    width: wp('75%'),
    height: hp('30%'),
    marginBottom: hp('2%'),
  },
  heading: {
    fontSize: hp('3.2%'),
    fontWeight: 'bold',
    marginBottom: hp('4%'),
    color: 'black',
    alignSelf: 'flex-start',
  },
  formGroup: {
    width: '100%',
    marginBottom: hp('2.5%'),
  },
  label: {
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.4%'),
    fontSize: hp('2%'),
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  button: {
    marginTop: hp('1.0%'),
    backgroundColor: '#1C7988',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('3%'),
    width: wp('90%'),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  loginLinkContainer: {
    marginTop:hp('2'),
  alignSelf:'center',
  marginRight:wp('1'),
  },
  loginText: {
    fontSize: hp('1.8%'),
    color: '#333',
  },
  loginLink: {
    color: '#1C7988',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default SignUpScreen;


