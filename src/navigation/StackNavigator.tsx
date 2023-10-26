import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../screens/OnBoarding';
import ExamList from '../screens/ExamList';
import LeaderBoard from '../screens/LeaderBoard';
import Question from '../screens/Question';
import TabNavigation from './TabNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Result from '../screens/Result';
import SecondQuestion from '../screens/SecondQuestion';
import TestFetchQuestion from '../screens/TestFetchQuestion';
import FromBing from '../screens/QuestionFetch';
import Hello from '../screens/FetchResult';
import QuestionFetch from '../screens/QuestionFetch';
import FetchResult from '../screens/FetchResult';
import TestCategory from '../screens/TestCategory';
import JavaScriptQuestion from '../screens/JavaScriptQuestion';
import TestCorrect from '../testing/TestCorrect';
import TestRe from '../testing/TestRe';

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="onboard" component={OnBoarding} />
        <Stack.Screen name="tabNavigation" component={TabNavigation} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="examlist" component={ExamList} />
        <Stack.Screen name="leaderboard" component={LeaderBoard} />
        <Stack.Screen name="question" component={Question} />
        <Stack.Screen name="secondQuestion" component={SecondQuestion} />
        <Stack.Screen name="fetchQuestion" component={TestFetchQuestion} />
        <Stack.Screen name="questionfetch" component={QuestionFetch} />
        <Stack.Screen name="testCategory" component={TestCategory} />
        <Stack.Screen name="jsQuestion" component={JavaScriptQuestion} />
        <Stack.Screen name="testCorrect" component={TestCorrect} />
        <Stack.Screen name="testRe" component={TestRe} />
        <Stack.Screen name="fetchResult" component={FetchResult} />
        <Stack.Screen name="result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
