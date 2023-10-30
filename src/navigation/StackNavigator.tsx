import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoarding from '../screens/OnBoarding';
import ExamList from '../screens/ExamList';
import LeaderBoard from '../screens/LeaderBoard';
import TabNavigation from './TabNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Category from '../screens/Category';
import Question from '../screens/Question';
import Result from '../screens/Result';

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
        <Stack.Screen name="Category" component={Category} />
        <Stack.Screen name="question" component={Question} />
        <Stack.Screen name="result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
