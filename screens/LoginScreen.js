

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Camphavens</Text>

          <Image
            source={require('../assets/Login-illustration.png')}
            style={styles.image}
            resizeMode="contain"
          />

          <Text style={styles.heading}>Login</Text>
          <Text style={styles.subheading}>Welcome back</Text>

          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter UserName"
            value={username}
            onChangeText={setUsername}
            placeholderTextColor="#999"
            autoCapitalize="none"
          />

          <View style={styles.passwordContainer}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
              <Text style={styles.forgot}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.passwordBox}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIconContainer}
            >
              <Image
                source={
                  passwordVisible
                    ? require('../assets/eye-on.png')
                    : require('../assets/eye-off.png')
                }
                style={styles.eyeIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            // onPress={() => navigation.navigate('StudentDashboard')}
             onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupLinkContainer}>
            <Text style={styles.signupText}>
              Don’t have an account?{' '}
              <Text
                style={styles.signupLink}
                onPress={() => navigation.navigate('SignUp')}
              >
                Sign Up
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
    padding: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: hp('3.2%'),
    color: '#007b8f',
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
    marginTop: hp('-6%'),
  },
  image: {
    width: wp('80%'),
    height: hp('30%'),
    marginBottom: hp('3%'),
  },
  heading: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: hp('5.5%'),
  },
  subheading: {
    fontSize: hp('2.2%'),
    color: '#555',
    marginBottom: hp('3%'),
    alignSelf: 'flex-start',
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: hp('0.5%'),
    fontSize: hp('2.2%'),
  },
  input: {
    width: '100%',
    height: hp('6.5%'),
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2.5%'),
    fontSize: hp('2%'),
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  forgot: {
    color: '#007b8f',
    fontWeight: '500',
    fontSize: hp('2%'),
  },
  passwordBox: {
    width: '100%',
    height: hp('6.5%'),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('4%'),
  },
  passwordInput: {
    flex: 1,
    color: '#000',
    height: '100%',
    fontSize: hp('2%'),
  },
  eyeIconContainer: {
    padding: wp('1%'),
  },
  eyeIcon: {
    width: wp('5.5%'),
    height: wp('5.5%'),
    tintColor: '#333',
  },
  loginButton: {
    backgroundColor: '#007b8f',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('2.5%'),
    width: wp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('0.1%'),
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp('2.2%'),
  },
  signupLinkContainer: {
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  signupText: {
    fontSize: hp('1.9%'),
    color: '#333',
  },
  signupLink: {
    color: '#007b8f',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
