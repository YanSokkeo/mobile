import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import PocketBase from 'pocketbase';
import colors from '../../colors';
import {client} from '../api/Pocketbase';
import {
  CurrentRenderContext,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import HeaderBackground from '../components/header/HeaderBackground';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalList from '../components/modal/ModalList';
import CustomNextPreview from '../components/button/CustomNextPreview';
import {atom, useAtom} from 'jotai';
import CustomAlert from '../components/modal/CustomAlert ';

interface RecordModel {
  isAnswers: any;
  id: number;
  question: string;
  answers: string;
}

const JavaScriptQuestion = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<Array<RecordModel>>([]);
  const [showAlert, setShowAlert] = useState(false);
  const totalQuestion = data.length;
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<Array<
    Array<boolean>
  > | null>(null);
  const [point, setPoint] = useState(0);

  const progressPercentage = Math.floor(
    (currentQuestionIndex / totalQuestion) * 100,
  );

  const [counter, setCounter] = useState<number>(15);
  // let interval: NodeJS.Timeout | null = null;
  let interval: any;
  let timer: any;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const pb = new PocketBase('http://10.0.2.2:8090');
  //     // const pb = new PocketBase('http://127.0.0.1:8090');
  //     try {
  //       const records: Array<RecordModel> = await pb
  //         .collection('completed')
  //         .getFullList();
  //       const correctAnswers: Array<Array<boolean>> = records.map(
  //         (record: RecordModel) =>
  //           record.isAnswers.split(',').map((value: string) => value === '1'),
  //       );
  //       setCorrectAnswers(correctAnswers);
  //       console.log(records);
  //       console.log('hello');
  //       setData(records);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records: Array<RecordModel> = await client
          .collection('Js_query')
          // .collection('Testin1')
          .getFullList();
        const correctAnswers: Array<Array<boolean>> = records.map(
          (record: RecordModel) =>
            record.isAnswers.split(';').map((value: string) => value === '1'),
        );
        setCorrectAnswers(correctAnswers);
        setData(records);
        // console.log(records);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  ///////

  useEffect(() => {
    const backAction = () => {
      setShowAlert(true); 
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleConfirmLeave = () => {
    navigation.goBack(); 
    setShowAlert(false); 
  };

  const handleCancelLeave = () => {
    setShowAlert(false); 
  };

  ///////

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        clearTimeout(timer);
      };
    }, []),
  );

  useEffect(() => {
    const myInterval = () => {
      if (counter >= 1) {
        setCounter(counter => counter - 1);
      }
      if (counter === 0) {
        clearTimeout(interval);
        setCounter(15);
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      }
    };
    const timer = setTimeout(myInterval, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [counter]);

  useEffect(() => {
    return () => {
      clearTimeout(interval); 
    };
  }, []);

  let TotalQuestion = data.length;
  useEffect(() => {
    TotalQuestion = data.length;
  }, [data]);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    const currentQuestion = data[currentQuestionIndex];
    const correctAnswer =
      correctAnswers && correctAnswers[currentQuestionIndex];

    if (currentQuestion && correctAnswer) {
      const answerIndex = currentQuestion.answers
        .split(';')
        .findIndex(item => item.trim() === answer.trim());
      const isAnswerTrue = correctAnswer[answerIndex];
      setIsAnswerCorrect(isAnswerTrue);
    }
  };

  const handleNextQuestion = () => {
    setCounter(15);
    if (isAnswerCorrect) {
      setPoint(prevPoint => prevPoint + 10);
    }
    setAnswers(prevAnswers => [...prevAnswers, isAnswerCorrect]);

    if (currentQuestionIndex === TotalQuestion - 1) {
      setTimeout(() => {
        navigation.navigate('fetchResult', {
          point: point + (isAnswerCorrect ? 10 : 0),
          answers: [...answers, isAnswerCorrect],
        });
      }, 0);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    setCounter(15);
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const renderQuestion = ({item}: any) => {
    if (data.length === 0 || !item) {
      return null;
    }

    const question = item;

    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === data.length - 1;
    return (
      <View key={question.id}>
        <Text
          style={{fontSize: 20, color: colors.deepBlue, textAlign: 'center'}}>
          {question.question}
        </Text>
        <FlatList
          data={question.answers.split(';')}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                width: '95%',
                height: 80,
                backgroundColor:
                  selectedAnswer === item.trim() ? colors.blue : colors.white,
                padding: 20,
                margin: 10,
                flexDirection: 'row',
                borderRadius: 10,
                alignSelf: 'center',
              }}
              onPress={() => handleAnswerSelection(item.trim())}>
              <View
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: colors.lightBlue,
                  borderRadius: 20,
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  color:
                    selectedAnswer === item.trim()
                      ? colors.white
                      : colors.deepBlue,
                  fontSize: 14,
                  paddingHorizontal: 10,
                  flexWrap: 'wrap',
                  alignSelf: 'center',
                }}>
                {item.trim()}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{
            width: '100%',
          }}
        />
      </View>
    );
  };

  if (data.length === 0 || !data[currentQuestionIndex]) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeaderBackground
        iconleft="menu"
        iconfirstRight="menu"
        title={`Question ${currentQuestionIndex + 0}/${totalQuestion}`}
        // title={'question'}
        textColor={colors.white}
        backgroundColors={colors.deepBlue}
        IconColor={colors.white}
        secondColor={colors.deepBlue}
      />

      <CustomAlert
        visible={showAlert}
        message="Are you sure? Do you want to leave?"
        onConfirm={handleConfirmLeave}
        onCancel={handleCancelLeave}
      />

      <View style={styles.timer}>
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
          {/* <Text style={styles.text}>30s Remaining</Text> */}
        </View>
        <ModalList />
      </View>

      <View style={styles.questionContainer}>
        <FlatList
          data={[data[currentQuestionIndex]]}
          renderItem={renderQuestion}
          keyExtractor={item => item?.id?.toString()}
        />
      </View>
      <View style={styles.buttom_btn}>
        <CustomNextPreview
          text="Prev"
          iconLeft="chevron-left"
          leftColor={colors.white}
          onPress={handlePrevQuestion}
          disable={currentQuestionIndex === 0}
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

export default JavaScriptQuestion;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  timer: {
    flex: 0.01,
    flexDirection: 'row',
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

  timerWithList: {
    flex: 0.1,
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

  text: {
    fontSize: 14,
    color: colors.blue,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
  remainingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
