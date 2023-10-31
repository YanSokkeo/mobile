import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import React from 'react';
import CustomHeader from '../components/header/CustomHeader';
import colors from '../../colors';
import ExamDone from '../components/exam/ExamDone';
import BigExamDone from '../components/exam/BigExamDone';
import AllExam from '../components/dummy/AllExam';
import IconExam from '../components/exam/IconExam';
import LeaderBoardData from '../components/dummy/LeaderBoardData';

const LeaderBoard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <CustomHeader
          iconleft="menu"
          iconfirstRight="mail"
          iconSecondRight="bell"
          IconColor={colors.white}
          iconColorSecond={colors.white}
        />
        <View style={styles.textContaniner}>
          <Text style={styles.title}>Leaderboard</Text>
          <Text style={styles.subtitle}>12th MIPA 2</Text>
        </View>
      </View>

      <View style={styles.controllView}>
        <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
          {LeaderBoardData.map((item, index) => (
            <View style={styles.examContainer} key={index}>
              <IconExam
                number={item.number}
                image={item.image}
                title={item.name}
                score={item.score}
                color={item.IconColors}
                iconName={item.icon}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.backgroundWhite,
  },
  head: {
    flex: 0.22,
    backgroundColor: colors.deepBlue,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    // paddingBottom: 10,
  },
  title: {
    color: colors.white,
    textAlign: 'left',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  title2: {
    color: colors.deepBlue,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
  subtitle: {
    color: colors.white,
    textAlign: 'left',
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
  textContaniner: {
    width: '35%',
    padding: 10,
    marginHorizontal: 10,
  },
  top: {
    // position: 'absolute',
    // top: 120,
    // left: 0,
    // right: 0,
    height: 110,
    marginTop: -40,
    // backgroundColor: colors.gold,
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    padding: 10,
  },
  examContainer: {
    marginBottom: 20,
  },

  controllView: {
    flex: 0.79,
    marginTop: -30,
  },
  textcontainer: {
    width: 150,
    padding: 10,
    margin: 10,
  },

  controllBottom: {
    flex: 0.19,
  },
});
