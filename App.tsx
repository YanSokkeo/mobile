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
import Question from './src/testing/QuestionTest';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import StackNavigator from './src/navigation/StackNavigator';
import TimerScreen from './src/screens/TimerScreen';
import CustomNextPreview from './src/components/button/CustomNextPreview';
import ModalList from './src/components/modal/ModalList';
import CustomButton from './src/components/button/CustomButton';
import Result from './src/testing/ResultsScreen';
import Testing from './src/testing/Testing';
import Counter from './src/testing/counter';
import TestingSecond from './src/testing/TestingSecond';
import TestFetchQuestion from './src/testing/TestFetchQuestion';
import QuestionAnswerList from './src/testing/QuestionAnswerList';
import JoinData from './src/testing/JoinData';
import TestGrougBy from './src/testing/TestGrougBy';
import SecondQuestion from './src/testing/SecondQuestion';
import SecondGroupBy from './src/testing/SecondGroupBy';
import FromBing from './src/testing/QuestionFetch';
import TestApi from './src/testing/TestApi';
import TestCategory from './src/screens/Category';
import CustomAlert from './src/components/modal/CustomAlert ';
import TestCorrect from './src/screens/Question';
import FetchResult from './src/testing/FetchResult';
import KeyboardAvoidingComponent from './src/testing/KeyboardAvoidingComponent ';

const App = () => {
  return (
    <StackNavigator />
    // <KeyboardAvoidingComponent />
  );
};

export default App;
