
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

const ScheduleScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Initialize months and years data
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

  // Generate days for the current month
  const generateDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];

    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({ id: `empty-${i}`, empty: true });
    }

    // Add actual days of the month
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
    setShowCalendar(false); // Hide calendar after selection
  };

  const changeMonth = (monthIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
    setShowMonthPicker(false);
    setShowCalendar(true); // Show calendar after month selection
  };

  const changeYear = (year) => {
    setCurrentDate(new Date(year, currentDate.getMonth(), 1));
    setShowYearPicker(false);
    setShowCalendar(true); // Show calendar after year selection
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  // Schedule data - would typically come from an API
  const scheduleData = [
    {
      id: '1',
      title: 'Data Structures',
      time: '9:00 AM - 10:00 AM',
      class: 'CSE 2nd-year'
    },
    {
      id: '2',
      title: 'Programming in C',
      time: '1:00 AM - 11:00 AM',
      class: 'MCA 1ST-year'
    },
    {
      id: '3',
      title: 'Algorithms',
      time: '11:00 AM - 12:00 AM',
      class: 'ECE 1ST-year'
    },
     {
      id: '4',
      title: 'Data Structures',
      time: '11:00 AM - 12:00 AM',
      class: 'MCA 2nd-year',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={require('../assets/backarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Schedule</Text>
        <View style={{ width: wp('6.4%') }} />
      </View>

      {/* Date Display with Calendar Toggle */}
      <TouchableOpacity 
        style={styles.dateDisplayContainer}
        onPress={toggleCalendar}
      >
        <Text style={styles.selectedDateText}>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>
        <Image 
          source={require('../assets/calendar.jpg')}
          style={styles.calendarIcon}
        />
      </TouchableOpacity>

      {/* Month/Year Selector - Only shown when calendar is visible */}
      {showCalendar && (
        <View style={styles.monthYearSelector}>
          <TouchableOpacity 
            style={styles.monthYearButton}
            onPress={() => setShowMonthPicker(!showMonthPicker)}
          >
            <Text style={styles.monthYearText}>
              {months[currentDate.getMonth()]?.name || ''}
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
      )}

      {/* Month Picker */}
      {showMonthPicker && (
        <View style={styles.pickerContainer}>
          <FlatList
            data={months}
            numColumns={3}
            keyExtractor={(item) => item.index.toString()}
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

      {/* Year Picker */}
      {showYearPicker && (
        <View style={styles.pickerContainer}>
          <FlatList
            data={years}
            numColumns={3}
            keyExtractor={(item) => item.toString()}
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

      {/* Calendar Grid - Only shown when calendar is visible */}
      {showCalendar && (
        <>
          {/* Day Names Header */}
          <View style={styles.dayNamesContainer}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <Text key={index} style={styles.dayNameText}>{day}</Text>
            ))}
          </View>

          {/* Calendar Days */}
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

      {/* Schedule List */}
      <ScrollView style={styles.scheduleContainer}>
        {scheduleData.map((item, index) => (
          <View key={item.id}>
            <View style={styles.scheduleCard}>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.timeText}>{item.time}</Text>
              <Text style={styles.courseInfo}>{item.class}</Text>
            </View>
            {index < scheduleData.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
      <BottomNavbar/>
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
    height: hp('3%'),
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

export default ScheduleScreen;