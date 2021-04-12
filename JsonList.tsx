import React from 'react';
import { Text, View, FlatList, Button } from 'react-native'; //Tänne importteihin kaikki komponentit
import styles from './styles'; //Tuotu erillinen tyylitiedosto

export default function JsonList() {
  //Muuttuja johon haettava JSONdatatallennetaan
  const [jsonData, setJsonData] = React.useState();
  //HaetaanJSONdatajsonplaceholderistaja kirjoitetaanse  jsonData-muuttujaan
  const getData= () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response)=> response.json())
      .then((responseData)=> {
        setJsonData(responseData);
      })
    }
    return (
      <View>
        <Button
          onPress={() => getData()}
          title="Lataa TODO-lista"
          color="#556B2F"
        />
        <FlatList
          data={jsonData} //FlatListillekerrotaanmitädataakäytetään
          keyExtractor={(item) => item.id .toString() } //käyttääJSONistatulevaa"avainta"
          renderItem={({ item}) => ( //OtetaanobjektiitemjsonDataobjektiesiintymästä
            <View>
              <View style={styles.separatorLine} />
              <Text style={styles.itemItalic}>UserId:{item.userId.toString()}</ Text>
              <Text style={styles.itemBolded}>Title: {item.title}</Text>
              <Text>Status:{item.completed.toString()}</ Text>
            </View>
            )}
          />
      </View>
    );
}