import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OnBoarding from './src/screens/OnBoarding';
import HomeScreen from './src/screens/HomeScreen';
import CustomHeader from './src/components/header/CustomHeader';
import {SearchBar} from 'react-native-screens';
import SearchBox from './src/components/search/SearchBox';
import BannerImage from './src/components/banner/BannerImage';
import ExamDone from './src/components/exam/ExamDone';
import ExamList from './src/screens/ExamList';
import LeaderBoard from './src/screens/LeaderBoard';
import IconExam from './src/components/exam/IconExam';
import colors from './colors';
import HeaderBackground from './src/components/header/HeaderBackground';
import Question from './src/screens/Question';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import StackNavigator from './src/navigation/StackNavigator';
import TimerScreen from './src/screens/TimerScreen';
import CustomNextPreview from './src/components/button/CustomNextPreview';
import ModalList from './src/components/modal/ModalList';
import CustomButton from './src/components/button/CustomButton';
import Result from './src/screens/Result';
import Testing from './src/screens/Testing';
import Counter from './src/screens/counter';
import TestingSecond from './src/screens/TestingSecond';
import TestFetchQuestion from './src/screens/TestFetchQuestion';
import QuestionAnswerList from './src/screens/QuestionAnswerList';
import JoinData from './src/screens/JoinData';
import TestGrougBy from './src/screens/TestGrougBy';
import SecondQuestion from './src/screens/SecondQuestion';
import SecondGroupBy from './src/screens/SecondGroupBy';
import FromBing from './src/screens/FromBing';

const App = () => {
  return (
    // <StackNavigator />
    // <JoinData />
    // <SecondGroupBy />
    <FromBing />
    // <TestGrougBy />
    // <QuestionAnswerList />
    // <NavigationContainer>
    //   <Question />
    // </NavigationContainer>
    // <Result />
    // <Counter />
    // <Testing />
    // <TestingSecond />
    // <TestFetchQuestion />
  );
};

export default App;
