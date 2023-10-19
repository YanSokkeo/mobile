import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import colors from '../../colors';
import {RouteProp, useNavigation} from '@react-navigation/native';
import HeaderBackground from '../components/header/HeaderBackground';

type HelloScreenParams = {
  route: RouteProp<{Hello: {point: number; answers: boolean[]}}>;
};

const FetchResult: React.FC<HelloScreenParams> = ({route}) => {
  const {point, answers} = route.params;
  const navigation = useNavigation();

  let trueCount = 0;
  let falseCount = 0;
  answers.forEach(answer => {
    if (answer) {
      trueCount++;
    } else {
      falseCount++;
    }
  });

  const totalCount = trueCount + falseCount;
  const truePercentage = (trueCount / totalCount) * 100;

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => {
      backHandler.remove();
    };
  }, []);

  const handleContinue = () => {
    navigation.navigate('tabNavigation');
  };

  const renderAnswerList = () => {
    return answers.map((answer, index) => {
      const displayIndex = index + 1;
      const answerText = answer ? 'true' : 'false';

      return (
        <Text key={index} style={styles.text1}>
          {displayIndex}. {answerText}
        </Text>
      );
    });
  };

  // const renderAnswerList = () => {
  //   const rows = [];
  //   const totalAnswers = answers.length;

  //   for (let i = 0; i < totalAnswers; i += 2) {
  //     const answer1 = answers[i];
  //     const answer2 = i + 1 < totalAnswers ? answers[i + 1] : null;

  //     const displayIndex1 = i + 1;
  //     const displayIndex2 = i + 2;

  //     const answerText1 = answer1 ? 'true' : 'false';
  //     const answerText2 = answer2 ? 'true' : 'false';

  //     rows.push(
  //       <View key={i} style={styles.answerRow}>
  //         <Text style={styles.answerText}>
  //           {displayIndex1}. {answerText1}
  //         </Text>
  //         {answer2 && (
  //           <Text style={styles.answerText}>
  //             {displayIndex2}. {answerText2}
  //           </Text>
  //         )}
  //       </View>,
  //     );
  //   }

  //   return rows;
  // };

  return (
    <View style={styles.container}>
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
            <Text style={styles.text1}> True {trueCount}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.text1}>RECORDED</Text>
          {renderAnswerList()}
          <View style={styles.controll_button}>
            <Text style={styles.title}>Passed Point: {point}</Text>
            <TouchableOpacity onPress={handleContinue} style={styles.button}>
              <Text style={styles.text_BTN}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FetchResult;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundWhite,
  },
  text: {
    fontSize: 25,
    color: colors.white,
    fontFamily: 'Poppins-Medium',
  },
  text1: {
    fontSize: 18,
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
    width: '50%',
    height: '20%',
    backgroundColor: colors.deepBlue,
    padding: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    borderRadius: 5,
  },
  answerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  answerText: {
    fontSize: 16,
    color: colors.deepBlue,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    flex: 1,
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
    flex: 0.26,
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
  card: {
    flex: 0.65,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
  },
  controll_button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});
