import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {client} from '../api/Pocketbase';
import colors from '../../colors';
import {ScrollView} from 'react-native';

interface RecordModel {
  isAnswers: any;
  id: number;
  question: string;
  answers: string;
}

const TestApi = () => {
  const [data, setData] = useState<Array<RecordModel>>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records: Array<RecordModel> = await client
          // .collection('completed')
          .collection('Testin1')
          .getFullList();
        setData(records);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: colors.backgroundWhite}}>
      <Text
        style={{
          color: colors.deepBlue,
          textAlign: 'center',
          fontSize: 30,
          fontFamily: 'Poppins-Medium',
        }}>
        That is all Data Fetch From API PocketBase
      </Text>
      {data.map(record => (
        <View key={record.id} style={{padding: 10, margin: 10}}>
          <Text style={styles.question}>{record.question}</Text>
          {record.answers.split(';').map((answer, index) => (
            <Text key={index} style={styles.answers}>
              {answer}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default TestApi;

const styles = StyleSheet.create({
  question: {
    color: colors.brown,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  answers: {
    color: colors.deepBlue,
    fontSize: 14,
    marginBottom: 10,
  },
});
