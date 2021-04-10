import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function HelloWorldInput() {
  //HOOKS-muuttujat:
  const [counter, setCounter] = React.useState(0);
  const [name, setName] = useState('');
  const [outputName, changeOutputName] = useState('');
  //Functio, jota buttoni kutsuu:
  const showName = (name: string) => {
    changeOutputName(name);
  }

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <View style={styles.container2}>
      <View > 
        <Text >Terve maailma!</Text>
      </View>
      <View >
        <Text style={styles.bigCentered}>{counter}</Text>
      </View>
      <View>
        <Text>Anna nimi:</Text>
        <TextInput
            style = {{height: 40, borderColor: 'gray', borderWidth: 1, margin: 2}}
            onChangeText={text => setName(text)}
            value={name}
        />
        <Button 
            title="Lisää henkilö"
            onPress={() => showName(name)}
        />
        <Text>{outputName}</Text>
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
  bigCentered: {
    color: 'blue',
    fontSize: 48,
    textAlign: 'center',
  },
});