import 'react-native-gesture-handler';
import React from 'react';
import { Roboto_400Regular, Roboto_500Medium, useFonts } from '@expo-google-fonts/roboto';
import { AppLoading } from 'expo';

import Aplication from './src';

export default function App() {
  const [isLoaded] = useFonts({
    Roboto400: Roboto_400Regular,
    Roboto500: Roboto_500Medium,
  });

  if (!isLoaded) return <AppLoading />

  return <Aplication />
}

