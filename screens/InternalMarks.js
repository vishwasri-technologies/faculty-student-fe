
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomNavbar from './BottomNavbar';
import { useNavigation } from '@react-navigation/native';

const InternalMarksScreen = () => {
  const navigation = useNavigation();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [studentMarks, setStudentMarks] = useState([]);
  const [outOfMarks, setOutOfMarks] = useState('30');

  const subjects = [
    { title: 'Data Structures', subtitle: 'CSE 2nd-year' },
    { title: 'Programming in C', subtitle: 'MCA 1ST-year' },
    { title: 'Algorithms', subtitle: 'ECE 1ST-year' },
    { title: 'Data Structures', subtitle: 'MCA 2ST-year' },
  ];

  const defaultStudents = [
    { name: 'Allary Hitesh', id: '214420862852', marks: '15' },
    { name: 'Allu Lokesh', id: '214420862658', marks: '15' },
    { name: 'Chadla Rajesh', id: '214420862150', marks: '15' },
    { name: 'Dhis Suresh', id: '214420862066', marks: '15' },
    { name: 'Edden Taneesh', id: '214420862058', marks: '15' },
    { name: 'Joss Umesh', id: '214420862068', marks: '15' },
  ];

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setStudentMarks([...defaultStudents]);
    setEditMode(false);
    setOutOfMarks('30');
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleMarkChange = (id, newMark) => {
    const updatedMarks = studentMarks.map((student) =>
      student.id === id ? { ...student, marks: newMark } : student
    );
    setStudentMarks(updatedMarks);
  };

  const handleSubmit = () => {
    console.log('Submitted Marks:', studentMarks);
    console.log('Out of Marks:', outOfMarks);
    setEditMode(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/blackbackarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Internal Marks</Text>
      </View>

      {!selectedSubject ? (
        <ScrollView contentContainerStyle={styles.cardContainer} showsVerticalScrollIndicator = {false} >
          {subjects.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => handleSubjectSelect(item)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.subjectHeader}>
            <View>
              <Text style={styles.cardTitle}>{selectedSubject.title}</Text>
              <Text style={styles.cardSubtitle}>{selectedSubject.subtitle}</Text>
            </View>
            <View style={styles.dropdown}><Text>Internal ▾</Text></View>
          </View>

          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Student List</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
                <Text>{editMode ? 'Cancel' : 'Edit'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={{ color: '#fff' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Editable Out Of Marks */}
          <View style={styles.outOfMarksContainer}>
            <Text style={styles.outOfMarksLabel}>Out of Marks: </Text>
            {editMode ? (
              <TextInput
                style={styles.outOfMarksInput}
                keyboardType="numeric"
                value={outOfMarks}
                onChangeText={setOutOfMarks}
              />
            ) : (
              <Text style={styles.outOfMarksText}>{outOfMarks}</Text>
            )}
          </View>

 <FlatList showsVerticalScrollIndicator={false} 
            data={studentMarks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.studentCard}>
                <View>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.studentId}>{item.id}</Text>
                </View>
                {editMode ? (
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={item.marks}
                    onChangeText={(text) => handleMarkChange(item.id, text)}
                  />
                ) : (
                  <Text style={styles.studentMarks}>{item.marks} / {outOfMarks}</Text>
                )}
              </View>
            )}
          />
        </View>
      )}
<BottomNavbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('4%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  backIcon: {
    width: wp('8%'),
    height: wp('7%'),
    resizeMode: 'contain',
    marginRight: wp('4%'),
  },
  headerText: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#007b8f',
    marginLeft: wp('18%'),
  },
  cardContainer: {
    paddingBottom: hp('2%'),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    padding: wp('4%'),
    marginBottom: hp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('0.5%'),
  },
  cardSubtitle: {
    fontSize: wp('4%'),
    color: '#555',
  },
  subjectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: wp('4%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: hp('2%'),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('1.5%'),
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('2%'),
    justifyContent: 'center',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  listTitle: {
    fontSize: wp('4.5%'),
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#007b8f',
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('1.5%'),
  },
  submitButton: {
    backgroundColor: '#007b8f',
    paddingVertical: hp('0.8%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('1.5%'),
  },
  outOfMarksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  outOfMarksLabel: {
    fontSize: wp('4%'),
    fontWeight: '600',
    marginRight: wp('2%'),
  },
  outOfMarksInput: {
    borderWidth: 1,
    borderColor: '#007b8f',
    borderRadius: wp('1%'),
    width: wp('18%'),
    textAlign: 'center',
    paddingVertical: hp('0.5%'),
  },
  outOfMarksText: {
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  studentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('1.5%'),
    padding: wp('4%'),
    marginBottom: hp('1%'),
  },
  studentName: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  studentId: {
    fontSize: wp('3.5%'),
    color: '#555',
  },
  studentMarks: {
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#007b8f',
    borderRadius: wp('1%'),
    width: wp('15%'),
    textAlign: 'center',
    paddingVertical: hp('0.5%'),
  },
});

export default InternalMarksScreen;



