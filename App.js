import React, { useEffect } from 'react';
import { YellowBox } from 'react-native';
import { firebaseApp } from './app/utils/firebase';
import Navigation from './app/navigations/Navigation';
import { decode, encode } from 'base-64';

YellowBox.ignoreWarnings([
  "Setting a timer",
  "Animated: `useNativeDriver` was"
]);

if (!global.btoa) {
  global.btoa = encode;
}

if (!global.atob) {
  global.atob = decode;
}

export default function App() {

  return (
    <Navigation />
  );
}
