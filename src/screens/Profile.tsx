import { View, Text } from 'react-native';
import React from 'react';
import colors from '../../colors';

const Profile = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 36, fontWeight: 'bold', color: colors.lightAbitBlue}}>PROFILE</Text>
    </View>
  );
};

export default Profile;
