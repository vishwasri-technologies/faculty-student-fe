// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Image,
//   ScrollView,
//   FlatList,
//   Modal,
// } from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import { useNavigation } from '@react-navigation/native';
// import StudentBottomNavbar from './StudentBottomNavbar';

// const StudentScheduleScreen = () => {
//   const navigation = useNavigation();
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [months, setMonths] = useState([]);
//   const [years, setYears] = useState([]);
//   const [showMonthPicker, setShowMonthPicker] = useState(false);
//   const [showYearPicker, setShowYearPicker] = useState(false);
//   const [showCalendar, setShowCalendar] = useState(false);

//   // Full 7-day week array (Sun to Sat)
//   const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   const scheduleData = [
//     {
//       id: '1',
//       title: 'Data Structures',
//       time: '9:00 AM - 10:00 AM',
//       status: 'Absent',
//     },
//     {
//       id: '2',
//       title: 'Programming in C',
//       time: '10:00 AM - 11:00 AM',
//       status: 'Present',
//     },
//     {
//       id: '3',
//       title: 'Algorithms',
//       time: '11:00 AM - 12:00 PM',
//       status: 'Present',
//     },
//     {
//       id: '4',
//       title: 'Java Programming',
//       time: '12:00 PM - 01:00 PM',
//       status: 'Present',
//     },
//     {
//       id: '5',
//       title: 'Programming in C Lab',
//       time: '02:00 PM - 03:00 PM',
//       status: 'None',
//     },
//   ];

//   // Initialize months and years data
//   useEffect(() => {
//     const monthNames = ["January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"];
//     setMonths(monthNames.map((name, index) => ({ name, index })));

//     const yearList = [];
//     const currentYear = new Date().getFullYear();
//     for (let i = currentYear - 25; i <= currentYear + 25; i++) {
//       yearList.push(i);
//     }
//     setYears(yearList);
//   }, []);

//   // Generate days for the current month
//   const generateDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
//     const daysInMonth = new Date(year, month + 1, 0).getDate();
    
//     const days = [];

//     // Add empty slots for days before the 1st of the month
//     for (let i = 0; i < firstDayOfMonth; i++) {
//       days.push({ id: `empty-start-${i}`, empty: true });
//     }

//     // Add actual days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       const date = new Date(year, month, i);
//       days.push({
//         id: `${i}`,
//         date: i,
//         fullDate: date,
//         isSelected: date.toDateString() === selectedDate.toDateString(),
//       });
//     }

//     // Ensure the grid is complete by adding empty slots at the end
//     const totalSlots = days.length;
//     const remainingSlots = (7 - (totalSlots % 7)) % 7; // Fill up to the nearest multiple of 7
//     for (let i = 0; i < remainingSlots; i++) {
//       days.push({ id: `empty-end-${i}`, empty: true });
//     }

//     return days;
//   };

//   const days = generateDays();

//   const handleDateSelect = (date) => {
//     setSelectedDate(date);
//     setShowCalendar(false);
//     setCurrentDate(date);
//   };

//   const changeMonth = (monthIndex) => {
//     const newDate = new Date(currentDate.getFullYear(), monthIndex, 1); // Set to 1st of the month
//     setCurrentDate(newDate);
//     setShowMonthPicker(false);
//   };

//   const changeYear = (year) => {
//     const newDate = new Date(year, currentDate.getMonth(), 1); // Set to 1st of the month
//     setCurrentDate(newDate);
//     setShowYearPicker(false);
//   };

//   const toggleCalendar = () => {
//     setShowCalendar(!showCalendar);
//   };

//   const getDatesForStrip = () => {
//     const dates = [];
//     const base = new Date(selectedDate);
//     for (let i = -2; i <= 2; i++) {
//       const d = new Date(base);
//       d.setDate(base.getDate() + i);
//       dates.push(d);
//     }
//     return dates;
//   };

//   const formattedMonthYear = () => {
//     const monthNames = [
//       'January', 'February', 'March', 'April', 'May', 'June',
//       'July', 'August', 'September', 'October', 'November', 'December',
//     ];
//     return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image
//             source={require('../assets/backarrow.png')}
//             style={styles.backIcon}
//           />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Today's Schedule</Text>
//         <TouchableOpacity onPress={toggleCalendar}>
//           <Text style={styles.monthText}>{formattedMonthYear()}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Calendar Modal */}
//       <Modal
//         visible={showCalendar}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowCalendar(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.calendarContainer}>
//             {/* Calendar Header */}
//             <View style={styles.calendarHeader}>
//               <TouchableOpacity onPress={() => setShowYearPicker(true)}>
//                 <Text style={styles.calendarHeaderText}>{currentDate.getFullYear()}</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setShowMonthPicker(true)}>
//                 <Text style={styles.calendarHeaderText}>
//                   {months[currentDate.getMonth()]?.name || ''}
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Weekdays Row - Ensure all 7 days are displayed */}
//             <View style={styles.weekdaysContainer}>
//               {weekdays.map((day) => (
//                 <Text key={day} style={styles.weekdayText}>
//                   {day}
//                 </Text>
//               ))}
//             </View>

//             {/* Days Grid */}
//             <View style={styles.daysContainer}>
//               {days.map((day) => (
//                 <TouchableOpacity
//                   key={day.id}
//                   style={[
//                     styles.dayButton,
//                     day.isSelected && styles.selectedDayButton,
//                     day.empty && styles.emptyDay,
//                   ]}
//                   onPress={() => !day.empty && handleDateSelect(day.fullDate)}
//                   disabled={day.empty}
//                 >
//                   <Text
//                     style={[
//                       styles.dayText,
//                       day.isSelected && styles.selectedDayText,
//                     ]}
//                   >
//                     {day.empty ? '' : day.date}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>

//             {/* Close Button */}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowCalendar(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Month Picker Modal */}
//       <Modal
//         visible={showMonthPicker}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.pickerContainer}>
//             <FlatList
//               data={months}
//               keyExtractor={(item) => item.index.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.pickerItem}
//                   onPress={() => changeMonth(item.index)}
//                 >
//                   <Text style={styles.pickerItemText}>{item.name}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowMonthPicker(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Year Picker Modal */}
//       <Modal
//         visible={showYearPicker}
//         transparent={true}
//         animationType="slide"
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.pickerContainer}>
//             <FlatList
//               data={years}
//               keyExtractor={(item) => item.toString()}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   style={styles.pickerItem}
//                   onPress={() => changeYear(item)}
//                 >
//                   <Text style={styles.pickerItemText}>{item}</Text>
//                 </TouchableOpacity>
//               )}
//             />
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowYearPicker(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Horizontal Date Strip */}
//       <View style={styles.dateStrip}>
//         {getDatesForStrip().map((date, index) => {
//           const isSelected = date.toDateString() === selectedDate.toDateString();
//           return (
//             <TouchableOpacity
//               key={index}
//               onPress={() => handleDateSelect(date)}
//               style={[
//                 styles.dateBox,
//                 isSelected && styles.activeDateBox,
//               ]}
//             >
//               <Text style={[styles.dayText, isSelected && styles.activeText]}>
//                 {weekdays[date.getDay()]}
//               </Text>
//               <Text style={[styles.dateText, isSelected && styles.activeText]}>
//                 {date.getDate()}
//               </Text>
//             </TouchableOpacity>
//           );
//         })}
//       </View>

//       {/* Schedule Cards */}
//       <ScrollView style={styles.scheduleContainer}>
//         {scheduleData.map((item) => (
//           <View key={item.id} style={styles.card}>
//             <View style={styles.cardHeader}>
//               <Text style={styles.title}>{item.title}</Text>
//               {item.status !== 'None' && (
//                 <View
//                   style={[
//                     styles.statusBox,
//                     item.status === 'Present'
//                       ? styles.present
//                       : styles.absent,
//                   ]}
//                 >
//                   <Text
//                     style={[
//                       styles.statusText,
//                       item.status === 'Present'
//                         ? { color: 'green' }
//                         : { color: 'red' },
//                     ]}
//                   >
//                     {item.status}
//                   </Text>
//                 </View>
//               )}
//             </View>
//             <Text style={styles.time}>{item.time}</Text>
//           </View>
//         ))}
//       </ScrollView>

//       <StudentBottomNavbar />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#F8F8F8' },

//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#1C7988',
//     padding: hp('2%'),
//   },
//   backIcon: { width: wp('6%'), height: hp('3%') },
//   headerTitle: {
//     fontSize: hp('2.2%'),
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   monthText: {
//     color: 'white',
//     fontSize: hp('1.8%'),
//   },

//   // Calendar styles
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   calendarContainer: {
//     backgroundColor: 'white',
//     borderRadius: wp('4%'),
//     padding: hp('2%'),
//     width: wp('90%'),
//   },
//   calendarHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('2%'),
//   },
//   calendarHeaderText: {
//     fontSize: hp('2.5%'),
//     fontWeight: 'bold',
//     color: '#1C7988',
//   },
//   weekdaysContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: hp('1%'),
//   },
//   weekdayText: {
//     width: wp('12%'),
//     textAlign: 'center',
//     fontSize: hp('1.8%'),
//     fontWeight: 'bold',
//     color: '#666',
//   },
//   daysContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   dayButton: {
//     width: wp('12%'),
//     height: wp('12%'),
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: hp('0.5%'),
//   },
//   selectedDayButton: {
//     backgroundColor: '#1C7988',
//     borderRadius: wp('6%'),
//   },
//   emptyDay: {
//     backgroundColor: 'transparent',
//   },
//   dayText: {
//     fontSize: hp('2%'),
//     color: '#333',
//   },
//   selectedDayText: {
//     color: 'white',
//   },
//   closeButton: {
//     marginTop: hp('2%'),
//     padding: hp('1.5%'),
//     backgroundColor: '#1C7988',
//     borderRadius: wp('2%'),
//     alignItems: 'center',
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//   },

//   // Picker styles
//   pickerContainer: {
//     backgroundColor: 'white',
//     borderRadius: wp('4%'),
//     padding: hp('2%'),
//     width: wp('70%'),
//     maxHeight: hp('60%'),
//   },
//   pickerItem: {
//     padding: hp('1.5%'),
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   pickerItemText: {
//     fontSize: hp('2%'),
//     color: '#333',
//     textAlign: 'center',
//   },

//   // Existing styles
//   dateStrip: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
//     marginVertical: hp('1%'),
//     paddingVertical: hp('1%'),
//     marginHorizontal: wp('3%'),
//     borderRadius: wp('3%'),
//     elevation: 2,
//   },
//   dateBox: {
//     alignItems: 'center',
//     padding: wp('2.5%'),
//     borderRadius: wp('3%'),
//   },
//   activeDateBox: {
//     backgroundColor: '#1C7988',
//   },
//   dateText: {
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//     color: '#444',
//   },
//   activeText: {
//     color: 'white',
//   },
//   scheduleContainer: {
//     paddingHorizontal: wp('4%'),
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: wp('3%'),
//     padding: hp('2%'),
//     marginBottom: hp('1.2%'),
//     elevation: 1,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: hp('2%'),
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   time: {
//     fontSize: hp('1.8%'),
//     marginTop: hp('0.5%'),
//     color: '#666',
//   },
//   statusBox: {
//     borderRadius: wp('2%'),
//     borderWidth: 1,
//     paddingHorizontal: wp('2.5%'),
//     paddingVertical: hp('0.3%'),
//   },
//   statusText: {
//     fontSize: hp('1.6%'),
//     fontWeight: '600',
//   },
//   present: {
//     borderColor: 'green',
//   },
//   absent: {
//     borderColor: 'red',
//   },
// });

// export default StudentScheduleScreen;





import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
  Modal,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import StudentBottomNavbar from './StudentBottomNavbar';

const StudentScheduleScreen = () => {
  const navigation = useNavigation();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Full 7-day week array (Sun to Sat)
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const scheduleData = [
    {
      id: '1',
      title: 'Data Structures',
      time: '9:00 AM - 10:00 AM',
      status: 'Absent',
    },
    {
      id: '2',
      title: 'Programming in C',
      time: '10:00 AM - 11:00 AM',
      status: 'Present',
    },
    {
      id: '3',
      title: 'Algorithms',
      time: '11:00 AM - 12:00 PM',
      status: 'Present',
    },
    {
      id: '4',
      title: 'Java Programming',
      time: '12:00 PM - 01:00 PM',
      status: 'Present',
    },
    {
      id: '5',
      title: 'Programming in C Lab',
      time: '02:00 PM - 03:00 PM',
      status: 'None',
    },
  ];

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
    const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];

    // Add empty slots for days before the 1st of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ id: `empty-start-${i}`, empty: true });
    }

    // Add actual days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        id: `${i}`,
        date: i,
        fullDate: date,
        isSelected: date.toDateString() === selectedDate.toDateString(),
      });
    }

    // Ensure the grid is complete by adding empty slots at the end
    const totalSlots = days.length;
    const remainingSlots = (42 - totalSlots) > 0 ? (42 - totalSlots) : 0; // Always show 6 rows (42 cells)
    for (let i = 0; i < remainingSlots; i++) {
      days.push({ id: `empty-end-${i}`, empty: true });
    }

    return days;
  };

  const days = generateDays();

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    // Don't update currentDate here to keep viewing the same month
  };

  const changeMonth = (monthIndex) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    setCurrentDate(newDate);
    setShowMonthPicker(false);
  };

  const changeYear = (year) => {
    const newDate = new Date(year, currentDate.getMonth(), 1);
    setCurrentDate(newDate);
    setShowYearPicker(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const getDatesForStrip = () => {
    const dates = [];
    const base = new Date(selectedDate);
    for (let i = -2; i <= 2; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const formattedMonthYear = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/backarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Today's Schedule</Text>
        <TouchableOpacity onPress={toggleCalendar}>
          <Text style={styles.monthText}>{formattedMonthYear()}</Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Modal */}
      <Modal
        visible={showCalendar}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowCalendar(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.calendarContainer}>
            {/* Calendar Header */}
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => setShowYearPicker(true)}>
                <Text style={styles.calendarHeaderText}>{currentDate.getFullYear()}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowMonthPicker(true)}>
                <Text style={styles.calendarHeaderText}>
                  {months[currentDate.getMonth()]?.name || ''}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Weekdays Row - Ensure all 7 days are displayed */}
            <View style={styles.weekdaysContainer}>
              {weekdays.map((day) => (
                <View key={day} style={styles.weekdayCell}>
                  <Text style={styles.weekdayText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Days Grid */}
            <View style={styles.daysContainer}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day.id}
                  style={[
                    styles.dayButton,
                    day.isSelected && styles.selectedDayButton,
                    day.empty && styles.emptyDay,
                  ]}
                  onPress={() => !day.empty && handleDateSelect(day.fullDate)}
                  disabled={day.empty}
                >
                  <Text
                    style={[
                      styles.dayText,
                      day.isSelected && styles.selectedDayText,
                    ]}
                  >
                    {day.empty ? '' : day.date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowCalendar(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Month Picker Modal */}
      <Modal
        visible={showMonthPicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <FlatList
              data={months}
              keyExtractor={(item) => item.index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => changeMonth(item.index)}
                >
                  <Text style={styles.pickerItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowMonthPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Year Picker Modal */}
      <Modal
        visible={showYearPicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.pickerContainer}>
            <FlatList
              data={years}
              keyExtractor={(item) => item.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.pickerItem}
                  onPress={() => changeYear(item)}
                >
                  <Text style={styles.pickerItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowYearPicker(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Horizontal Date Strip */}
      <View style={styles.dateStrip}>
        {getDatesForStrip().map((date, index) => {
          const isSelected = date.toDateString() === selectedDate.toDateString();
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleDateSelect(date)}
              style={[
                styles.dateBox,
                isSelected && styles.activeDateBox,
              ]}
            >
              <Text style={[styles.dayText, isSelected && styles.activeText]}>
                {weekdays[date.getDay()]}
              </Text>
              <Text style={[styles.dateText, isSelected && styles.activeText]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Schedule Cards */}
      <ScrollView style={styles.scheduleContainer}>
        {scheduleData.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>{item.title}</Text>
              {item.status !== 'None' && (
                <View
                  style={[
                    styles.statusBox,
                    item.status === 'Present'
                      ? styles.present
                      : styles.absent,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      item.status === 'Present'
                        ? { color: 'green' }
                        : { color: 'red' },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              )}
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        ))}
      </ScrollView>

      <StudentBottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F8F8' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C7988',
    padding: hp('2%'),
  },
  backIcon: { width: wp('6%'), height: hp('3%') },
  headerTitle: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    color: 'white',
  },
  monthText: {
    color: 'white',
    fontSize: hp('1.8%'),
  },

  // Calendar styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderRadius: wp('4%'),
    padding: hp('2%'),
    width: wp('90%'),
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  calendarHeaderText: {
    fontSize: hp('2.5%'),
    fontWeight: 'bold',
    color: '#1C7988',
  },
  weekdaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  weekdayCell: {
    width: wp('12%'),
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: hp('1.8%'),
    fontWeight: 'bold',
    color: '#666',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayButton: {
    width: wp('12%'),
    height: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('0.5%'),
  },
  selectedDayButton: {
    backgroundColor: '#1C7988',
    borderRadius: wp('6%'),
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: hp('2%'),
    color: '#333',
  },
  selectedDayText: {
    color: 'white',
  },
  closeButton: {
    marginTop: hp('2%'),
    padding: hp('1.5%'),
    backgroundColor: '#1C7988',
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: hp('2%'),
    fontWeight: 'bold',
  },

  // Picker styles
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: wp('4%'),
    padding: hp('2%'),
    width: wp('70%'),
    maxHeight: hp('60%'),
  },
  pickerItem: {
    padding: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pickerItemText: {
    fontSize: hp('2%'),
    color: '#333',
    textAlign: 'center',
  },

  // Existing styles
  dateStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    marginVertical: hp('1%'),
    paddingVertical: hp('1%'),
    marginHorizontal: wp('3%'),
    borderRadius: wp('3%'),
    elevation: 2,
  },
  dateBox: {
    alignItems: 'center',
    padding: wp('2.5%'),
    borderRadius: wp('3%'),
  },
  activeDateBox: {
    backgroundColor: '#1C7988',
  },
  dateText: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#444',
  },
  activeText: {
    color: 'white',
  },
  scheduleContainer: {
    paddingHorizontal: wp('4%'),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: wp('3%'),
    padding: hp('2%'),
    marginBottom: hp('1.2%'),
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    fontSize: hp('1.8%'),
    marginTop: hp('0.5%'),
    color: '#666',
  },
  statusBox: {
    borderRadius: wp('2%'),
    borderWidth: 1,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.3%'),
  },
  statusText: {
    fontSize: hp('1.6%'),
    fontWeight: '600',
  },
  present: {
    borderColor: 'green',
  },
  absent: {
    borderColor: 'red',
  },
});

export default StudentScheduleScreen;