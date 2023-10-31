import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
  },
});
