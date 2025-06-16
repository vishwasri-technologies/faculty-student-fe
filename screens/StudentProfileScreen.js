

import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import BottomNavbar from './BottomNavbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const StudentProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/blackbackarrow.png')}
            style={styles.backArrow}
          />
        </TouchableOpacity>
        <Text style={styles.header}>My Profile</Text>
        <View style={{ width: wp('8%') }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={require('../assets/profile.png')}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Dr. Emily Carter</Text>
        <Text style={styles.staffId}>24MC2015544</Text>

        <Section title="Academic Details">
          <Detail label="Course" value="B.Tech  - Computer Science" />
          <Detail label="Department" value="Computer Engineering" />
          <Detail label="Semester" value="4" />

        </Section>

        <Section title="Personal Information">
          <Detail label="Date of Birth" value="10-05-1985" />
          <Detail label="Gender" value="Female" />
          <Detail label="Email ID" value="emily.carter@college.edu" />
          <Detail label="Mobile Number" value="9876543210" />
          <Detail label="Address" value={"101, MG Road,\n       Bangalore, Karnataka,  \n       India – 560001"} />
        </Section>

        <Section title="Guardian Details">
          <Detail label="Name" value={"Raj Kumar"} />
          <Detail label="Relation" value={"Father"} />
          <Detail label="Email ID" value="emily.carter@college.edu" />
          <Detail label="Mobile Number" value="9876543210" />
        </Section>
      </ScrollView>

      <View style={styles.bottomNavbar}>
        <BottomNavbar activeTab="Profile" />
      </View>
    </SafeAreaView>
  );
};

const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Detail = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}> -    {value}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    backgroundColor: '#fff',
  },
  backArrow: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
  header: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#007B7F',
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('10%'), 
  },
  profileImage: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: wp('11%'),
    alignSelf: 'center',
    marginVertical: hp('2%'),
  },
  name: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  staffId: {
    fontSize: wp('3.5%'),
    textAlign: 'center',
    color: '#888',
    marginBottom: hp('2%'),
  },
  section: {
    marginTop: hp('2%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: hp('0.8%'),
  },
  detailLabel: {
    fontSize: wp('3.8%'),
    fontWeight: '500',
    color: '#444',
    width: wp('40%'),
  },
  detailValue: {
    fontSize: wp('3.8%'),
    color: '#444',
    flex: 1,
  },
  bottomNavbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default StudentProfileScreen;