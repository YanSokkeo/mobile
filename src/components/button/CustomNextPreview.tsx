import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import colors from '../../../colors';
interface Props {
  iconLeft?: String;
  iconRight?: String;
  leftColor?: string;
  rightColor?: string;
  text: string;
  onPress?: () => void;
}

const CustomNextPreview: React.FC<Props> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Icon name={props.iconLeft} size={30} color={props.leftColor} />
        <Text style={styles.text}> {props.text} </Text>
        <Icon name={props.iconRight} size={30} color={props.rightColor} />
      </View>
    </TouchableOpacity>
  );
};

export default CustomNextPreview;
const styles = StyleSheet.create({
  button: {
    width: 91,
    height: 46,
    borderRadius: 10,
    backgroundColor: colors.deepBlue,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.white,
    textAlign: 'center',
  },
});
