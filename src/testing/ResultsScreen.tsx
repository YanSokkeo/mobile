import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Pressable,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colors from '../../colors';
import HeaderBackground from '../components/header/HeaderBackground';

type ResultScreenParams = {
  route: any;
  answers: Answer[];
  point: number;
};

type Answer = {
  question: number;
  answer: boolean;
  point: number;
};

const ResultsScreen: React.FC<ResultScreenParams> = ({route}) => {
  const {answers, point} = route.params;
  const navigation = useNavigation();
  console.log(route.params);
  const handleContinue = () => {
    navigation.navigate('tabNavigation');
  };

  const countAnswers = () => {
    let trueCount = 0;
    let falseCount = 0;

    answers.forEach((answer: any) => {
      if (answer.answer) {
        trueCount++;
      } else {
        falseCount++;
      }
    });

    const totalCount = trueCount + falseCount;
    const truePercentage = (trueCount / totalCount) * 100;
    const falsePercentage = (falseCount / totalCount) * 100;

    return {trueCount, falseCount, truePercentage, falsePercentage};
  };

  const {trueCount, falseCount, truePercentage, falsePercentage} =
    countAnswers();

  return (
    <SafeAreaView style={styles.container}>
      {/* <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          height: '50%',
          borderRadius: 7,
          marginTop: 20,
        }}>
        <Text
          style={{
            color: 'magenta',
            fontSize: 15,
            fontWeight: '500',
            textAlign: 'center',
            marginTop: 8,
          }}>
          Score Card
        </Text>
        <FlatList
          numColumns={2}
          data={answers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                margin: 10,
                flexDirection: 'row',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              <Text>{item.question.toString()}. </Text>
              <Text>{item.answer ? 'true' : 'false'} </Text>
            </View>
          )}
        />
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text>True Count: {trueCount}</Text>
          <Text>True Count: {point}</Text>
          <Text>True Percentage: {truePercentage.toFixed(2)}%</Text>
        </View>
        <TouchableOpacity
          onPress={handleContinue}
          style={{
            backgroundColor: 'green',
            padding: 8,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 20,
            borderRadius: 5,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Continue</Text>
        </TouchableOpacity>
      </View> */}
      <View style={styles.navigator}>
        <HeaderBackground
          iconleft="menu"
          iconfirstRight="share-2"
          title="Result"
          textColor={colors.white}
          backgroundColors={colors.deepBlue}
          IconColor={colors.white}
          secondColor={colors.white}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.score}>
          <View style={styles.circle}>
            <Text style={styles.text}>{truePercentage.toFixed(2)}%</Text>
          </View>
          <View style={{flexDirection: 'row-reverse'}}>
            <Text style={[styles.text1, {marginLeft: 20}]}>
              False: {falseCount}
            </Text>
            <Text style={styles.text1}> True: {trueCount} </Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>RECORDED</Text>
          <FlatList
            numColumns={2}
            data={answers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: 10,
                  flexDirection: 'row',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}>
                <Text style={styles.text1}>{item.question.toString()}. </Text>
                <Text style={styles.text1}>
                  {item.answer ? 'true' : 'false'}
                </Text>
              </View>
            )}
          />
          <Text style={styles.title}>You Got {point} point</Text>
          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.text_BTN}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  navigator: {
    flex: 0.1,
  },
  body: {
    flex: 0.9,
    // padding: 10,
    margin: 10,
  },
  score: {
    flex: 0.25,
  },
  circle: {
    width: '40%',
    height: '85%',
    borderRadius: 100,
    backgroundColor: colors.deepBlue,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.gold,
    justifyContent: 'center', // Add this line to vertically center the text
    alignItems: 'center', // Add this line to horizontally center the text
  },
  title: {
    fontSize: 20,
    color: colors.deepBlue,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  text: {
    fontSize: 25,
    color: colors.white,
    fontFamily: 'Poppins-Medium',
  },
  text1: {
    fontSize: 14,
    color: colors.deepBlue,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  text_BTN: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    width: '40%',
    height: '10%',
    backgroundColor: colors.deepBlue,
    padding: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    borderRadius: 5,
  },
  card: {
    flex: 0.65,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
  },
});
