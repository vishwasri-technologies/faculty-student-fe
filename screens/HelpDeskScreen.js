import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Linking, StyleSheet, ScrollView,Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';


const HelpDeskScreen = () => {
    const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
     <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/blackbackarrow.png')} // Update path if needed
          style={styles.backArrow}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <Text style={styles.title}>Help desk</Text>
    </View>

      <Text style={styles.infoText}>
        Raise a support ticket for any issues or queries you may have. Please feel free to contact us using the information
      </Text>

      {/* Form */}
      <Text style={styles.sectionTitle}>Raise a support ticket</Text>

      <Text style={styles.label}>Issue about?</Text>
      <TextInput style={styles.input} placeholder="Issues about....." placeholderTextColor="#999" />

      <Text style={styles.label}>Subject</Text>
      <TextInput style={styles.input} placeholder="Enter the subject" placeholderTextColor="#999" />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe the issue"
        multiline
        numberOfLines={5}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      {/* Contact Us */}
      <Text style={styles.contactTitle}>Contact Us</Text>

      <Text style={styles.contactLabel}>📧 Email Support</Text>
      <Text style={styles.contactLink} onPress={() => Linking.openURL('mailto:camphavens@gmail.com')}>
        camphavens@gmail.com
      </Text>

      <Text style={styles.contactLabel}>🌐 Website</Text>
      <Text style={styles.contactLink} onPress={() => Linking.openURL('https://www.camphavens.net')}>
        www.camphavens.net
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  title: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#007B7F',
    marginLeft: wp('2%'),
  },
  infoText: {
    fontSize: wp('4%'),
    marginBottom: hp('2%'),
    color: '#333',
    lineHeight:hp('2.5'),
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: wp('4.8%'),
    marginBottom: hp('1%'),
  },
  label: {
    fontSize: wp('4%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('0.5%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1.2%'),
    fontSize: wp('3.8%'),
    backgroundColor: '#fff',
  },
  textArea: {
    height: hp('15%'),
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007B7F',
    paddingVertical: hp('1.8%'),
    borderRadius: wp('2%'),
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  contactTitle: {
    fontWeight: 'bold',
    fontSize: wp('4.8%'),
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
  },
  contactLabel: {
    fontSize: wp('4.2%'),
    marginTop: hp('1%'),
    lineHeight:hp('5'),
  },
  contactLink: {
    fontSize: wp('4%'),
    color: '#4169e1',
    textDecorationLine: 'underline',
  },
  backArrow: {
  width: wp('7%'),
  height: wp('8%'),
  marginRight: wp('25%'),
},

});

export default HelpDeskScreen;
