import {StyleSheet, Text, View, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import colors from '../../colors';
import ExamList from '../screens/ExamList';
import LeaderBoard from '../screens/LeaderBoard';
import Question from '../testing/QuestionTest';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from '../screens/Profile';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Promotion') {
            iconName = focused ? 'reader' : 'reader-outline';
          } else if (route.name === 'notification') {
            iconName = focused ? 'cellular' : 'cellular-outline';
          } else if (route.name === 'contact') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          // Fallback to empty string if iconName is undefined
          iconName = iconName || '';

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarStyle: {
          paddingBottom: 10,
          height: 60,
          backgroundColor: colors.white,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.deepBlue,
        tabBarInactiveTintColor: colors.grey,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{type: 'home'}}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Promotion"
        component={ExamList}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="notification"
        component={LeaderBoard}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="contact"
        component={Profile}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name="contact"
        component={Question}
        options={{headerShown: false}}
      /> */}
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
