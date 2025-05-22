
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
import BottomNavbar from './BottomNavbar';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState(false);
  const [branchDropdown, setBranchDropdown] = useState(false);
  const [yearDropdown, setYearDropdown] = useState(false);

  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const branches = ['Computer Science', 'Electronics', 'Mechanical'];
  const years = ['2023-2024', '2024-2025', '2025-2026', '2026-2027', '2027-2028', '2028-2029'];

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
            <Text style={styles.downloadLink}>Download PDF</Text>
          </TouchableOpacity>

          {expanded && (
            <View style={styles.dropdownContent}>
              {/* Branch Dropdown */}
              <Text style={styles.label}>Select Branch</Text>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setBranchDropdown(!branchDropdown)}>
                <Text style={styles.selectedText}>
                  {selectedBranch || 'Choose Branch...'}
                </Text>
              </TouchableOpacity>
              {branchDropdown && (
                <View style={styles.dropdownList}>
                  {branches.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedBranch(item);
                        setBranchDropdown(false);
                      }}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Year Dropdown */}
              <Text style={[styles.label, { marginTop: hp('2%') }]}>Select Year</Text>
              <TouchableOpacity
                style={styles.selectBox}
                onPress={() => setYearDropdown(!yearDropdown)}>
                <Text style={styles.selectedText}>
                  {selectedYear || 'Choose Year...'}
                </Text>
              </TouchableOpacity>
              {yearDropdown && (
                <View style={styles.dropdownList}>
                  {years.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedYear(item);
                        setYearDropdown(false);
                      }}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}
        </View>
      </ScrollView>
      <BottomNavbar />
    </SafeAreaView>
  );
};

export default CalendarScreen;

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
    height: hp('3%'),
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
    fontSize: wp('4.8%'),
    fontWeight: 'bold',
  },
  subText: {
    fontSize: wp('3.9%'),
    color: '#555',
    marginTop: hp('1%'),
  },
  dropdownContent: {
    marginTop: hp('2%'),
  },
  label: {
    fontSize: wp('4%'),
    marginBottom: hp('1%'),
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
  dropdownList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: hp('0.5%'),
  },
  dropdownItem: {
    padding: wp('3%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  downloadLink: {
    fontSize: wp('4%'),
    color: '#007BFF',
    marginTop: hp('2%'),
    textDecorationLine: 'underline',
  },
});

