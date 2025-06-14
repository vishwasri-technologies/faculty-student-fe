import React from 'react';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, Image, Dimensions, StatusBar,TouchableOpacity } from 'react-native';
import StudentBottomNavbar from './StudentBottomNavbar';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const screenWidth = Dimensions.get('window').width;

const AnnouncementCard = ({ title, subtitle, imageSource }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.subtitle}>{subtitle}</Text>
    <Image source={imageSource} style={styles.image} resizeMode="cover" />
  </View>
);

const StudentAnnouncements = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1C7988" barStyle="light-content" />
       <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/backarrow.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Announcements</Text>
          </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <AnnouncementCard
          title="College Music Festival 2025"
          subtitle="Get ready for a day full of music, fun, and excitement! Join us for live performances, singing, bands, and DJ shows."
          imageSource={require('../assets/music_festival.png')}
        />
        <AnnouncementCard
          title="SkillUp 2025: Learn, Build, Grow"
          subtitle="A practical workshop to help you grow your skills and prepare for your future career."
          imageSource={require('../assets/skillup_workshop.png')}
        />
      </ScrollView>
      <StudentBottomNavbar/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
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
    fontSize: hp('2.8%'),
    fontWeight: 'bold',
    marginLeft: wp('20%'),
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 19,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: screenWidth * 1.3,
    borderRadius: 10,
  },
});

export default StudentAnnouncements;
