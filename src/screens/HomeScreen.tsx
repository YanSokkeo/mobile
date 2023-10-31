import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import CustomHeader from '../components/header/CustomHeader';
import colors from '../../colors';
import SearchBox from '../components/search/SearchBox';
import {ScrollView} from 'react-native';
import BannerImage from '../components/banner/BannerImage';
import Icon from 'react-native-vector-icons/Feather';
import TestList from '../components/dummy/TestList';
import ExamDone from '../components/exam/ExamDone';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{flex: 0.1}}>
          <CustomHeader
            iconleft="menu"
            iconfirstRight="mail"
            iconSecondRight="bell"
            IconColor={colors.deepBlue}
            iconColorSecond={colors.deepBlue}
          />
        </View>
        <SearchBox iconName="search" placeholder="Search exam test" />

        <View style={styles.textContainer1}>
          <Text style={styles.title}>Hi, Pramuditya</Text>
          <Text style={styles.subtitle}>Here your progress last week</Text>
        </View>

        <BannerImage />

        <View style={styles.textContainer1}>
          <Text style={styles.title}>Today Test</Text>
          <Text style={styles.subtitle}>Here is your test list for today</Text>
        </View>

        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.scrollViewContentContainer}>
          {TestList.map((item, index) => (
            <TouchableOpacity key={item.id}>
              <ImageBackground
                key={index}
                source={item.image}
                style={styles.scroll}>
                <View style={styles.centerAlign}>
                  <View style={styles.viewInsideImage}>
                    <Text numberOfLines={2} style={styles.textimg}>
                      {item.text}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Icon name="clock" size={20} color={colors.white} />
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.textContainer1}>
          <Text style={styles.title}>Last exam done</Text>
        </View>

        <View>
          <ExamDone
            image={require('../../assets/images/GroupDone.png')}
            title="Physics daily quiz"
            subtitle="45 Minutes"
            iconName="check"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.backgroundWhite,
  },
  textContainer1: {
    flex: 0.1,
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.deepBlue,
  },
  subtitle: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: colors.grey,
  },

  scroll: {
    width: 144,
    height: 160,
    backgroundColor: colors.brown,
    margin: 10,
  },
  centerAlign: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  viewInsideImage: {
    marginTop: 50,
    width: 124,
    height: 92,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: colors.deepBlue,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  textimg: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 5,
    color: colors.white,
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
  },
  scrollViewContentContainer: {
    alignItems: 'center',
  },
});
