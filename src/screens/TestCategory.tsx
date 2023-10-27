import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BigExamDone from '../components/exam/BigExamDone';
import colors from '../../colors';
import {client} from '../api/Pocketbase';
import {useNavigation} from '@react-navigation/native';
import ExamDone from '../components/exam/ExamDone';

interface RecordModel {
  id: string;
  title: string;
  time: string;
  imageUrl: string;
}

const TestCategory = () => {
  const navigation = useNavigation();
  const [data, setData] = useState<RecordModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDataFetch = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const records: RecordModel[] = await client
          .collection('Quiz')
          .getFullList();
        setData(records);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handlePress = (id: string) => {
    if (id === null) {
      console.log('nothing to see');
    } else {
      navigation.navigate('testCorrect', {id});
    }
  };

  if (isLoading) {
    return (
      <View style={styles.spinner}>
        <ActivityIndicator size="large" color={colors.deepBlue} />
      </View>
    );
  }

  return (
    <View style={styles.controllView}>
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        {data.map((item, index) => (
          <View style={styles.examContainer} key={index}>
            <BigExamDone
              image={item.imageUrl}
              title={item.title}
              subtitle={item.time}
              onPress={() => handlePress(item.id)}
              iconName={'play'}
            />
          </View>
        ))}
        <View style={styles.controllBottom}>
          <View style={styles.textcontainer}>
            <Text style={styles.title2}>Last exam done</Text>
          </View>
          <ExamDone
            image={require('../../assets/images/GroupDone.png')}
            title="Physics daily quiz"
            subtitle="45 Minutes"
            iconName="check"
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default TestCategory;

const styles = StyleSheet.create({
  controllView: {
    flex: 0.78,
    marginTop: -30,
  },
  scrollViewContentContainer: {
    alignItems: 'center',
    padding: 10,
    // backgroundColor: colors.gold,
  },
  examContainer: {
    marginBottom: 20,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textcontainer: {
    width: 150,
    padding: 10,
    margin: 10,
  },

  controllBottom: {
    flex: 0.19,
  },
  title2: {
    color: colors.deepBlue,
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
