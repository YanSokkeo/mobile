import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import colors from '../../colors';
import HeaderBackground from '../components/header/HeaderBackground';

const TestRe = ({route}: any) => {
  const navigation = useNavigation();
  const {answers, userAnswers, isAnswerCorrect, point} = route.params;

  const handleContinue = () => {
    navigation.navigate('tabNavigation');
  };
  let trueCount = 0;
  let falseCount = 0;
  const filteredAnswers = answers.filter(
    (answer: any) => answer === true || answer === false,
  );
  filteredAnswers.forEach((answer: any) => {
    if (answer === true) {
      trueCount++;
    } else if (answer === false) {
      falseCount++;
    }
  });
  const totalCount = trueCount + falseCount;
  const truePercentage = (trueCount / totalCount) * 100;

  console.log('True count:', trueCount);
  console.log('False count:', falseCount);
  console.log('Total count:', totalCount);

  console.log(filteredAnswers);
  //   console.log(answers);
  return (
    <View style={styles.container}>
      <View style={styles.navigator}>
        <HeaderBackground
          iconleft="menu"
          iconfirstRight="share-2"
          title="Result"
          textColor={colors.white}
          backgroundColors={colors.deepBlue}
          IconColor={colors.white}
          secondColor={colors.white}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.score}>
          <View style={styles.circle}>
            <Text style={styles.text}>{truePercentage.toFixed(2)}%</Text>
          </View>
          <View style={{flexDirection: 'row-reverse'}}>
            <Text style={[styles.text1, {marginLeft: 20}]}>
              False: {falseCount}
            </Text>
            <Text style={styles.text1}> True {trueCount}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>Results</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {filteredAnswers.map((isCorrect: boolean, index: number) => (
              <Text
                key={index}
                style={[styles.answerText, {width: '50%'}]}
                numberOfLines={index >= 2 ? 1 : undefined}>
                Q{index + 1}: {isCorrect ? 'Correct' : 'Incorrect'}
              </Text>
            ))}
          </View>

          <View style={styles.controll_button}>
            <Text style={styles.title}>Passed Point: {point}</Text>
            <TouchableOpacity onPress={handleContinue} style={styles.button}>
              <Text style={styles.text_BTN}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },

  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  answerText: {
    fontSize: 16,
    color: colors.deepBlue,
    fontFamily: 'Poppins-Medium',
    paddingHorizontal: 5,
    paddingVertical: 2,
    flexDirection: 'row',
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    fontSize: 25,
    color: colors.white,
    fontFamily: 'Poppins-Medium',
  },
  text1: {
    fontSize: 18,
    color: colors.deepBlue,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  text_BTN: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    width: '50%',
    height: '17%',
    backgroundColor: colors.deepBlue,
    padding: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    // marginBottom: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  navigator: {
    flex: 0.1,
  },
  body: {
    flex: 0.9,
    // padding: 10,
    margin: 10,
  },
  score: {
    flex: 0.26,
  },
  circle: {
    width: '40%',
    height: '85%',
    borderRadius: 100,
    backgroundColor: colors.deepBlue,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.gold,
    justifyContent: 'center', // Add this line to vertically center the text
    alignItems: 'center', // Add this line to horizontally center the text
  },
  title: {
    fontSize: 20,
    color: colors.deepBlue,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  card: {
    flex: 0.74,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
  },
  controll_button: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default TestRe;