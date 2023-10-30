import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../colors';

interface Props {
  iconName?: string;
  error?: string;
  password?: string | number;
  placeholder: string;

  headIcon?: string;
  onChangeText?: (value: any) => void;
  onSubmitEditing?: (value: any) => void;
}

const SearchBox: React.FC<Props> = props => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled>
      <View style={styles.container2}>
        <Icon name={props.iconName} size={30} style={styles.icon} />
        <TextInput
          placeholder={props.placeholder}
          placeholderTextColor={colors.lightGrey}
          style={styles.Textput}
          onChangeText={props.onChangeText}
          onSubmitEditing={props.onSubmitEditing}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default SearchBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 0,
    margin: 15,
  },
  icon: {
    color: colors.deepBlue,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
  },
  container2: {
    height: 68,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
  },

  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    color: colors.deepBlue,
  },

  Textput: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 14,
    color: colors.deepBlue,
    // placeholderTextColor: defaultColor.Smoke,
  },
});
