import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import PocketBase, {RecordModel} from 'pocketbase';
import colors from '../../colors';

const TestingSecond = () => {
  const [answerData, setAnswerData] = useState<RecordModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://10.0.2.2:8090');
      try {
        const records = await pb.collection('Tbl_answer').getFullList({
          sort: 'created',
        });
        console.log(records);
        setAnswerData(records);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.head}></View>
      <View style={styles.body}>
        <Text>Option Record</Text>
        <View>
          {answerData.map((record: any, index: any) => (
            <TouchableOpacity>
              <Text> {record.answer} </Text>
              <Text>{record.isAnswer == true ? 'True' : 'False'} </Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: colors.deepBlue,
                }}></View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
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
  text: {
    color: colors.white,
  },
});
