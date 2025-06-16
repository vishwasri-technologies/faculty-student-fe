

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Linking, 
  Alert,
  LayoutAnimation, 
  Platform, 
  UIManager,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqData = [
  {
    id: '1',
    question: 'How do I check my attendance?',
    answer: 'Go to Dashboard → Attendance to view subject-wise attendance percentage.',
  },
  {
    id: '2',
    question: 'Where can I see today\'s schedule?',
    answer: 'Check Dashboard → Timetable → Today to view your current day\'s classes.',
  },
  {
    id: '3',
    question: 'How to view the academic calendar?',
    answer: 'From the Dashboard, tap on Academic Calendar to view important dates and events.',
  },
  {
    id: '4',
    question: 'Where do I check exam schedule and results?',
    answer: 'Navigate to the Exams section from the bottom navigation bar. You\'ll find tabs for Exam Schedules and Marks.',
  },
  {
    id: '5',
    question: 'How do I view notes and upload assignments?',
    answer: 'Access Notes & Assignments from the bottom navigation. You can switch between Notes and Assignments tabs there.',
  },
  {
    id: '6',
    question: 'How can I give feedback about a faculty?',
    answer: 'Go to the main menu (hamburger icon) and select "Feedback" to submit your concerns or suggestions.',
  },
  {
    id: '7',
    question: 'Where do I check fee and payments status?',
    answer: 'From the main menu (hamburger icon), select "Fee & Payments" to see your total, paid, and pending fee amounts.',
  },
];

const FAQItem = ({ item, isExpanded, onToggle }) => {
  return (
    <View style={styles.faqCard}>
      <TouchableOpacity onPress={onToggle} style={styles.faqHeader}>
        <Text style={styles.faqQuestion}>{item.question}</Text>
        <Image 
          source={
            isExpanded
              ? require('../assets/arrow-up.png')
              : require('../assets/arrow-down.png')
          }
          style={styles.toggleIcon}
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.faqAnswerContainer}>
          <Text style={styles.faqAnswer}>{item.answer}</Text>
        </View>
      )}
    </View>
  );
};

const StudentHelpDesk = () => {
  const navigation = useNavigation();
  const [expandedId, setExpandedId] = useState('1');

  const handleToggleFAQ = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:support@camphavens.com')
      .catch(() => Alert.alert('Error', 'Could not open email client.'));
  };

  return (
    <View style={styles.container}>
      {/* Header */}
        <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                 <Image 
                   source={require('../assets/back-arrow.png')} // Assuming this is a dark/black arrow
                   style={styles.backArrowIcon} 
                 />
               </TouchableOpacity>
        <Text style={styles.title}>Help Desk</Text>
      </View>


      {/* FAQ List */}
      <FlatList
        data={faqData}
        renderItem={({ item }) => (
          <FAQItem 
            item={item} 
            isExpanded={expandedId === item.id}
            onToggle={() => handleToggleFAQ(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.faqListContainer}
        ListFooterComponent={() => (
          <View style={styles.contactSection}>
            <Text style={styles.contactText}>
              <Text style={styles.lightbulbIcon}>💡</Text>
              <Text> Still need help?</Text>
            </Text>
            <Text style={styles.contactText}>
              For more questions, please contact us at:
            </Text>
            <TouchableOpacity onPress={handleEmailPress}>
              <Text style={styles.contactEmail}>support@camphavens.com</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
   backArrowIcon: {
      width: wp(6),
      height: hp(3),
      resizeMode: 'contain',
      tintColor: '#333333',
    },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('5'),
    marginBottom: 40,
  },
  backButton: {
    width: 24,
    alignItems: 'flex-start',
    padding: wp(2),
    top:20,
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: wp('6'),
    fontWeight: 'bold',
    color: '#007B7F',
    textAlign: 'center',
    flex: 1,
    top:20,
    right:5,
  },

  faqListContainer: {
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(3),
    marginBottom: hp(1.5),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp(1.5),
    overflow: 'hidden',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(4),
  },
  faqQuestion: {
    fontSize: hp(2),
    color: '#333333',
    fontWeight: '500',
    flex: 1,
    marginRight: wp(2),
  },
  toggleIcon: {
    width: wp(4.5),
    height: hp(2.5),
    resizeMode: 'contain',
    tintColor: '#666',
  },
  faqAnswerContainer: {
    paddingHorizontal: wp(4),
    paddingBottom: hp(2),
    paddingTop: hp(0.5),
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  faqAnswer: {
    fontSize: hp(1.8),
    color: '#555555',
    lineHeight: hp(2.5),
  },
  contactSection: {
    marginTop: hp(3),
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  contactText: {
    fontSize: hp(1.9),
    color: '#555555',
    marginBottom: hp(0.5),
    textAlign: 'center',
  },
  lightbulbIcon: {
    fontSize: hp(2.2),
  },
  contactEmail: {
    fontSize: hp(1.9),
    color: '#1C7988',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default StudentHelpDesk;
