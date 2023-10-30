import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import PocketBase, {RecordModel} from 'pocketbase';
import colors from '../../colors';

const TestingSecond = () => {
  const [answerData, setAnswerData] = useState<RecordModel[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [index, setIndex] = useState<number>(0);
  const currentQuestion = answerData[index]?.question;
  const TotalQuestion = answerData.length / 4;
  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://10.0.2.2:8090');
      try {
        const records = await pb.collection('FullJoin').getFullList();
        console.log(records);
        setAnswerData(records as unknown as RecordModel[]);
      } catch (error) {
        console.error(error);
        // console.log(error.originalError);
      }
    };

    fetchData();
  }, []);
  const handleNextQuestion = () => {
    if (questionIndex < answerData.length - 1) {
      setQuestionIndex(questionIndex + 1);
    }
  };

  console.log('TOtal of question is ', TotalQuestion);
  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>
        <Text style={styles.text_question}>{currentQuestion}</Text>
        {answerData.slice(0, 4).map((item: any, index: any) => (
          <TouchableOpacity key={index} style={styles.answer_Container}>
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: colors.lightBlue,
                borderRadius: 20,
                alignSelf: 'center',
              }}
            />
            {/* <Text style={styles.text}> {item.answer} </Text> */}
            <Text style={styles.text}> {answerData[index]?.answer} </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={handleNextQuestion}
        disabled={questionIndex === answerData.length - 1}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TestingSecond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  head: {
    flex: 0.1,
    backgroundColor: colors.deepBlue,
  },
  body: {
    flex: 8,
    backgroundColor: colors.gold,
  },
  btn: {
    width: 100,
    height: 50,
    borderRadius: 20,
    backgroundColor: colors.deepBlue,
  },
  questionContainer: {
    flex: 0.8,
    // margin: 10,
  },
  text_question: {
    width: 'auto',
    height: 'auto',
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: colors.deepBlue,
    alignSelf: 'center',
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
  text_true: {
    fontSize: 14,
    color: colors.white,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
  nextButton: {
    width: 100,
    height: 40,
    backgroundColor: colors.deepBlue,
    borderRadius: 10,
  },
  nextButtonText: {
    color: colors.white,
    alignSelf: 'center',
    paddingTop: 10,
  },
});
