
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const BottomNavbar = ({ activeTab, onTabPress }) => {
  const tabs = [
    { id: 'Home', icon: require('../assets/home-icon.png') },
    { id: 'Exams', icon: require('../assets/Exams.png') },
    { id: 'Marks', icon: require('../assets/Marks.png') },
    { id: 'profile', icon: require('../assets/profile-icon.png') },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tab,
            activeTab === tab.id && styles.activeTab,
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Image
            source={tab.icon}
            style={[
              styles.icon,
              activeTab === tab.id && styles.activeIcon,
            ]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
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
    paddingVertical: 10,
    height: 60,
  },
  tab: {
    padding: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#e3f2fd',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#757575',
  },
  activeIcon: {
    tintColor: '#2196f3',
  },
});

export default BottomNavbar;