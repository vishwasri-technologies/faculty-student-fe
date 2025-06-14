import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StudentBottomNavbar from './StudentBottomNavbar';

const StudentExternalMarksScreen = ({ navigation }) => {
  const openResultLink = () => {
    Linking.openURL('https://www.osmania.ac.in/res07/20250402.jsp');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/back-arrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Semester Marks</Text>
        </View>

        {/* Result Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Osmania University Results - 2025</Text>
          <TouchableOpacity onPress={openResultLink}>
            <Text style={styles.cardLink}>
              https://www.osmania.ac.in/res07/20250402.jsp
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StudentBottomNavbar/>
    </SafeAreaView>
  );
};

export default StudentExternalMarksScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    padding: wp('4%'),
    paddingBottom: hp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },
  backIcon: {
    width: wp('6.5%'),
    height: wp('6.5%'),
    resizeMode: 'contain',
    marginRight: wp('2%'),
  },
  headerTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#000',
marginLeft:wp('20'),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'),
    padding: wp('4%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    height:120,
  },
  cardTitle: {
    fontSize: hp('2%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
    color: '#333',
    lineHeight:hp('5'),
  },
  cardLink: {
    fontSize: hp('1.9%'),
    color: 'green',
    textDecorationLine: 'underline',
  },
});
