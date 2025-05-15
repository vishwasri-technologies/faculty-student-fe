
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
} from 'react-native';

import BottomNavbar from './BottomNavbar';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabPress = (tabId) => {
    setActiveTab(tabId);
  };

  const categories = [
    { 
      id: 1, 
      name: "Today's     Schedule", 
      icon: 'schedule',
      bgColor: '#DDFFF7',
      image: require('../assets/Home-1.png')
    },
    { 
      id: 2, 
      name: 'Student Attendance', 
      icon: 'group',
      bgColor: '#D5DEFF',
      image: require('../assets/Home-2.png')
    },
    { 
      id: 3, 
      name: 'Academic Calendar', 
      icon: 'calendar-today',
      bgColor: '#EDD6FB',
      image: require('../assets/Home-3.png')
    },
    { 
      id: 4, 
      name: 'Notes & Assignments', 
      icon: 'assignment',
      bgColor: '#FFD8E4',
      image: require('../assets/Home-4.png')
    },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.hamburger}>
        <Image 
          source={require('../assets/Hamburger.png')} 
          style={styles.hamburgerImage}
        />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <Image 
            source={require('../assets/profile.png')}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.name}>Dr. Emily Carter</Text>
            <Text style={styles.qualification}>Ph.D. in Education</Text>
            <Text style={styles.experience}>10+ years in higher education</Text>
          </View>
        </View>

        <View style={styles.categoriesContainer}>
          {categories.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryItem, {backgroundColor: category.bgColor}]}
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
            <TouchableOpacity>
              <Text style={styles.viewMore}>View more</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={require('../assets/music-festival.png')}
            style={styles.announcementImage}
            resizeMode="cover"
          />
        </View>
      </ScrollView>

      <BottomNavbar />
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
    top: 30,
    left: 20,
    zIndex: 10,
  },
  hamburgerImage:{
    height:16,
    width:20,
  },
  content: {
    padding: 20,
    paddingTop: 70,
    paddingBottom: 100,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: '#1C7988CC',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  qualification: {
    fontSize: 14,
    color: 'white',
    marginBottom: 5,
  },
  experience: {
    fontSize: 14,
    color: 'white',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  categoryItem: {
    width: '48%',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  categoryImageContainer: {
    height: 80,
    margin: -15,
    marginBottom: 10,
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
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    alignItems: 'center',
    marginLeft: 30,
  },


  announcementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  padding:15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

  },
  announcementTextContainer: {
    flex: 1,
    paddingRight: 10,

  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft:10,
  },
  eventTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C7988',
    marginBottom: 6,
  },
  eventDescription: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
  },
  viewMore: {
    fontSize: 14,
    color: '#1C7988',
   
   
  },
  announcementImage: {
    width: 100,
    height: 80,
    borderRadius: 8,

  },
});

export default FacultyDashboard;
