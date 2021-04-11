import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import HelloWorld from './HelloWorld';
import HelloWorldInput from './HelloWorldInput';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.upperx}>
        <Text>Tämä on minun ensimmäinen react native- sovellus!</Text>
      </View>
      <View style={styles.centerx}>
        <Text style={styles.titleText}>Tätä kehitetään vielä hieman...</Text>
              <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
      </View>
      {/* <Image
        style={styles.tinyLogo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      /> */}
      <View style={styles.lowerx}>
       <HelloWorldInput/>
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
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerx: {
    flex: 2,
    width: '100%',
    backgroundColor: 'orange',
    fontFamily: "Cochin",
    alignItems: 'center',
    justifyContent: 'center',
  },
    tinyLogo: {
    width: 40,
    height: 40,
  },
    titleText: {
    fontSize: 29,
    fontWeight: "bold"
  },
  lowerx: {
    flex: 3,
    width: '100%',
    backgroundColor: '#aafabf',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
