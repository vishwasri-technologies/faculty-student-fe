

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  TextInput, 
  Alert,
  Modal,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Star Rating Component
const StarRating = ({ maxStars = 5, rating, onRatingChange }) => {
  const stars = [];
  for (let i = 1; i <= maxStars; i++) {
    stars.push(
      <TouchableOpacity key={i} onPress={() => onRatingChange(i)}>
        <Text style={[styles.star, i <= rating ? styles.filledStar : styles.emptyStar]}>
          ⭐
        </Text>
      </TouchableOpacity>
    );
  }
  return <View style={styles.starContainer}>{stars}</View>;
};

const courseList = [
  'BSc Computer Science',
  'BBA',
  'BA English',
  'BCom General',
  'BCA',
];

const departmentList = [
  'Computer Science',
  'Mathematics',
  'Commerce',
  'English',
  'Business Administration',
];

const StudentFeedbackScreen = () => {
  const navigation = useNavigation();

  const [selectedCourse, setSelectedCourse] = useState('Course');
  const [selectedDepartment, setSelectedDepartment] = useState('Department');
  const [facultyName, setFacultyName] = useState('');
  const [complaintText, setComplaintText] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(0);

  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const { width } = Dimensions.get('window');

  const handleSubmitFeedback = () => {
    if (
      selectedCourse === 'Course' ||
      selectedDepartment === 'Department' ||
      !facultyName ||
      !complaintText ||
      feedbackRating === 0
    ) {
      Alert.alert('Missing Information', 'Please fill in all fields and provide a rating.');
      return;
    }

    const feedbackData = {
      course: selectedCourse,
      department: selectedDepartment,
      facultyName,
      complaint: complaintText,
      rating: feedbackRating,
    };

    console.log('Submitting Feedback:', feedbackData);
    Alert.alert('Feedback Submitted', 'Thank you for your feedback!');

    setSelectedCourse('Course');
    setSelectedDepartment('Department');
    setFacultyName('');
    setComplaintText('');
    setFeedbackRating(0);
  };

  const renderModal = (visible, setVisible, dataList, setSelected) => (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <FlatList
            data={dataList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.modalItem}
                onPress={() => {
                  setSelected(item);
                  setVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setVisible(false)} style={styles.modalClose}>
            <Text style={styles.modalCloseText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate('StudentDashboard');
    }
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
        <Text style={styles.title}>Feedback</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.descriptionText}>
          Your voice matters. Share your feedback or report any concerns about faculty behavior or
          teaching quality. All submissions will be kept confidential and reviewed by the
          administration.
        </Text>

        <Text style={styles.sectionTitle}>Complaint about Faculty</Text>

        <View style={styles.dropdownContainer}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setCourseModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{selectedCourse}</Text>
            <Image source={require('../assets/downarrow.png')} style={styles.dropdownArrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setDepartmentModalVisible(true)}
          >
            <Text style={styles.dropdownText}>{selectedDepartment}</Text>
            <Image source={require('../assets/downarrow.png')} style={styles.dropdownArrowIcon} />
          </TouchableOpacity>
        </View>

        {renderModal(courseModalVisible, setCourseModalVisible, courseList, setSelectedCourse)}
        {renderModal(departmentModalVisible, setDepartmentModalVisible, departmentList, setSelectedDepartment)}

        <Text style={styles.sectionTitle}>Faculty Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Faculty Name"
          placeholderTextColor="#999"
          value={facultyName}
          onChangeText={setFacultyName}
        />

        <Text style={styles.sectionTitle}>Complaint</Text>
        <TextInput
          style={[styles.input, styles.complaintInput]}
          placeholder="Write a Complaint"
          placeholderTextColor="#999"
          multiline={true}
          numberOfLines={5}
          value={complaintText}
          onChangeText={setComplaintText}
          textAlignVertical="top"
        />

        <Text style={styles.feedbackTitle}>Feedback</Text>
        <StarRating rating={feedbackRating} onRatingChange={setFeedbackRating} />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
          <Text style={styles.submitButtonText}>Submit Feedback</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
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
    marginBottom: 20,
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
    fontSize: wp('7'),
    fontWeight: 'bold',
    color: '#007B7F',
    textAlign: 'center',
    flex: 1,
    top:20,
    right:5,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    paddingBottom: hp(5),
  },
  descriptionText: {
    fontSize: hp(1.9),
    color: '#555',
    lineHeight: hp(2.8),
    marginBottom: hp(3),
  },
  sectionTitle: {
    fontSize: hp(2.1),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(1.5),
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(2),
  },
  dropdownButton: {
    backgroundColor: '#FFF',
    borderRadius: wp(2),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: wp(0.5),
  },
  dropdownText: { fontSize: hp(1.8), color: '#333' },
  dropdownArrowIcon: {
    width: wp(3.5),
    height: hp(2),
    resizeMode: 'contain',
    tintColor: '#666',
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: wp(2),
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    fontSize: hp(1.8),
    color: '#333',
    marginBottom: hp(2),
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: wp(0.5),
  },
  complaintInput: {
    height: hp(15),
    paddingTop: hp(1.5),
  },
  feedbackTitle: {
    fontSize: hp(2.1),
    fontWeight: 'bold',
    color: '#333',
    marginTop: hp(1),
    marginBottom: hp(1.5),
    textAlign: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: hp(3),
  },
  star: {
    fontSize: hp(4),
    marginHorizontal: wp(1.5),
  },
  filledStar: { color: '#FFD700' },
  emptyStar: { color: '#CCC' },
  submitButton: {
    backgroundColor: '#1C7988',
    borderRadius: wp(2.5),
    paddingVertical: hp(2),
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: hp(2.2),
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    marginHorizontal: wp(10),
    backgroundColor: '#FFF',
    borderRadius: wp(2),
    padding: wp(4),
    maxHeight: hp(50),
  },
  modalItem: {
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalItemText: {
    fontSize: hp(2),
    color: '#333',
  },
  modalClose: {
    marginTop: hp(1),
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#007B7F',
    fontWeight: 'bold',
  },
});

export default StudentFeedbackScreen;
