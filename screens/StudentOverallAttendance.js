
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import StudentBottomNavbar from './StudentBottomNavbar';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');
const circleSize = width * 0.3;

const subjectData = [
  { name: 'Data Structures', percentage: 20 },
  { name: 'Programming in C', percentage: 26 },
  { name: 'Algorithms', percentage: 85 },
  { name: 'Java Programming', percentage: 78 },
  { name: 'Programming in C Lab', percentage: 55 },
];

const StudentOverallAttendance = () => {
  const navigation = useNavigation();

  // Calculate overall attendance percentage as average of all subjects
  const calculateOverallAttendance = () => {
    const sum = subjectData.reduce((total, subject) => total + subject.percentage, 0);
    return Math.round(sum / subjectData.length);
  };

  const attendancePercentage = calculateOverallAttendance();

  // Function to determine color based on percentage
  const getColorByPercentage = (percentage) => {
    if (percentage >= 75) {
      return '#1C7988'; // Green for good attendance
    } else if (percentage >= 50) {
      return '#FFA500'; // Orange for moderate attendance
    } else {
      return '#FF0000'; // Red for poor attendance
    }
  };

  const renderProgressBar = (item) => {
    const fillColor = getColorByPercentage(item.percentage);
    return (
      <View style={styles.subjectContainer} key={item.name}>
        <Text style={styles.subjectName}>{item.name}</Text>
        <Text style={styles.subjectPercent}>{item.percentage}%</Text>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { 
                width: `${item.percentage}%`,
                backgroundColor: fillColor
              },
            ]}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/backarrow.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Overall Attendance</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Circular Progress */}
        <View style={styles.circleWrapper}>
          <View style={[styles.outerCircle, { borderColor: getColorByPercentage(attendancePercentage) }]}>
            <View style={styles.innerCircle}>
              <Text style={styles.attendanceText}>{attendancePercentage}%</Text>
              {/* <Text style={styles.averageText}>Overall Average</Text> */}
            </View>
          </View>
        </View>

        {/* Subject-wise Progress */}
        {subjectData.map((item) => renderProgressBar(item))}
      </ScrollView>
      <StudentBottomNavbar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.05,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1C7988",
    padding: hp('2%'),
  },
  backIcon: {
    width: wp('9%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
  headerTitle: {
    color: '#fff',
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    marginLeft: wp('18%'),
  },
  circleWrapper: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  outerCircle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    borderWidth: 10,
    borderColor: '#1C7988',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    width: circleSize * 0.7,
    height: circleSize * 0.7,
    borderRadius: (circleSize * 0.7) / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  attendanceText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  averageText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  subjectContainer: {
    marginBottom: 20,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  subjectPercent: {
    position: 'absolute',
    right: 0,
    top: 0,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
  },
});

export default StudentOverallAttendance;