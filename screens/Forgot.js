
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ForgotScreen = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* <Text style={styles.title}>Camphavens</Text> */}
       <Image
                  source={require('../assets/Company-logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />

      <Image
        source={require('../assets/Forgot-illustration.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.heading}>Reset Password</Text>

      <Text style={styles.label}>User Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter UserName"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#999"
        autoCapitalize="none"
      />

      <Text style={styles.label}>New Password</Text>
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

      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordBox}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Re Enter Password"
          secureTextEntry={!confirmPasswordVisible}
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
          style={styles.eyeIconContainer}
        >
          <Image
            source={
              confirmPasswordVisible
                ? require('../assets/eye-on.png')
                : require('../assets/eye-off.png')
            }
            style={styles.eyeIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={styles.loginButtonText}>Save</Text>
      </TouchableOpacity>

    </ScrollView>
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
   logo: {
    width: wp('40%'),
    height: hp('8%'),
    marginBottom: hp('1.5%'),
    marginTop: hp('-2%'),
  },
  title: {
    fontSize: wp('7%'),
    color: '#007b8f',
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    marginTop: hp('-3%'),
  },
  image: {
    width: wp('80%'),
    height: hp('30%'),
    marginBottom: hp('3%'),
  },
  heading: {
    fontSize: wp('6.5%'),
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    lineHeight: hp('7%'),
  },
  label: {
    alignSelf: 'flex-start',
    fontWeight: '600',
    marginBottom: hp('1%'),
    fontSize: wp('4.5%'),
  },
  input: {
    width: '100%',
    height: hp('6%'),
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2.5%'),
    fontSize: wp('4%'),
  },
  passwordBox: {
    width: '100%',
    height: hp('6%'),
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: wp('3%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  passwordInput: {
    flex: 1,
    color: '#000',
    height: '100%',
    fontSize: wp('4%'),
  },
  eyeIconContainer: {
    padding: wp('1%'),
  },
  eyeIcon: {
    width: wp('6%'),
    height: wp('6%'),
    tintColor: '#333',
  },
  loginButton: {
    backgroundColor: '#007b8f',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('2%'),
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
  },
 
});

export default ForgotScreen;
