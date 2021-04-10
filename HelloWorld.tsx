import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function HelloWorld() {
  const [counter, setCounter] = React.useState(0);
  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <View style={styles.container2}>
      <View > 
        <Text style={styles.titleText2}>Laskuri:</Text>
      </View>
      <View >
        <Text style={styles.bigCentered}>{counter}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    titleText2: {
    fontSize: 29,
    fontWeight: "bold"
  },
  bigCentered: {
    color: 'blue',
    fontSize: 172,
    textAlign: 'center',
  },
});