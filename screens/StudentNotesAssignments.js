
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import StudentBottomNavbar from './StudentBottomNavbar';

const StudentNotesAssignments = () => {
  const navigation = useNavigation();

  const [activeTab, setActiveTab] = useState('Notes');
  const [expandedAssignments, setExpandedAssignments] = useState(false);

  const renderNotes = () => (
    <View style={styles.cardContainer}>
      {[
        {
          title: 'JAVA PROGRAMMING',
          subtitle: 'Unit 3 - Data Types and Functions',
          link: 'View PDF',
        },
        {
          title: 'DATA STRUCTURES',
          subtitle: 'Unit 2 - Linear Data Structures',
          link: 'View PDF',
        },
      ].map((item, index) => (
        <View key={index} style={styles.noteCard}>
          <Text style={styles.subject}>{item.title}</Text>
          <Text style={styles.unit}>{item.subtitle}</Text>
          <TouchableOpacity>
            <Text style={styles.pdfLink}>{item.link}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  const renderAssignmentsCollapsed = () => (
    <View style={styles.cardContainer}>
      {['Assignment 1', 'Assignment 2'].map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.assignmentCard}
          onPress={() => setExpandedAssignments(true)}
        >
          <Text style={styles.assignmentTitle}>{item}</Text>
          <Image
            source={require('../assets/arrow-right.png')}
            style={styles.rightArrowIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAssignmentsExpanded = () => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => setExpandedAssignments(false)}
        style={styles.backToAssignments}
      >
        <Image
          source={require('../assets/backarrow.png')}
          style={styles.backIconSmall}
        />
        <Text style={styles.assignmentTitle}>Back to Assignments</Text>
      </TouchableOpacity>

      {[
        {
          title: 'JAVA PROGRAMMING',
          link: 'View PDF',
        },
        {
          title: 'DATA STRUCTURES',
          link: 'View PDF',
        },
      ].map((item, index) => (
        <View key={index} style={styles.noteCard}>
          <Text style={styles.subject}>{item.title}</Text>
          <TouchableOpacity>
            <Text style={styles.pdfLink}>{item.link}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/backarrow.png')}
              style={styles.backIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notes & Assignments</Text>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              setActiveTab('Notes');
              setExpandedAssignments(false);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Notes' && styles.activeTabText,
              ]}
            >
              Notes
            </Text>
            {activeTab === 'Notes' && <View style={styles.activeIndicator} />}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => {
              setActiveTab('Assignments');
              setExpandedAssignments(false);
            }}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'Assignments' && styles.activeTabText,
              ]}
            >
              Assignments
            </Text>
            {activeTab === 'Assignments' && (
              <View style={styles.activeIndicator} />
            )}
          </TouchableOpacity>
        </View>

        {/* Content */}
        {activeTab === 'Notes'
          ? renderNotes()
          : expandedAssignments
          ? renderAssignmentsExpanded()
          : renderAssignmentsCollapsed()}
      </ScrollView>
      <StudentBottomNavbar activeTab="Notes" />
    </SafeAreaView>
  );
};

export default StudentNotesAssignments;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: hp('5%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C7988',
    padding: hp('2%'),
  },
  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
  backIconSmall: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('2%'),
    tintColor: '#333',
  },
  headerTitle: {
    color: 'white',
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    marginLeft: wp('17%'),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: hp('1.5%'),
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: hp('2%'),
    fontWeight: '600',
    color: '#555',
  },
  activeTabText: {
    color: '#000',
  },
  activeIndicator: {
    height: hp('0.5%'),
    width: wp('35%'),
    backgroundColor: '#1E7F85',
    marginTop: hp('0.5%'),
    borderRadius: hp('1%'),
  },
  cardContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  noteCard: {
    backgroundColor: '#fff',
    borderRadius: hp('1%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  subject: {
    fontSize: hp('2%'),
    fontWeight: '700',
    color: '#000',
  },
  unit: {
    fontSize: hp('1.8%'),
    color: '#666',
    marginTop: hp('0.5%'),
  },
  pdfLink: {
    fontSize: hp('1.8%'),
    color: '#2E89FF',
    marginTop: hp('1%'),
    alignSelf: 'flex-end',
    textDecorationLine:"underline",
  },
  assignmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: hp('1%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  assignmentTitle: {
    fontSize: hp('2%'),
    fontWeight: '600',
    color: '#000',
  },
  rightArrowIcon: {
    width: wp('3%'),
    height: hp('2%'),
    tintColor: '#555',
  },
  backToAssignments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
});

