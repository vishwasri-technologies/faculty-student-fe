
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StudentBottomNavbar from './StudentBottomNavbar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Dummy data for exam PDFs
const examsPdfData = [
  {
    id: 'exam1',
    name: 'EEE I-SEM Main',
    pdfUrl: 'https://www.example.com/path/to/eee-sem1-main-timetable.pdf',
  },
  {
    id: 'exam2',
    name: 'CSE I-SEM Backlog',
    pdfUrl: 'https://www.example.com/path/to/cse-sem1-backlog-timetable.pdf',
  },
];

// Marks data structure - ensure no duplicates
const marksData = [
  {
    id: 'semester_marks',
    name: 'Semester marks',
    type: 'navigation',
    navigateTo: 'StudentSemesterMarks',
  },
  {
    id: 'mid1',
    name: 'MID 1',
    type: 'accordion',
    details: [
      { subject: 'Data Structures', marks: '15/30' },
      { subject: 'Programming in C', marks: '15/30' },
      { subject: 'Algorithms', marks: '15/30' },
      { subject: 'Java Programming', marks: '15/30' },
      { subject: 'Programming in C Lab', marks: '15/30' },
    ],
  },
  {
    id: 'mid2',
    name: 'MID 2',
    type: 'accordion',
    details: [
      { subject: 'Data Structures', marks: '18/30' },
      { subject: 'Programming in C', marks: '17/30' },
      { subject: 'Algorithms', marks: '20/30' },
      { subject: 'Java Programming', marks: '16/30' },
      { subject: 'Programming in C Lab', marks: '19/30' },
    ],
  },
  {
    id: 'assignment1',
    name: 'Assignment 1',
    type: 'accordion',
    details: [
      { subject: 'Data Structures', marks: '18/30' },
      { subject: 'Programming in C', marks: '17/30' },
      { subject: 'Algorithms', marks: '20/30' },
      { subject: 'Java Programming', marks: '16/30' },
      { subject: 'Programming in C Lab', marks: '19/30' },
    ],
  },
  {
    id: 'assignment2',
    name: 'Assignment 2',
    type: 'accordion',
    details: [
      { subject: 'Data Structures', marks: '18/30' },
      { subject: 'Programming in C', marks: '17/30' },
      { subject: 'Algorithms', marks: '20/30' },
      { subject: 'Java Programming', marks: '16/30' },
      { subject: 'Programming in C Lab', marks: '19/30' },
    ],
  },
  
];

const AccordionItem = ({ item, expandedId, setExpandedId, navigation }) => {
  const isExpanded = expandedId === item.id;

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (item.type === 'navigation') {
      if (item.navigateTo) {
        navigation.navigate(item.navigateTo);
      } else {
        Alert.alert('Info', 'Navigation for this item is not yet configured.');
      }
    } else if (item.type === 'accordion') {
      setExpandedId(isExpanded ? null : item.id);
    }
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.itemCard}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Image
          source={
            item.type === 'navigation'
              ? require('../assets/arrow-right.png')
              : isExpanded
              ? require('../assets/arrow-up.png')
              : require('../assets/arrow-down.png')
          }
          style={styles.iconImage}
        />
      </TouchableOpacity>

      {isExpanded && item.details?.map((detail, index) => (
        <View key={`${item.id}-detail-${index}`} style={styles.detailItem}>
          <Text style={styles.detailSubject}>{detail.subject}</Text>
          <Text style={styles.detailMarks}>{detail.marks}</Text>
        </View>
      ))}
    </View>
  );
};

const StudentExamsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Exams');
  const [expandedId, setExpandedId] = useState(null);

  const handleViewPdf = async (pdfUrl, itemName) => {
    if (!pdfUrl) {
      Alert.alert('Not Available', `${itemName} PDF is not available at the moment.`);
      return;
    }
    try {
      const supported = await Linking.canOpenURL(pdfUrl);
      if (supported) {
        await Linking.openURL(pdfUrl);
      } else {
        Alert.alert('Error', `Cannot open PDF: ${pdfUrl}`);
      }
    } catch (error) {
      Alert.alert('Error', `Error opening PDF for ${itemName}`);
      console.error('Error opening PDF URL: ', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                 <Image
                   source={require('../assets/backarrow.png')}
                   style={styles.backIcon}
                 />
               </TouchableOpacity>
               <Text style={styles.headerTitle}>Exams</Text>
             </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Exams' && styles.activeTabButton]}
          onPress={() => setActiveTab('Exams')}
        >
          <Text style={[styles.tabText, activeTab === 'Exams' && styles.activeTabText]}>
            Exams
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Marks' && styles.activeTabButton]}
          onPress={() => setActiveTab('Marks')}
        >
          <Text style={[styles.tabText, activeTab === 'Marks' && styles.activeTabText]}>
            Marks
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.contentArea}>
        {activeTab === 'Exams' ? (
          <FlatList
            data={examsPdfData}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <TouchableOpacity onPress={() => handleViewPdf(item.pdfUrl, item.name)}>
                  <Text style={styles.viewPdfLink}>View PDF</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <FlatList
            data={marksData}
            renderItem={({ item }) => (
              <AccordionItem
                item={item}
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>

      <StudentBottomNavbar activeTab="Exams" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F4F7F9' },
   header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: hp('2%'),
    paddingBottom: hp('2%'),
    backgroundColor:'#1C7988',
  },
  backIcon: {
    width: wp('8%'),
    height: wp('8%'),
    resizeMode: 'contain',
  },
  headerTitle: {
    color: 'white',
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    marginLeft: wp('30%'),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    paddingBottom: hp(1),
    borderBottomWidth: 2.5,
    borderBottomColor: 'transparent',
    flex: 1,
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomColor: '#1C7988',
  },
  tabText: {
    fontSize: hp(2),
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#1C7988',
    fontWeight: 'bold',
  },
  contentArea: { flex: 1 },
  listContainer: {
    padding: wp(4),
    paddingBottom: hp(10),
  },
 itemCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: wp(2.5),
  paddingVertical: hp(2),
  paddingHorizontal: wp(4),
  marginBottom: 0, // or leave it out if accordionContainer already has it
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

  itemName: {
    fontSize: hp(2.1),
    color: '#333333',
    fontWeight: '500',
    flex: 1,
    marginRight: wp(2),
  },
  viewPdfLink: {
    fontSize: hp(1.8),
    color: '#1C7988',
    fontWeight: '600',
    textDecorationLine:"underline",
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: hp(5),
    fontSize: hp(1.9),
    color: '#888888',
  },
 accordionContainer: {
  backgroundColor: '#FFFFFF',
  borderRadius: wp(2.5),
  marginBottom: hp(1.5),
  elevation: 2,
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: wp(1),
  overflow: 'hidden',
},

  iconImage: {
    width: wp(4),
    height: wp(4),
    resizeMode: 'contain',
    tintColor: '#555',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(4),
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailSubject: {
    fontSize: hp(1.9),
    color: '#333333',
    flex: 1,
  },
  detailMarks: {
    fontSize: hp(1.9),
    color: '#333333',
    fontWeight: '500',
  },
});

export default StudentExamsScreen;