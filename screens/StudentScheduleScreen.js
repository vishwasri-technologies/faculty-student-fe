
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
import StudentBottomNavbar from './StudentBottomNavbar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const StudentScheduleScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    setMonths(monthNames.map((name, index) => ({ name, index })));

    const yearList = [];
    const currentYear = new Date().getFullYear();
    for (let i = currentYear - 25; i <= currentYear + 25; i++) {
      yearList.push(i);
    }
    setYears(yearList);
  }, []);

  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push({ id: `empty-${i}`, empty: true });
    }
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

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const changeMonth = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
    setShowCalendar(true);
  };

  const changeYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearPicker(false);
    setShowCalendar(true);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const scheduleData = [
    { id: '1', title: 'Data Structures', time: '9:00 AM - 10:00 AM', status: 'Absent' },
    { id: '2', title: 'Programming in C', time: '10:00 AM - 11:00 AM', status: 'Present' },
    { id: '3', title: 'Algorithms', time: '11:00 AM - 12:00 PM', status: 'Present' },
    { id: '4', title: 'Java Programming', time: '12:00 PM - 01:00 PM', status: 'Present' },
    { id: '5', title: 'Programming in C Lab', time: '02:00 PM - 03:00 PM', status: '' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/backarrow.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Schedule</Text>
        <View style={{ width: wp('6.4%') }} />
      </View>

      {/* Date Picker */}
      <TouchableOpacity style={styles.dateDisplayContainer} onPress={toggleCalendar}>
        <Text style={styles.selectedDateText}>
          {selectedDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <Image source={require('../assets/calendar.jpg')} style={styles.calendarIcon} />
      </TouchableOpacity>

      {/* Month/Year Toggle */}
      {showCalendar && (
        <View style={styles.monthYearSelector}>
          <TouchableOpacity style={styles.monthYearButton} onPress={() => setShowMonthPicker(!showMonthPicker)}>
            <Text style={styles.monthYearText}>
              {months[currentDate.getMonth()]?.name || ''}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.monthYearButton} onPress={() => setShowYearPicker(!showYearPicker)}>
            <Text style={styles.monthYearText}>{currentDate.getFullYear()}</Text>
          </TouchableOpacity>
        </View>
      )}

      {showMonthPicker && (
        <View style={styles.pickerContainer}>
          <FlatList
            data={months}
            numColumns={3}
            keyExtractor={(item) => item.index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.pickerItem} onPress={() => changeMonth(item.index)}>
                <Text style={[styles.pickerItemText, currentDate.getMonth() === item.index && styles.pickerItemSelected]}>
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
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.pickerItem} onPress={() => changeYear(item)}>
                <Text style={[styles.pickerItemText, currentDate.getFullYear() === item && styles.pickerItemSelected]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {/* Calendar */}
      {showCalendar && (
        <>
          <View style={styles.dayNamesContainer}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} style={styles.dayNameText}>{day}</Text>
            ))}
          </View>
          <View style={styles.calendarGrid}>
            {days.map((day) => (
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
                  <Text style={[styles.dateText, day.isSelected && styles.activeDateText]}>
                    {day.date}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {/* Schedule Cards */}
      <ScrollView style={styles.scheduleContainer}>
        {scheduleData.map((item, index) => (
          <View key={item.id} style={styles.scheduleCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              {item.status === 'Present' && (
                <View style={styles.presentBadge}><Text style={styles.presentText}>Present</Text></View>
              )}
              {item.status === 'Absent' && (
                <View style={styles.absentBadge}><Text style={styles.absentText}>Absent</Text></View>
              )}
            </View>
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>
      <StudentBottomNavbar />
    </SafeAreaView>
  );
};

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
    marginBottom: hp('1%'),
  },
  timeText: {
    fontSize: hp('1.8%'),
    color: '#666',
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
  presentBadge: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.3%'),
    alignSelf: 'center',
  },
  presentText: {
    fontSize: hp('1.5%'),
    color: 'green',
    fontWeight: 'bold',
  },
  absentBadge: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.3%'),
    alignSelf: 'center',
  },
  absentText: {
    fontSize: hp('1.5%'),
    color: 'red',
    fontWeight: 'bold',
  },
 
});

export default StudentScheduleScreen;
