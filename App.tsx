import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import HelloWorld from './HelloWorld';
import HelloWorldInput from './HelloWorldInput';
import JsonList from './JsonList';

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
            <JsonList />
      </View>

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
    flex: 2,
    width: '100%',
    backgroundColor: 'orange',
    fontFamily: "Cochin",
    alignItems: 'center',
    justifyContent: 'center',
  },
    titleText: {
    fontSize: 29,
    fontWeight: "bold"
  },
  lowerx: {
    flex: 3,
    width: '100%',
    backgroundColor: '#404040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCareeria: {
    width: 230,
    height: 67,
    margin: 12,
  }
});
