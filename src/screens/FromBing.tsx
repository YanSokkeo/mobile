import React, {useState, useEffect} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import PocketBase from 'pocketbase';
import colors from '../../colors';

interface RecordModel {
  id: number;
  question: string;
  answers: string;
}

const FromBing = () => {
  const [data, setData] = useState<Array<RecordModel>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState<Array<
    Array<boolean>
  > | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://10.0.2.2:8090');
      try {
        const records: Array<RecordModel> = await pb
          .collection('completed')
          .getFullList();
        const correctAnswers: Array<Array<boolean>> = records.map(
          (record: RecordModel) =>
            record.answers.split(',').map((value: string) => value === '1'),
        );
        setCorrectAnswers(correctAnswers);
        // console.log(records);
        setData(records);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    const currentQuestion = data[currentQuestionIndex];
    const correctAnswer =
      correctAnswers && correctAnswers[currentQuestionIndex];

    if (currentQuestion && correctAnswer) {
      const answerIndex = currentQuestion.answers
        .split(',')
        .findIndex(item => item.trim() === answer.trim());
      const isAnswerTrue = correctAnswer[answerIndex] === 1;
      console.log(isAnswerTrue);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handlePrevQuestion = () => {
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
        <Text style={{fontSize: 20, color: colors.deepBlue}}>
          {question.question}
        </Text>
        <FlatList
          data={question.answers.split(',')}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                width: '90%',
                height: 80,
                backgroundColor: colors.white,
                padding: 10,
                margin: 10,
                flexDirection: 'row',
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
              <Text style={{color: colors.deepBlue, fontSize: 16}}>
                {item.trim()}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          style={{
            width: '100%',
          }}
        />
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={handlePrevQuestion}
            style={{
              width: '30%',
              height: 50,
              backgroundColor: colors.gold,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              opacity: isFirstQuestion ? 0.5 : 1,
            }}
            disabled={isFirstQuestion}>
            <Text style={{color: colors.grey}}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNextQuestion}
            style={{
              width: '30%',
              height: 50,
              backgroundColor: colors.gold,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              opacity: isLastQuestion ? 0.5 : 1,
            }}
            disabled={isLastQuestion}>
            <Text style={{color: colors.grey}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (data.length === 0 || !data[currentQuestionIndex]) {
    return null;
  }

  return (
    <View style={{flex: 1, backgroundColor: colors.backgroundWhite}}>
      <FlatList
        data={[data[currentQuestionIndex]]}
        renderItem={renderQuestion}
        keyExtractor={item => item?.id?.toString()}
      />
      {selectedAnswer && (
        <Text style={{color: colors.deepBlue, fontSize: 16}}>
          Selected Answer: {selectedAnswer}
        </Text>
      )}
    </View>
  );
};

export default FromBing;
