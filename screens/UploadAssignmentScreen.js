import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from './BottomNavbar';

const dropdownData = {
  course: ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc'],
  department: ['CSE', 'ECE', 'ME', 'CE', 'EEE'],
  year: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
  section: ['A', 'B', 'C', 'D'],
  semester: ['1','2','3','4','5','6','7','8'],
  assignment:['DS','M1','FLAT','JAVA'],
};

const UploadAssignmentScreen = () => {
  const navigation = useNavigation();

  const [course, setCourse] = useState('Course');
  const [department, setDepartment] = useState('Department');
  const [year, setYear] = useState('Year');
  const [section, setSection] = useState('Section');
  const [semester, setSemester] = useState('Semester');
  const [assignment, setAssignment] = useState('Assignment');

  const [modalVisible, setModalVisible] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState('');
  const [options, setOptions] = useState([]);

  const openDropdown = (type) => {
    setCurrentDropdown(type);
    setOptions(dropdownData[type]);
    setModalVisible(true);
  };

  const handleSelect = (value) => {
    switch (currentDropdown) {
      case 'course':
        setCourse(value);
        break;
      case 'department':
        setDepartment(value);
        break;
      case 'year':
        setYear(value);
        break;
      case 'section':
        setSection(value);
        break;
      case 'semester':
        setSemester(value);
        break;
      case 'assignment':
        setAssignment(value);
        break;
    }
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
      
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/backarrow.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Upload Assignments</Text>
          </View>
            {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter description"
              placeholderTextColor="#999"
            />

            {/* Dropdown Rows */}
            <View style={styles.row}>
              <TouchableOpacity style={styles.dropdown} onPress={() => openDropdown('course')}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{course}</Text>
                  <Image
                    source={require('../assets/downarrow.png')}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdown} onPress={() => openDropdown('department')}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{department}</Text>
                  <Image
                    source={require('../assets/downarrow.png')}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.dropdown} onPress={() => openDropdown('year')}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{year}</Text>
                  <Image
                    source={require('../assets/downarrow.png')}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdown} onPress={() => openDropdown('semester')}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{semester}</Text>
                  <Image
                    source={require('../assets/downarrow.png')}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.dropdown} onPress={() => openDropdown('section')}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{section}</Text>
                  <Image
                    source={require('../assets/downarrow.png')}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdown} onPress={() => openDropdown('assignment')}>
                <View style={styles.dropdownContent}>
                  <Text style={styles.dropdownText}>{assignment}</Text>
                  <Image
                    source={require('../assets/downarrow.png')}
                    style={styles.arrowIcon}
                  />
                </View>
              </TouchableOpacity>
            </View>

            {/* Upload media box */}
            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>Upload media</Text>
            </TouchableOpacity>

            {/* Upload button */}
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Upload</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Fixed Bottom Navbar */}
        <BottomNavbar />

        {/* Dropdown Modal */}
        <Modal visible={modalVisible} transparent animationType="fade">
          <TouchableOpacity
            style={styles.modalOverlay}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalBox}>
              <FlatList
                data={options}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => handleSelect(item)}
                  >
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default UploadAssignmentScreen;
const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: '#fff',
//   },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1C7988",
    padding: hp('2%'),
  },
  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#fff',
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    marginLeft: wp('18%'),
  },
  form: {
    padding: wp('6%'),
  },
  label: {
    fontSize: hp('2.1%'),
    fontWeight: '500',
    marginTop: hp('2%'),
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    fontSize: hp('2%'),
    marginTop: hp('1%'),
    color: '#000',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    width: '48%',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: hp('2%'),
    color: '#000',
  },
  uploadBox: {
    height: hp('20%'),
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#aaa',
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  uploadText: {
    color: '#888',
    fontSize: hp('2%'),
  },
  uploadButton: {
    backgroundColor: '#257D84',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: wp('10%'),
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: hp('2%'),
  },
  modalItem: {
    paddingVertical: hp('1.5%'),
  },
  modalItemText: {
    fontSize: hp('2.2%'),
    color: '#000',
  },
  dropdownContent: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
arrowIcon: {
  width: wp('5%'),
  height: wp('6%'),
  resizeMode: 'contain',
  marginLeft: wp('2%'),
},
safeContainer: {
  flex: 1,
  backgroundColor: '#fff',
},
container: {
  flex: 1,
},
scrollContainer: {
  paddingBottom: hp('5%'), // Ensures content doesn't get hidden under BottomNavbar
},


});


