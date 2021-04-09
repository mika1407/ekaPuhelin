import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HelloWorld from './HelloWorld';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.upperx}>
        <Text>Tämä on minun ensimmäinen react native- sovellus!</Text>
      </View>
      <View style={styles.centerx}>
        <Text>Tätä kehitetään vielä hieman!</Text>
      </View>
      <View style={styles.lowerx}>
       <HelloWorld/>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'burlywood',
    alignItems: 'center',
    justifyContent: 'center',
  },
  upperx: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerx: {
    flex: 2,
    width: '100%',
    backgroundColor: 'orange',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerx: {
    flex: 3,
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
