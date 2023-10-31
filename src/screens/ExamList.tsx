import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../components/header/CustomHeader';
import colors from '../../colors';
import {useNavigation} from '@react-navigation/native';
import Category from './Category';
import {AnsweredQuizId} from '../atom/AnswerQuizID';
import {useAtom} from 'jotai';

const ExamList = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  // const [answeredQuizIds, setAnsweredQuizIds] = useAtom(AnsweredQuizId);
  // const [isComponentVisible, setComponentVisible] = useState(true);
  const handleDataFetch = () => {
    setIsLoading(false);
  };

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
          <Text style={styles.title}>All Exam</Text>
          <Text style={styles.subtitle}>12th MIPA 2</Text>
        </View>
      </View>
      <Category />
    </SafeAreaView>
  );
};

export default ExamList;

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
    width: '30%',
    padding: 10,
    marginHorizontal: 15,
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
    flex: 0.6,
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
