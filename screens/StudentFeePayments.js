import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

const StudentFeePayments = () => {
  const navigation = useNavigation();
  const data = [
    { label: 'Total Fee', amount: '10,000' },
    { label: 'Paid Amount', amount: '7,000' },
    { label: 'Pending Amount', amount: '3,000' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
         <View style={styles.header}>
               <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                 <Image 
                   source={require('../assets/back-arrow.png')} // Assuming this is a dark/black arrow
                   style={styles.backArrowIcon} 
                 />
               </TouchableOpacity>
        <Text style={styles.title}>Fee & Payments</Text>
      </View>

      {/* Fee Cards */}
      <View style={styles.cardContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.amount}>₹{item.amount}</Text>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
    backArrowIcon: {
      width: wp(6),
      height: hp(3),
      resizeMode: 'contain',
      tintColor: '#333333',
    },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
    marginBottom: 20,
  },
  backButton: {
    width: 24,
    alignItems: 'flex-start',
    padding: wp(2),
  },
  backArrow: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#007B7F',
    textAlign: 'center',
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: width * 0.05,
    gap: 15,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: Platform.OS === 'ios' ? 0.08 : 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  label: {
    fontSize: width * 0.045,
    color: '#333',
  },
  amount: {
    fontSize: width * 0.045,
    fontWeight: '600',
    color: '#000',
  },
});

export default StudentFeePayments;