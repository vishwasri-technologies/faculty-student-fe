
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Linking,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomNavbar from './BottomNavbar';


const { width } = Dimensions.get('window');

const courseOptions = ['B.Tech', 'M.Tech', 'MBA'];
const departmentOptions = ['CSE', 'EEE', 'MECH', 'ECE'];
const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const ExamsScreen = () => {
  const navigation = useNavigation();

  const [course, setCourse] = useState('Course');
  const [department, setDepartment] = useState('Department');
  const [year, setYear] = useState('Year');

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const exams = [
    { id: '1', title: 'EEE  I-SEM Main', pdfLink: 'https://example.com/eee-main.pdf' },
    { id: '2', title: 'CSE  I-SEM Backlog', pdfLink: 'https://example.com/cse-backlog.pdf' },
  ];

  const renderExamCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.examTitle}>{item.title}</Text>
        {/* <Image
          source={require('../assets/down-arrow.png')}
          style={styles.downArrow}
        /> */}
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(item.pdfLink)}>
        <Text style={styles.downloadText}>View PDF</Text>
      </TouchableOpacity>
    </View>
  );

  const Dropdown = ({ label, onPress }) => (
    <TouchableOpacity style={styles.dropdown} onPress={onPress}>
      <Text>{label}</Text>
      <Image
        source={require('../assets/downarrow.png')}
        style={styles.dropdownArrow}
      />
    </TouchableOpacity>
  );

  const renderModal = (visible, setVisible, options, onSelect) => (
    <Modal transparent={true} visible={visible} animationType="fade">
      <TouchableOpacity style={styles.modalOverlay} onPress={() => setVisible(false)}>
        <View style={styles.modalContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.modalOption}
              onPress={() => {
                onSelect(option);
                setVisible(false);
              }}
            >
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 80 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/blackbackarrow.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Exams</Text>
        </View>

        {/* Dropdowns */}
        <View style={styles.filterContainer}>
          <Dropdown label={course} onPress={() => setShowCourseModal(true)} />
          <Dropdown label={department} onPress={() => setShowDepartmentModal(true)} />
          <Dropdown label={year} onPress={() => setShowYearModal(true)} />
        </View>

        {/* Exam Cards */}
      {/* {exams.map((item) => renderExamCard({ item }))} */}
      {exams.map((item) => (
  <View key={item.id}>
    {renderExamCard({ item })}
  </View>
))}



      </ScrollView>

      {/* Bottom Navbar */}
      <BottomNavbar activeTab="Exams" />

      {/* Modals */}
      {renderModal(showCourseModal, setShowCourseModal, courseOptions, setCourse)}
      {renderModal(showDepartmentModal, setShowDepartmentModal, departmentOptions, setDepartment)}
      {renderModal(showYearModal, setShowYearModal, yearOptions, setYear)}
    </View>
  );
};

export default ExamsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%'),
    paddingBottom: hp('2%'),
  },
  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#1C7988',
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    marginLeft: wp('28%'),
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    flexWrap: 'wrap',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 9,
    paddingHorizontal: 12,
    marginVertical: 18,
    backgroundColor: '#fff',
  },
  dropdownArrow: {
    width: 14,
    height: 14,
    marginLeft: 6,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 7,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 16,
    marginHorizontal: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  examTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  downArrow: {
    width: 22,
    height: 10,
  },
  downloadText: {
    color: '#3366FF',
    marginTop: 8,
    fontWeight: '500',
    textDecorationLine:'underline',
    marginLeft:'220'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
});


