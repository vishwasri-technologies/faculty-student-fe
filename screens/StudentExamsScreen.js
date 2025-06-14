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
    UIManager 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StudentBottomNavbar from './StudentBottomNavbar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// Dummy data for exam PDFs
const examsPdfData = [
  { id: 'exam1', name: 'EEE I-SEM Main', pdfUrl: 'https://www.example.com/path/to/eee-sem1-main-timetable.pdf' },
  { id: 'exam2', name: 'CSE I-SEM Backlog', pdfUrl: 'https://www.example.com/path/to/cse-sem1-backlog-timetable.pdf' },
];

// Marks data structure
const marksData = [
  { 
    id: 'external_marks', 
    name: 'External marks', 
    type: 'navigation',
    navigateTo: 'StudentExternalMarksScreen',
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
    ] 
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
    ] 
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
        Alert.alert("Info", "Navigation for this item is not yet configured.");
      }
    } else if (item.type === 'accordion') {
      setExpandedId(isExpanded ? null : item.id);
    }
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity onPress={handlePress} style={styles.itemCard}>
        <Text style={styles.itemName}>{item.name}</Text>
        {item.type === 'navigation' && <Text style={styles.iconStyle}>&gt;</Text>}
        {item.type === 'accordion' && <Text style={styles.iconStyle}>{isExpanded ? 'ʌ' : 'v'}</Text>}
      </TouchableOpacity>
      
      {isExpanded && item.type === 'accordion' && item.details && (
        <View style={styles.accordionContent}>
          {item.details.map((detail, index) => (
            <View key={index} style={styles.detailItem}>
              <Text style={styles.detailSubject}>{detail.subject}</Text>
              <Text style={styles.detailMarks}>{detail.marks}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const StudentExamsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Marks'); // Default to Marks tab as shown in image
  const [expandedId, setExpandedId] = useState('mid1'); // MID 1 expanded by default

  const handleViewPdf = async (pdfUrl, itemName) => {
    if (!pdfUrl) {
      Alert.alert("Not Available", `${itemName} PDF is not available at the moment.`);
      return;
    }
    try {
      const supported = await Linking.canOpenURL(pdfUrl);
      if (supported) {
        await Linking.openURL(pdfUrl);
      } else {
        Alert.alert("Error", `Cannot open PDF. No application available to open this file type or URL is invalid for: ${pdfUrl}`);
      }
    } catch (error) {
      Alert.alert("Error", `An error occurred while trying to open the PDF for ${itemName}.`);
      console.error("Error opening PDF URL: ", error);
    }
  };

  const renderExamItem = ({ item }) => (
    <View style={styles.itemCard}>
      <Text style={styles.itemName}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleViewPdf(item.pdfUrl, item.name)}>
        <Text style={styles.viewPdfLink}>View PDF</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/backarrow.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Exams</Text>
          </View>

      {/* Tab Navigator */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Exams' && styles.activeTabButton]}
          onPress={() => setActiveTab('Exams')}
        >
          <Text style={[styles.tabText, activeTab === 'Exams' && styles.activeTabText]}>Exams</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Marks' && styles.activeTabButton]}
          onPress={() => setActiveTab('Marks')}
        >
          <Text style={[styles.tabText, activeTab === 'Marks' && styles.activeTabText]}>Marks</Text>
        </TouchableOpacity>
      </View>

      {/* Content Area based on Active Tab */}
      <View style={styles.contentArea}>
        {activeTab === 'Exams' && (
          <FlatList
            data={examsPdfData}
            renderItem={renderExamItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<Text style={styles.emptyListText}>No exam schedules available.</Text>}
          />
        )}
        {activeTab === 'Marks' && (
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
            ListEmptyComponent={<Text style={styles.emptyListText}>No marks information available.</Text>}
          />
        )}
      </View>
<StudentBottomNavbar activeTab="Exams" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F9',
  },
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
    marginLeft: wp('32%'),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
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
  contentArea: {
    flex: 1,
  },
  listContainer: {
    padding: wp(4),
    paddingBottom: hp(10),
  },
  itemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: wp(2.5),
    paddingVertical: hp(2.2),
    paddingHorizontal: wp(4),
    marginBottom: hp(1.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
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
  iconStyle: {
    fontSize: hp(2.5),
    color: '#555555',
    fontWeight: 'bold',
  },
  accordionContent: {
    paddingHorizontal: wp(4),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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