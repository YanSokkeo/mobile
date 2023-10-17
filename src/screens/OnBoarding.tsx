import {SafeAreaView, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import colors from '../../colors';
import CustomButton from '../components/button/CustomButton';
import {useNavigation} from '@react-navigation/native';

const OnBoarding = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container_img}>
        <Image
          style={{
            width: '100%',
            backgroundColor: colors.deepBlue,
          }}
          source={require('../../assets/images/champion.png')}
        />
      </View>

      <View style={styles.text_container}>
        <Text style={styles.title}>Do your exam test and</Text>
        <Text style={styles.title1}>get the best score</Text>
        <Text style={styles.subtitle}>
          Study and get the highest score in your class,
        </Text>
        <Text style={styles.subtitle1}>the exam won't be this fun</Text>
      </View>

      <View style={styles.button}>
        <CustomButton
          onPress={() => navigation.navigate('tabNavigation')}
          text="Get Start"
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container_img: {
    flex: 0.6,
  },
  text_container: {
    flex: 0.3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    color: colors.deepBlue,
  },
  title1: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    color: colors.deepBlue,
  },
  subtitle: {
    paddingTop: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: colors.deepBlue,
  },
  subtitle1: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: colors.deepBlue,
  },
  button: {
    flex: 0.1,
    marginVertical: 10,
    flexDirection: 'row-reverse',
  },
});
