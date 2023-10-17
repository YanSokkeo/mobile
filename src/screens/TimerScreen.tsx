import {StyleSheet, View, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import colors from '../../colors';

const TimerScreen = () => {
  const timerDuration = 300; // Duration in seconds (5 minutes)
  const animationDuration = timerDuration * 1000; // Convert to milliseconds
  const animatedValue = useRef(new Animated.Value(0)).current;
  let animation: Animated.CompositeAnimation | null = null;

  useEffect(() => {
    startTimer();
  }, []);

  const startTimer = () => {
    animatedValue.setValue(0); // Reset the animated value to 0
    animation = Animated.timing(animatedValue, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: false,
    });
    animation.start(() => {
      console.log('Time is up!');
      // Add your logic to move to the next question or perform any other action
      // Call the resetTimer function to reset and start the timer again
      resetTimer();
    });
  };

  const resetTimer = () => {
    animation?.stop(); // Stop the current animation if it's running
    startTimer(); // Start the timer again
  };

  const animatedStyle = {
    width: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.line, animatedStyle]} />
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 0.002,
  },
  line: {
    height: 5,
    backgroundColor: colors.runTimeColor,
  },
});
