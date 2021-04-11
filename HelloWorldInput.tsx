import React,{useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

export default function HelloWorldInput() {
  //HOOKS-muuttujat:
  const [counter, setCounter] = React.useState(0);
  const [name, setName] = useState('');
  const [outputName, changeOutputName] = useState('');
  //Esitellään array, johon nimet tallennetaan
  const [array, setArray] = useState<string[]>([]);
  //Functio, jota buttoni kutsuu:
  const showName = (name: string) => {
    changeOutputName(name);
    setArray(array => [...array, '\n' + name]);
  }

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <ScrollView style={styles.scrollView} fadingEdgeLength={180}>
      <View style={styles.container2}>
        <View > 
          <Text style={styles.titleText} >Laskuri:</Text>
        </View>
        <View >
          <Text style={styles.bigCentered}>{counter}</Text>
        </View>
        <View>
          <Text style={{fontSize: 22 }}>Anna nimi:</Text>
          <TextInput
              style = {{height: 40, borderColor: 'gray', backgroundColor: 'white', padding: 4, borderWidth: 1, margin: 3}}
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Nimi tähän"
          />
          <Button 
              title="Lisää henkilö"
              onPress={() => showName(name)}
          />
          {/* <Text style={styles.titleText}>{outputName}</Text> */}
          <Text style={styles.titleText}>{array}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    titleText: {
    fontSize: 25,
    padding: 4,
    fontWeight: "bold"
  },
  bigCentered: {
    color: 'blue',
    fontSize: 48,
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
    marginVertical: 10,
  }
});