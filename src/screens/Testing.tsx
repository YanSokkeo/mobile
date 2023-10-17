import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import PocketBase, {RecordModel} from 'pocketbase';

const Testing = () => {
  const [recordsData, setRecordsData] = useState<RecordModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const pb = new PocketBase('http://10.0.2.2:8090');
      try {
        const records = await pb.collection('Quiz').getFullList({
          expand: 'relField1,relField2.subRelField',
        });
        console.log(records);
        setRecordsData(records);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{flex: 1, paddingTop: 20}}>
      <Text>Records Data:</Text>
      {recordsData.map(record => (
        <TouchableOpacity key={record.id} style={styles.recordContainer}>
          <Text style={styles.questionText}>{record.question}</Text>
          <Text style={styles.quizIdText}>Quiz ID: {record.quizId}</Text>
          <Text style={styles.byOrderText}>By Order: {record.byOrder}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Testing;

const styles = StyleSheet.create({
  recordContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  quizIdText: {
    color: 'blue',
    fontSize: 14,
  },
  byOrderText: {
    fontStyle: 'italic',
    fontSize: 12,
  },
});
