import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomNavbar from './BottomNavbar';


const NotesAssignmentsScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
         <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/backarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notes & Assignments</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {/* Upload Notes */}
        <TouchableOpacity style={styles.uploadButton}   onPress={() => navigation.navigate('UploadNotesScreen')}  >
          <Image
            source={require('../assets/notes-icon.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Upload Notes</Text>
        </TouchableOpacity>

        {/* Upload Assignment */}
        <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('UploadAssignmentScreen')}>
          <Image
            source={require('../assets/assignment-icon.png')}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Upload Assignment</Text>
        </TouchableOpacity>
      </View>
       </ScrollView>
       <BottomNavbar/>
    </SafeAreaView>
  );
};

export default NotesAssignmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
     backgroundColor: "#1C7988",
    padding: hp('2%'),
  },
  backIcon: {
    width: wp('9%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#fff',
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    marginLeft: wp('14%'),
  },
  buttonContainer: {
    marginTop: hp('4%'),
    paddingHorizontal: wp('6%'),
    gap: hp('2%'),
  },
  uploadButton: {
    backgroundColor: '#5DA8A7',
    borderRadius: wp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2.5%'),
    paddingHorizontal: wp('5%'),
    gap: wp('4%'),
  },
  icon: {
    width: wp('7%'),
    height: wp('7%'),
    resizeMode: 'contain',
  },
  buttonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },

});
