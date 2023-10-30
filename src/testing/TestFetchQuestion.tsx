import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import PocketBase, {RecordModel} from 'pocketbase';
import colors from '../../colors';
import HeaderBackground from '../components/header/HeaderBackground';
import ModalList from '../components/modal/ModalList';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomNextPreview from '../components/button/CustomNextPreview';
import {useNavigation} from '@react-navigation/native';

const TestFetchQuestion = () => {
  const navigation = useNavigation();
  const [point, setPoint] = useState<number>(0);
  const [questionData, setQuestionData] = useState<RecordModel[]>([]);
  const [ques, setQues] = useState(0);
  const [answerData, setAnswerData] = useState<RecordModel[]>([]);
  const [index, setIndex] = useState<number>(0);
  const currentQuestion = questionData[index]?.question;
  const checkAnser = answerData[index]?.isAnswer == true;
  const TotalQuestion = questionData.length;
  const progressPercentage = Math.floor((index / TotalQuestion) * 100);
  const [answerStatus, setAnswerStatus] = useState<boolean | null>(null);

  const [answers, setAnswers] = useState<Array<any>>([]);

  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null,
  );
  const currentAnswer = answerData[currentQuestion]?.answer;
  const isAnswer = answerData[currentQuestion]?.isAnswer;

  const isCorrectAnswer = selectedAnswerIndex === isAnswer;

  const [counter, setCounter] = useState<number>(15);
  let interval: NodeJS.Timeout | null = null;
  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://10.0.2.2:8090');
      try {
        const records = await pb.collection('Tbl_question').getFullList({
          sort: 'created',
        });
        setQuestionData(records);

        const Secondrecords = await pb.collection('Tbl_answer').getFullList({
          sort: 'created',
        });
        setAnswerData(Secondrecords);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedAnswerIndex !== null) {
      if (selectedAnswerIndex === currentQuestion?.isCorrectAnswer) {
        setPoint(point => point + 10);
        setAnswerStatus(true);
        answers.push({question: index + 1, answer: true});
        console.log(answers);
      } else {
        setAnswerStatus(false);
        answers.push({question: index + 1, answer: false});
      }
    }
  }, [selectedAnswerIndex]);

  // useEffect(() => {
  //   setSelectedAnswerIndex(null);
  //   setAnswerStatus(null);
  // }, [index]);

  // useEffect(() => {
  //   let interval: any;
  //   const myInterval = () => {
  //     if (counter >= 1) {
  //       setCounter(counter => counter - 1);
  //     }
  //     if (counter === 0) {
  //       setIndex(index + 1);
  //       setCounter(15);
  //     }
  //   };
  //   interval = setTimeout(myInterval, 1000);
  //   return () => {
  //     clearTimeout(interval);
  //   };
  // }, [counter]);

  // useEffect(() => {
  //   if (!interval) {
  //     setCounter(15);
  //   }
  // }, [index]);

  // useEffect(() => {
  //   if (index + 1 > TotalQuestion) {
  //     navigation.navigate('result', {
  //       answers: answers,
  //       point: point,
  //     } as never);
  //   }
  // }, [currentQuestion]);

  const handleNextQuestion = (): void => {
    if (index + 1 < TotalQuestion) {
      setIndex(index + 1);
      setCounter(15);
      setSelectedAnswerIndex(null);
      setAnswerStatus(null);
    } else if (index + 1 >= TotalQuestion) {
      navigation.navigate('result', {
        point: point,
        answers: answers,
      });
    }
  };

  const handlePrevQuestion = (): void => {
    if (index > 0) {
      setIndex(index - 1);
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
        title={`Question ${index + 1}/${TotalQuestion}`}
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
        <Text style={styles.text_question}> {currentQuestion} </Text>
        {answerData.map((record: any, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedAnswerIndex(index)}
            style={[
              selectedAnswerIndex === index &&
              (index === selectedAnswerIndex) == isCorrectAnswer
                ? styles.answer_Container_true
                : selectedAnswerIndex !== null && selectedAnswerIndex === index
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
                  index === currentQuestion?.correctAnswerIndex
                    ? styles.text_true
                    : selectedAnswerIndex !== null &&
                      selectedAnswerIndex == index
                    ? styles.text_true
                    : styles.text,
                ]}>
                {record.answer}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
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

export default TestFetchQuestion;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  timer: {
    flex: 0.02,
    flexDirection: 'row',
  },
  questionContainer: {
    flex: 0.8,
    // margin: 10,
  },
  answer_Container: {
    flexDirection: 'row',
    width: '95%',
    height: '15%',
    margin: 10,
    padding: 5,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignSelf: 'center',
  },
  answer_Container_true: {
    flexDirection: 'row',
    width: '95%',
    height: '15%',
    margin: 10,
    padding: 5,
    backgroundColor: colors.deepBlue,
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    fontSize: 14,
    color: colors.blue,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
  controll_Text: {
    width: '88%',
    height: '100%',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingTop: 10,
  },
  text_question: {
    width: 'auto',
    height: 'auto',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.deepBlue,
    alignSelf: 'center',
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
    color: colors.red,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
  timerWithList: {
    flex: 0.12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  buttom_btn: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
});
function setCurrentQuestionIndex(arg0: (prevIndex: any) => any) {
  throw new Error('Function not implemented.');
}
