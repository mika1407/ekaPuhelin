import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import HelloWorld from './HelloWorld';
import HelloWorldInput from './HelloWorldInput';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.upperx}>
        {/* tuodaan Careerian logo image sivulle */}
        <View style={{alignItems: 'center', paddingTop: 15}}>
          <Image
              style={styles.logoCareeria}
              source={{
                uri: 'https://careeria.fi/Static/careeria/careeria_logo_alpha_230x67_once.gif',
              }}
          />
        </View>
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
    paddingBottom: 10,
  },
  centerx: {
    flex: 1,
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
    flex: 4,
    width: '100%',
    backgroundColor: '#aafabf',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCareeria: {
    width: 230,
    height: 67,
    margin: 12,
  }
});
