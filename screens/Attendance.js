
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from './BottomNavbar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const AttendanceScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // New state for attendance flow
  const [scheduleData] = useState([
    { id: '1', title: 'Data Structures', time: '9:00 AM - 10:00 AM', class: 'CSE 2nd-year' },
    { id: '2', title: 'Programming in C', time: '10:00 AM - 11:00 AM', class: 'MCA 1st-year' },
    { id: '3', title: 'Algorithms', time: '11:00 AM - 12:00 AM', class: 'ECE 1st-year' },
    { id: '4', title: 'Operating Systems', time: '1:00 PM - 2:00 PM', class: 'CSE 3rd-year' },
  ]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Initialize months and years data
  useEffect(() => {
    const monthNames = [
      "January","February","March","April","May","June",
      "July","August","September","October","November","December"
    ];
    setMonths(monthNames.map((name, index) => ({ name, index })));
    const yearList = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 25; i <= currentYear + 25; i++) yearList.push(i);
    setYears(yearList);
  }, []);

  // Generate days for the current month
  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push({ id: `empty-${i}`, empty: true });
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        id: `${i}`,
        date: i,
        fullDate: date,
        isSelected: date.toDateString() === selectedDate.toDateString()
      });
    }
    return days;
  };
  const days = generateDays();

  // Calendar handlers
  const handleDateSelect = date => {
    setSelectedDate(date);
    setShowCalendar(false);
  };
  const changeMonth = idx => {
    setCurrentDate(new Date(currentDate.getFullYear(), idx, 1));
    setShowMonthPicker(false);
    setShowCalendar(true);
  };
  const changeYear = y => {
    setCurrentDate(new Date(y, currentDate.getMonth(), 1));
    setShowYearPicker(false);
    setShowCalendar(true);
  };
  const toggleCalendar = () => setShowCalendar(!showCalendar);

  // When schedule card tapped
  const openAttendanceFor = item => {
    setSelectedSchedule(item);
    // generate a temp student list
    const temp = [
      { id: '21442086252', name: 'Allary Hitesh' },
      { id: '21442086258', name: 'Allu Lokesh' },
      { id: '21442086250', name: 'Chadla Rajesh' },
      { id: '21442086266', name: 'Dhis Suresh' },
      { id: '21442086298', name: 'Edden Taneesh' },
      { id: '21442086268', name: 'Joss Umesh' },
    ];
    setStudents(temp);
    // default all to absent
    const att = {};
    temp.forEach(s => att[s.id] = 'Absent');
    setAttendance(att);
  };

  const mark = (studentId, status) => {
    setAttendance(att => ({ ...att, [studentId]: status }));
  };

  const submitAttendance = () => {
    console.log('Attendance for', selectedSchedule, attendance);
    // TODO: send to backend...
    // then reset:
    setSelectedSchedule(null);
    setStudents([]);
    setAttendance({});
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/backarrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mark Attendance</Text>
        <View style={{ width: wp('6.4%') }} />
      </View>

      {/* Date Display */}
      <TouchableOpacity style={styles.dateDisplayContainer} onPress={toggleCalendar}>
        <Text style={styles.selectedDateText}>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
          })}
        </Text>
        <Image source={require('../assets/calendar.jpg')} style={styles.calendarIcon} />
      </TouchableOpacity>

      {/* Month/Year pickers & calendar */}
      {showCalendar && (
        <>
          <View style={styles.monthYearSelector}>
            <TouchableOpacity
              style={styles.monthYearButton}
              onPress={() => setShowMonthPicker(!showMonthPicker)}
            >
              <Text style={styles.monthYearText}>
                {months[currentDate.getMonth()]?.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.monthYearButton}
              onPress={() => setShowYearPicker(!showYearPicker)}
            >
              <Text style={styles.monthYearText}>
                {currentDate.getFullYear()}
              </Text>
            </TouchableOpacity>
          </View>
          {showMonthPicker && (
            <View style={styles.pickerContainer}>
              <FlatList
                data={months}
                numColumns={3}
                keyExtractor={i => i.index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => changeMonth(item.index)}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      currentDate.getMonth() === item.index && styles.pickerItemSelected
                    ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          {showYearPicker && (
            <View style={styles.pickerContainer}>
              <FlatList
                data={years}
                numColumns={3}
                keyExtractor={i => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => changeYear(item)}
                  >
                    <Text style={[
                      styles.pickerItemText,
                      currentDate.getFullYear() === item && styles.pickerItemSelected
                    ]}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <View style={styles.dayNamesContainer}>
            {['S','M','T','W','T','F','S'].map((d,i) => (
              <Text key={i} style={styles.dayNameText}>{d}</Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {days.map(day => (
              <TouchableOpacity
                key={day.id}
                style={[
                  styles.dayContainer,
                  day.empty && styles.emptyDay,
                  day.isSelected && styles.activeDayContainer
                ]}
                onPress={() => !day.empty && handleDateSelect(day.fullDate)}
                disabled={day.empty}
              >
                {!day.empty && (
                  <Text style={[
                    styles.dateText,
                    day.isSelected && styles.activeDateText
                  ]}>
                    {day.date}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* IF a schedule is selected, show student list + submit */}
      {selectedSchedule ? (
        <View style={styles.attendanceContainer}>
          <Text style={styles.courseTitle}>
            {selectedSchedule.title} ({selectedSchedule.class})
          </Text>
          <FlatList  showsVerticalScrollIndicator={false} 
            data={students}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.studentRow}>
                <View>
                  <Text style={styles.studentName}>{item.name}</Text>
                  <Text style={styles.studentId}>{item.id}</Text>
                </View>
                <View style={styles.radioGroup}>
                  {['Present','Absent'].map(status => (
                    <TouchableOpacity
                      key={status}
                      style={styles.radioButton}
                      onPress={() => mark(item.id, status)}
                    >
                      <View style={[
                        styles.radioOuter,
                        attendance[item.id] === status && styles.radioSelectedOuter
                      ]}>
                        {attendance[item.id] === status && (
                          <View style={styles.radioInner} />
                        )}
                      </View>
                      <Text style={styles.radioLabel}>{status}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={submitAttendance}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // otherwise show schedule list
        <ScrollView style={styles.scheduleContainer}>
          {scheduleData.map((item, idx) => (
            <View key={item.id}>
              <TouchableOpacity
                style={styles.scheduleCard}
                onPress={() => openAttendanceFor(item)}
              >
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
                <Text style={styles.courseInfo}>{item.class}</Text>
              </TouchableOpacity>
              {idx < scheduleData.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </ScrollView>
      )}

      <BottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  attendanceContainer: {
    flex: 1,
    padding: hp('2%'),
    backgroundColor: '#f5f5f5',
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1%'),
    elevation: 2,
  },
  studentName: {
    fontSize: hp('2%'),
    fontWeight: '500',
    color: '#333',
  },
  studentId: {
    fontSize: hp('1.6%'),
    color: '#666',
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: wp('2%'),
  },
  radioOuter: {
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    borderWidth: 1.5,
    borderColor: '#1C7988',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelectedOuter: {
    borderColor: '#1C7988',
  },
  radioInner: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
    backgroundColor: '#1C7988',
  },
  radioLabel: {
    marginLeft: wp('1%'),
    fontSize: hp('1.8%'),
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#1C7988',
    paddingVertical: hp('1.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  submitText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },
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
  },
  dateDisplayContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp('2%'),
    backgroundColor: 'white',
    marginHorizontal: wp('4%'),
    marginTop: hp('1%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: wp('0.5%'),
    elevation: 2,
  },
  selectedDateText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#1C7988',
  },
  calendarIcon: {
    width: wp('8%'),
    height: hp('4%'),
  },
  monthYearSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp('1.2%'),
    backgroundColor: 'white',
    marginHorizontal: wp('4%'),
    marginTop: hp('1%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: wp('0.5%'),
    elevation: 2,
  },
  monthYearButton: {
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1%'),
    marginHorizontal: wp('1.2%'),
    borderRadius: wp('5%'),
    backgroundColor: '#f5f5f5',
  },
  monthYearText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#1C7988',
  },
  pickerContainer: {
    backgroundColor: 'white',
    padding: hp('1.2%'),
    marginHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: wp('0.5%') },
    shadowOpacity: 0.1,
    shadowRadius: wp('1%'),
    elevation: 2,
    position: 'absolute',
    top: hp('20%'),
    left: 0,
    right: 0,
    zIndex: 10,
  },
  pickerItem: {
    flex: 1,
    padding: hp('1.2%'),
    alignItems: 'center',
  },
  pickerItemText: {
    fontSize: hp('1.8%'),
    color: '#333',
  },
  pickerItemSelected: {
    fontWeight: 'bold',
    color: '#1C7988',
  },
  dayNamesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp('1.2%'),
    backgroundColor: 'white',
    marginHorizontal: wp('4%'),
  },
  dayNameText: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    color: '#666',
    width: wp('11.4%'),
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'white',
    paddingBottom: hp('1.2%'),
    marginHorizontal: wp('4%'),
    borderRadius: wp('2%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: wp('0.5%'),
    elevation: 2,
  },
  dayContainer: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1.5%'),
    aspectRatio: 1,
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  activeDayContainer: {
    backgroundColor: '#1C7988',
    borderRadius: wp('5%'),
  },
  dateText: {
    fontSize: hp('2%'),
    fontWeight: '500',
    color: '#333',
  },
  activeDateText: {
    color: 'white',
    fontWeight: 'bold',
  },
  scheduleContainer: {
    flex: 1,
    padding: hp('2%'),
  },
  scheduleCard: {
    backgroundColor: 'white',
    borderRadius: wp('2%'),
    padding: hp('2%'),
    marginBottom: hp('1%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: wp('0.5%'),
    elevation: 2,
  },
  courseTitle: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp('0.5%'),
  },
  timeText: {
    fontSize: hp('1.8%'),
    color: '#666',
    marginBottom: hp('0.5%'),
  },
  courseInfo: {
    fontSize: hp('1.8%'),
    color: '#666',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: hp('1%'),
  },
});

export default AttendanceScreen;
