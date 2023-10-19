import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

const Helloss = () => {
  const [data, setData] = useState('');
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then(response => response.json())
    .then(json => setData(json));

  return (
    <View>
      <Text>{data.title}</Text>
    </View>
  );
};

export default Helloss;

const styles = StyleSheet.create({});
