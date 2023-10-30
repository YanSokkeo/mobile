import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {atom, useAtom} from 'jotai';

const counterAtom = atom(0);

export const useCounter = () => useAtom(counterAtom);
