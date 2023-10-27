import React, {useState} from 'react';
import {TextInput, Button, View, Alert} from 'react-native';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://quiz.panel.dreamslab.dev');

const QuizForm = () => {
  const [quizName, setQuizName] = useState('');
  const [score, setScore] = useState('');

  const handleChangeQuizName = (text: any) => {
    setQuizName(text);
  };

  const handleChangeScore = (text: any) => {
    setScore(text);
  };

  const handleSubmit = async () => {
    const data = {
      quiz: quizName,
      score: score,
    };

    const record = await pb.collection('User_answer').create(data);
    Alert.alert(
      'Success!',
      'Your quiz results have been submitted successfully.',
    );
    setQuizName('');
    setScore('')
    // Handle success or failure
  };

  return (
    <View>
      <TextInput
        placeholder="Quiz name"
        value={quizName}
        onChangeText={handleChangeQuizName}
      />
      <TextInput
        placeholder="Score"
        value={score}
        onChangeText={handleChangeScore}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default QuizForm;
