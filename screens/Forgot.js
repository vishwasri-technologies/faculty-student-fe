
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Dimensions,
//   ScrollView
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const { width } = Dimensions.get('window');

// const ForgotScreen = () => {
//     const navigation = useNavigation();
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = () => {
//     // Your login logic here
//     console.log('Login attempted with:', username, password);
//   };

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.container}
//       keyboardShouldPersistTaps="handled"
//     >
//       {/* Logo Title */}
//       <Text style={styles.title}>Camphavens</Text>

//       {/* Top Image */}
//       <Image
//         source={require('../assets/Forgot-illustration.png')}
//         style={styles.image}
//         resizeMode="contain"
//       />

//       {/* Login Heading */}
//       <Text style={styles.heading}>Reset Password</Text>
   

//       {/* Username Input */}
//       <Text style={styles.label}>User Name</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Enter UserName"
//         value={username}
//         onChangeText={setUsername}
//         placeholderTextColor="#999"
//         autoCapitalize="none"
//       />

//       {/* Password Input */}
//       <View style={styles.passwordContainer}>
//         <Text style={styles.label}> New Password</Text>
    
//       </View>
//       <View style={styles.passwordBox}>
//         <TextInput
//           style={styles.passwordInput}
//           placeholder="Enter Password"
//           secureTextEntry={!passwordVisible}
//           value={password}
//           onChangeText={setPassword}
//           placeholderTextColor="#999"
//         />
//         <TouchableOpacity
//           onPress={() => setPasswordVisible(!passwordVisible)}
//           style={styles.eyeIconContainer}
//         >
//           <Image
//             source={passwordVisible ? 
//               require('../assets/eye-on.png') :
//                 require('../assets/eye-off.png')}
//             style={styles.eyeIcon}
//             resizeMode="contain"
//           />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.passwordContainer}>
//         <Text style={styles.label}>Confirm Password</Text>
    
//       </View>
//      <View style={styles.passwordBox}>
//   <TextInput
//     style={styles.passwordInput}
//     placeholder="ReEnter Password"
//     secureTextEntry={!confirmPasswordVisible}
//     value={password}
//     onChangeText={setPassword}
//     placeholderTextColor="#999"
//   />
//   <TouchableOpacity
//     onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//     style={styles.eyeIconContainer}
//   >
//     <Image
//       source={confirmPasswordVisible ? 
//         require('../assets/eye-on.png') :
//         require('../assets/eye-off.png')}
//       style={styles.eyeIcon}
//       resizeMode="contain"
//     />
//   </TouchableOpacity>
// </View>


//       {/* Login Button */}
//       <TouchableOpacity 
//         style={styles.loginButton}
//          onPress={() => navigation.navigate('LoginScreen')}
//       >
//         <Text style={styles.loginButtonText}>Save</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#fff',
//     flexGrow: 1,
//   },
//   title: {
//     fontSize: 26,
//     color: '#007b8f',
//     fontWeight: 'bold',
//     marginBottom: 10,
//     marginTop: -30,
//   },
//   image: {
//     width: width * 0.8,
//     height: width * 0.6,
//     marginBottom: 20,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     alignSelf: 'flex-start',
//     lineHeight: 55,
//   },
 
//   label: {
//     alignSelf: 'flex-start',
//     fontWeight: '600',
//     marginBottom: 5,
//     fontSize: 18,
//   },
//   input: {
//     width: '100%',
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//     fontSize: 16,
//   },
//   passwordContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   forgot: {
//     color: '#007b8f',
//     fontWeight: '500',
//   },
//   passwordBox: {
//     width: '100%',
//     height: 50,
//     flexDirection: 'row',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   passwordInput: {
//     flex: 1,
//     color: '#000',
//     height: '100%',
//     fontSize: 16,
//   },
//   eyeIconContainer: {
//     padding: 5,
//   },
//   eyeIcon: {
//     width: 24,
//     height: 24,
//     tintColor: '#333',
//   },
//    eyeIconContainer1: {
//     padding: 5,
//   },
// eyeIcon1: {
//     width: 24,
//     height: 24,
//     tintColor: '#333',
//   },
//   loginButton: {
//     backgroundColor: '#007b8f',
//     paddingVertical: 14,
//     paddingHorizontal: 40,
//     borderRadius: 8,
//     width: '50%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop:2,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });

// export default ForgotScreen;








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
      <Text style={styles.title}>Camphavens</Text>

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
