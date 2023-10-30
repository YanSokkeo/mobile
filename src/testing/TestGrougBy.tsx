import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import PocketBase, {RecordModel} from 'pocketbase';
import colors from '../../colors';

const TestGrougBy = () => {
  const [dataList, setDataList] = useState<{
    [questionId: string]: RecordModel[];
  }>({});

  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://10.0.2.2:8090');
      try {
        const records = await pb.collection('FullJoin').getFullList();
        const groupedData = groupData(records as RecordModel[]);
        setDataList(groupedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const groupData = (records: RecordModel[]) => {
    const groupedData: {[questionId: string]: RecordModel[]} = {};

    records.forEach(record => {
      if (groupedData.hasOwnProperty(record.id)) {
        groupedData[record.id].push(record);
      } else {
        groupedData[record.id] = [record];
      }
    });

    return groupedData;
  };

  const renderQuestion = (questionId: string) => {
    const questionData = dataList[questionId];
    const currentQuestion = questionData[0]?.question;
    const answers = questionData.map(record => record.answer);

    return (
      <View key={questionId} style={styles.questionContainer}>
        <Text style={styles.text_question}>{currentQuestion}</Text>
        {answers.length > 0 ? (
          answers.map((answer, answerIndex) => (
            <TouchableOpacity key={answerIndex} style={styles.answer_Container}>
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
                <Text style={styles.text}>{answer}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No answers found</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Object.keys(dataList).map(questionId => renderQuestion(questionId))}
    </View>
  );
};

export default TestGrougBy;

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
    color: colors.deepBlue,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
    padding: 10,
  },
});
