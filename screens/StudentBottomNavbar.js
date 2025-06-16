

import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StudentBottomNavbar = ({ activeTab }) => {
  const navigation = useNavigation();

  const tabs = [
    { id: 'Home', label: 'Home', icon: require('../assets/home-icon.png'), screen: 'StudentDashboard' },
    { id: 'Exams', label: 'Exams', icon: require('../assets/Exams.png'), screen: 'StudentExamsScreen' },
    { id: 'Notes', label: 'Notes', icon: require('../assets/Marks.png'), screen: 'StudentNotesAssignments' },
    { id: 'Profile', label: 'Profile', icon: require('../assets/profile-icon.png'), screen: 'StudentProfileScreen' },
  ];

  const handlePress = (tabId, screen) => {
    if (activeTab !== tabId) {
      navigation.navigate(screen);
    }
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => handlePress(tab.id, tab.screen)}
          >
            <Image
              source={tab.icon}
              style={[styles.icon, isActive && styles.activeIcon]}
              resizeMode="contain"
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    height: 70,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },
 
  label: {
    fontSize: 12,
    marginTop: 4,
    color: 'black',
  },
  activeLabel: {
    color: "#1C7988",
    fontWeight: '500',
  },
});

export default StudentBottomNavbar;

