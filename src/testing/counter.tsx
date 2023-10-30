import React from 'react';
import {View, Text, Button} from 'react-native';
import {useCounter} from './store';
import colors from '../../colors';

const Counter = () => {
  const [counter, setCounter] = useCounter();

  const increment = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const decrement = () => {
    setCounter(prevCounter => prevCounter - 1);
  };
  console.log(increment);

  return (
    <View style={{flex: 1, backgroundColor: colors.gold}}>
      <Text>Counter: {counter}</Text>
      <Button title="Increment" onPress={increment} />
      <Button title="Decrement" onPress={decrement} />
    </View>
  );
};

export default Counter;
