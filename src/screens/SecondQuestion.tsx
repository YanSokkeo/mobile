import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import colors from '../../colors';
import {atom, useAtom} from 'jotai';
import Quiz from '../components/dummy/Quiz';
import {useNavigation} from '@react-navigation/native';
import HeaderBackground from '../components/header/HeaderBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalList from '../components/modal/ModalList';
import CustomNextPreview from '../components/button/CustomNextPreview';

const SecondQuestion = () => {
  const navigation = useNavigation();
  const data = Quiz;
  const totalQuestion = data.length;

  const pointAtom = atom(0);
  const indexAtom = atom(0);
  const answerStatusAtom = atom<null | boolean>(null);
  const selectedAnswerIndexAtom = atom<null | number>(null);
  const counterAtom = atom(15);
  const answersAtom = atom<any[]>([]);

  const [point, setPoint] = useAtom(pointAtom);
  const [index, setIndex] = useAtom(indexAtom);

  const CurrentQuestion = data[index];

  const progressPercentage = Math.floor((index / totalQuestion) * 100);

  const [answerStatus, setAnswerStatus] = useAtom(answerStatusAtom);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useAtom(
    selectedAnswerIndexAtom,
  );

  const [counter, setCounter] = useAtom(counterAtom);

  const [answers, setAnswers] = useAtom(answersAtom);
  let interval: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === CurrentQuestion?.correctAnswerIndex) {
        setPoint(point => point + 10);
        setAnswerStatus(true);
        answers.push({question: index + 1, answer: true});
      } else {
        setAnswerStatus(false);
        setAnswers(prevAnswers => [
          ...prevAnswers,
          answers.push({question: index + 1, answer: false}),
        ]);
      }
    }
  }, [selectedAnswerIndex]);

  useEffect(() => {
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    const myInterval = () => {
      setCounter(counter => {
        if (counter >= 1) {
          return counter - 1;
        }
        if (counter === 0) {
          setIndex(index => index + 1);
          return 15;
        }
        return counter;
      });
    };
    const interval = setInterval(myInterval, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [counter]);

  useEffect(() => {
    if (!interval) {
      setCounter(15);
    }
  }, [index]);

  useEffect(() => {
    if (index + 1 > data.length) {
      navigation.navigate('result', {
        answers: answers,
        point: point,
      } as never);
    }
  }, [CurrentQuestion]);

  const handleNextQuestion = (): void => {
    if (index + 1 <= data.length) {
      setIndex(index => index + 1);
      setCounter(15);
      setSelectedAnswerIndex(null);
      setAnswerStatus(null);
    } else if (index + 1 >= data.length) {
      navigation.navigate('result', {
        point: point,
        answers: answers,
      });
    }
  };

  const handlePrevQuestion = (): void => {
    if (index > 0) {
      setIndex(index => index - 1);
      setCounter(15);
      setSelectedAnswerIndex(null);
      setAnswerStatus(null);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBackground
        iconleft="menu"
        iconfirstRight="menu"
        title={`Question ${index + 1}/${totalQuestion}`}
        textColor={colors.white}
        backgroundColors={colors.deepBlue}
        IconColor={colors.white}
        secondColor={colors.deepBlue}
      />
      <View style={styles.timer}>
        {/* <TimerScreen /> */}
        <Text
          style={{
            backgroundColor: colors.runTimeColor,
            width: `${progressPercentage}%`,
            height: 10,
          }}
        />
      </View>

      <View style={styles.timerWithList}>
        <View style={styles.iconContainer2}>
          <Icon
            name="chevron-back-outline"
            size={30}
            color={colors.backgroundWhite}
          />
        </View>
        <View style={styles.remainingContainer}>
          <Icon
            name="time-outline"
            size={30}
            style={{color: colors.deepBlue}}
          />
          <Text style={styles.text}>{counter} Remaining</Text>
        </View>
        <ModalList />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.text_question}>{CurrentQuestion?.question}</Text>
        <View>
          {CurrentQuestion?.options.map((item: any, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                selectedAnswerIndex === null && setSelectedAnswerIndex(index)
              }
              // onPress={() => {
              //   if (selectedAnswerIndex === null) {
              //     setSelectedAnswerIndex(index);
              //     if (selectedAnswerIndex !== null) {
              //       if (
              //         selectedAnswerIndex ===
              //         CurrentQuestion?.correctAnswerIndex
              //       ) {
              //         setIndex(index + 1);
              //         setPoint(point => point + 10);
              //         setAnswerStatus(true);
              //         answers.push({question: index + 1, answer: true});
              //       } else {
              //         setIndex(index + 1);
              //         setAnswerStatus(false);
              //         answers.push({question: index + 1, answer: false});
              //       }
              //     }
              //   }
              // }}
              // disabled={selectedAnswerIndex !== null}
              style={[
                selectedAnswerIndex === index &&
                index === CurrentQuestion.correctAnswerIndex
                  ? styles.answer_Container_true
                  : selectedAnswerIndex !== null &&
                    selectedAnswerIndex === index
                  ? styles.answer_Container_true
                  : styles.answer_Container,
              ]}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.lightBlue,
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              />
              <View style={styles.controll_Text}>
                <Text
                  style={[
                    selectedAnswerIndex == index &&
                    index === CurrentQuestion?.correctAnswerIndex
                      ? styles.text_true
                      : selectedAnswerIndex !== null &&
                        selectedAnswerIndex == index
                      ? styles.text_false
                      : styles.text,
                  ]}>
                  {item.answer}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.buttom_btn}>
        <CustomNextPreview
          text="Prev"
          iconLeft="chevron-left"
          leftColor={colors.white}
          onPress={handlePrevQuestion}
        />
        <CustomNextPreview
          text="Next"
          iconRight="chevron-right"
          rightColor={colors.white}
          onPress={handleNextQuestion}
        />
      </View>
    </View>
  );
};

export default SecondQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  timer: {
    flex: 0.01,
    flexDirection: 'row',
  },
  timerWithList: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    backgroundColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  iconContainer2: {
    width: 32,
    height: 32,
    backgroundColor: colors.backgroundWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  remainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  questionContainer: {
    flex: 0.8,
    margin: 10,
  },
  buttom_btn: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  icon: {},
  text: {
    fontSize: 14,
    color: colors.blue,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
  text_true: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
  text_false: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
  text_question: {
    width: 'auto',
    height: 'auto',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.deepBlue,
    alignSelf: 'center',
  },
  // option_text: {
  //   width: '100%',
  //   height: '80%',
  //   backgroundColor: colors.white,
  // },
  answer_Container: {
    flexDirection: 'row',
    width: '95%',
    height: '19%',
    margin: 10,
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignSelf: 'center',
  },

  answer_Container_true: {
    flexDirection: 'row',
    width: '95%',
    height: '19%',
    margin: 10,
    padding: 5,
    backgroundColor: colors.deepBlue,
    borderRadius: 10,
    alignSelf: 'center',
  },
  answer_Container_false: {
    width: '90%',
    height: '19%',
    padding: 10,
    margin: 10,
    backgroundColor: colors.red,
    borderRadius: 10,
  },
  controll_Text: {
    width: '88%',
    height: '100%',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingTop: 10,
  },
});

function setCurrentQuestionIndex(arg0: any) {
  throw new Error('Function not implemented.');
}
