
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Linking,
  FlatList,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StudentBottomNavbar from './StudentBottomNavbar';

const StudentAcademicCalendar = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
const handleDownload = () => {
    const pdfUrl = 'https://example.com/sample-academic-calendar.pdf';
    Linking.openURL(pdfUrl);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={require('../assets/backarrow.png')} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Academic Calendar</Text>
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.dropdownHeader}
            onPress={() => setExpanded(!expanded)}>
            <Text style={styles.dropdownTitle}>Academic Calendar</Text>
          </TouchableOpacity>

          <Text style={styles.subText}>Calendar for the Academic year</Text>

          {/* Download link immediately after subtitle */}
          <TouchableOpacity onPress={handleDownload}>
            <Text style={styles.downloadLink}>View PDF</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StudentBottomNavbar />
    </SafeAreaView>
  );
};

export default StudentAcademicCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp('2%'),
    backgroundColor: '#1C7988',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backIcon: {
    width: wp('6.4%'),
    height: hp('4%'),
  },
  headerTitle: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: 'white',
    marginRight: wp('23'),
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: wp('6%'),
    borderRadius: 10,
    marginTop: hp('4%'),
    elevation: 3,
    width: wp('90%'),
    marginLeft: wp('5'),
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownTitle: {
    fontSize: wp('5.8%'),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: wp('4.9%'),
    color: '#555',
    marginTop: hp('1%'),
  },

  selectBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: wp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: wp('4%'),
    color: '#333',
  },
  downloadLink: {
    fontSize: wp('4%'),
    color: '#007BFF',
    marginTop: hp('2%'),
    textDecorationLine: 'underline',
    marginLeft:wp('60'),
  },
});

