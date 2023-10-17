import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';

const QuestionAnswerList = ({question}: any) => {
  const [answers, setAnswers] = useState([]);

  const fetchAnswers = async () => {
    // Fetch the answers from the server
    const response = await fetch(
      'https://api.example.com/answers/' + question.id,
    );
    const data = await response.json();

    setAnswers(data.items);
  };

  useEffect(() => {
    fetchAnswers();
  }, [question]);

  return (
    <View>
      <Text>{question.question}</Text>

      <FlatList
        data={answers}
        renderItem={({item}) => <Text key={item.id}>{item.answer}</Text>}
      />
    </View>
  );
};

export default QuestionAnswerList;
