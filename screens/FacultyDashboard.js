

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavbar from './BottomNavbar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const navigation = useNavigation();

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  const categories = [
    {
      id: 1,
      name: "Today's Schedule",
      image: require('../assets/Home-1.png'),
      bgColor: '#DDFFF7',
      screenName: 'ScheduleScreen',
    },
    {
      id: 2,
      name: 'Student Attendance',
      image: require('../assets/Home-2.png'),
      bgColor: '#D5DEFF',
      screenName: 'AttendanceScreen',
    },
    {
      id: 3,
      name: 'Academic Calendar',
      image: require('../assets/Home-3.png'),
      bgColor: '#EDD6FB',
      screenName: 'CalendarScreen',
    },
    {
      id: 4,
      name: 'Notes & Assignments',
      image: require('../assets/Home-4.png'),
      bgColor: '#FFD8E4',
      screenName: 'NotesAssignmentsScreen',
    },
  ];

  const handleCategoryPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const sidebarItems = [
  { label: 'Help Desk', route: 'HelpDeskScreen' },
  { label: 'About College', route: '' },
  { label: 'Reset Password', route: 'ForgotScreen' },
];


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.hamburger} onPress={() => setIsSidebarVisible(true)}>
        <Image source={require('../assets/Hamburger.png')} style={styles.hamburgerImage} />
      </TouchableOpacity>

      {/* Sidebar Modal */}
      <Modal
        visible={isSidebarVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsSidebarVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setIsSidebarVisible(false)}>
          <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => setIsSidebarVisible(false)}>
              <Image
                source={require('../assets/back-arrow.png')}
                style={styles.backArrow}
              />
            </TouchableOpacity>

            {sidebarItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.sidebarItem} onPress={() => navigation.navigate(item.route)}>
                <Text style={styles.sidebarItemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setIsLogoutModalVisible(true)}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={isLogoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.logoutModal}>
            <Text style={styles.logoutPrompt}>Are you sure you want to log out?</Text>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => {
                setIsLogoutModalVisible(false);
                setIsSidebarVisible(false);
                navigation.navigate('LoginScreen'); 
              }}
            >
              <Text style={styles.logoutButtonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsLogoutModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator = {false} >
        <View style={styles.profileSection}>
          <Image
            source={require('../assets/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Name: Dr. Emily Carter</Text>
            <Text style={styles.qualification}>Qualification: Ph.D. in Education</Text>
            <Text style={styles.experience}>Experience: 10+ years in higher education</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[styles.categoryItem, { backgroundColor: category.bgColor }]}
              onPress={() => handleCategoryPress(category.screenName)}
            >
              <View style={styles.categoryImageContainer}>
                <Image
                  source={category.image}
                  style={styles.categoryImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.categoryContent}>
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.announcementTextContainer}>
          <Text style={styles.cardTitle}>Announcements</Text>
        </View>
        <View style={styles.announcementCard}>
          <View style={styles.announcementTextContainer}>
            <Text style={styles.eventTitle}>College Music Festival 2025</Text>
            <Text style={styles.eventDescription}>
              Get ready for a day full of music, fun, and excitement! Join us for live performances, singing, bands, and DJ shows.
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../assets/music-festival.png')}
              style={styles.announcementImage}
              resizeMode="cover"
            />
            <TouchableOpacity
              onPress={() => navigation.navigate('AnnouncementsScreen')}
              style={{ marginTop: hp(1) }}
            >
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <BottomNavbar activeTab="Home" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  hamburger: {
    position: 'absolute',
    top: hp(4),
    left: wp(5),
    zIndex: 10,
  },
  hamburgerImage: {
    height: hp(2.6),
    width: wp(5.5),
  },
  overlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#00000040',
  },
  sidebar: {
    width: wp(70),
    height: '100%',
    backgroundColor: 'white',
    padding: wp(6),
    elevation: 5,
  },
  backArrow: {
    width: wp(2),
    height: hp(2.5),
    marginBottom: hp(3),
    paddingLeft: wp('7'),
  },
  sidebarItem: {
    marginBottom: hp(3.5),
  },
  sidebarItemText: {
    fontSize: hp(2),
    color: '#000',
  },
  logoutText: {
    fontSize: hp(2),
    color: 'gray',
    marginTop: hp(2),
  },
  content: {
    padding: wp(5),
    paddingTop: hp(9),
    paddingBottom: hp(2),
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(3),
    backgroundColor: '#1C7988CC',
    padding: wp(5),
    borderRadius: wp(3),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
  },
  profileImage: {
    width: wp(20),
    height: wp(20),
    borderRadius: wp(10),
    marginRight: wp(5),
    borderWidth: wp(0.5),
    borderColor: '#e0e0e0',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    marginBottom: hp(0.6),
    color: 'white',
  },
  qualification: {
    fontSize: hp(1.7),
    color: 'white',
    marginBottom: hp(0.6),
  },
  experience: {
    fontSize: hp(1.7),
    color: 'white',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp(3),
  },
  categoryItem: {
    width: '48%',
    borderRadius: wp(2.5),
    padding: wp(3.5),
    marginBottom: hp(2),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    overflow: 'hidden',
  },
  categoryImageContainer: {
    height: hp(10),
    margin: wp(-3.5),
    marginBottom: hp(1.2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: '80%',
    height: '80%',
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: hp(2),
    color: '#333',
    fontWeight: '500',
    marginLeft: wp(9),
  },
  announcementCard: {
    backgroundColor: 'white',
    borderRadius: wp(3),
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: wp(3.5),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: wp(1),
    marginBottom: hp(2),
  },
  announcementTextContainer: {
    flex: 1,
    paddingRight: wp(2.5),
  },
  cardTitle: {
    fontSize: hp(2.4),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: hp(1.2),
    marginLeft: wp(2.5),
  },
  eventTitle: {
    fontSize: hp(2),
    fontWeight: '600',
    color: '#1C7988',
    marginBottom: hp(0.7),
  },
  eventDescription: {
    fontSize: hp(2),
    color: '#555',
    lineHeight: hp(2.2),
  },
  viewMore: {
    fontSize: hp(2),
    color: '#1C7988',
    marginRight:wp(7),
    textDecorationLine:"underline",
  },
  announcementImage: {
    width: wp(29),
    height: hp(11),
   borderRadius:wp(1),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutModal: {
    backgroundColor: 'white',
    width: wp(70),
    borderRadius: wp(3),
    padding: wp(5),
    alignItems: 'center',
  },
  logoutPrompt: {
    fontSize: hp(2),
    textAlign: 'center',
    marginBottom: hp(2.5),
    color: '#000',
  },
  logoutButton: {
    backgroundColor: '#1C7988',
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(10),
    borderRadius: wp(2),
    marginBottom: hp(1.5),
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
  cancelText: {
    color: '#000',
    fontSize: hp(2),
  },
});

export default FacultyDashboard;




