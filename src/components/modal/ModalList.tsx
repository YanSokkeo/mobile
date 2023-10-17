import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../../colors';
import Quiz from '../dummy/Quiz';

const data = Quiz;

const ModalPopup = ({visible, children}: any) => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  );
};

const ModalList = () => {
  const [visible, setVisible] = React.useState(false);

  const controlView = data.map(question => (
    <TouchableOpacity key={question.byOrder} style={[styles.controll_box]}>
      <Text style={styles.text}>{question.byOrder}</Text>
    </TouchableOpacity>
  ));

  return (
    <View style={{flex: 0.1, justifyContent: 'center', alignItems: 'center'}}>
      <ModalPopup visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.head}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon
                name="chevron-back-outline"
                size={30}
                color={colors.deepBlue}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.controll}>{controlView}</View>
        </View>
      </ModalPopup>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => setVisible(true)}>
        <Icon name="chevron-back-outline" size={30} color={colors.white} />
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

export default ModalList;

const styles = StyleSheet.create({
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '60%',
    backgroundColor: colors.backgroundWhite,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 20,
    elevation: 20,
  },
  head: {
    width: '100%',
    height: 40,
    alignItems: 'flex-start',
  },
  controll: {
    width: '100%',
    height: '90%',
    paddingVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  controll_box: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 10,
    margin: 10,
    borderWidth: 1,
    alignContent: 'center',
    alignSelf: 'center',
  },
  text: {
    alignSelf: 'center',
    paddingTop: 10,
    fontSize: 16,
    color: colors.blue,
    fontFamily: 'Poppins-Medium',
  },
});
