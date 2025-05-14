
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Dimensions,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const SignUpScreen = ({ navigation }) => {
//   const [fullName, setFullName] = useState('');
//   const [idNumber, setIdNumber] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
//       <ScrollView
//         contentContainerStyle={styles.container}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//       >
//         {/* Top Image */}
//         <Image
//           source={require('../assets/Signup-illustration.png')}
//           style={styles.topImage}
//           resizeMode="contain"
//         />

//         <Text style={styles.heading}>Sign Up</Text>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Full Name</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your full name"
//             value={fullName}
//             onChangeText={setFullName}
//             placeholderTextColor="#999"
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>ID Number</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your ID"
//             value={idNumber}
//             onChangeText={setIdNumber}
//             keyboardType="numeric"
//             placeholderTextColor="#999"
//           />
//         </View>

//         <View style={styles.formGroup}>
//           <Text style={styles.label}>Password</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             placeholderTextColor="#999"
//           />
//         </View>

//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//     flexGrow: 1,
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//   },
//   topImage: {
//     width: width * 0.75,
//     height: height * 0.3,
//     marginBottom: 10,
//   },
//   heading: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     color: 'black',
//     alignSelf: 'flex-start',
//   },
//   formGroup: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 6,
//     fontWeight: '500',
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 6,
//     paddingHorizontal: 12,
//     paddingVertical: Platform.OS === 'ios' ? 14 : 10,
//     fontSize: 16,
//     backgroundColor: '#f9f9f9',
//     color: '#000',
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: '#1C7988',
//     paddingVertical: 12,
//     paddingHorizontal: 30,
//     borderRadius: 8,
//     width: '50%',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default SignUpScreen;






import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

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
          {/* Top Image */}
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topImage: {
    width: width * 0.75,
    height: height * 0.3,
    marginBottom: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
    alignSelf: 'flex-start',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1C7988',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SignUpScreen;

