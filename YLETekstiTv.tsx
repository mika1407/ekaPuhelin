import React, {useEffect, useState} from 'react';
import { Text, View, StyleSheet, Image, Platform, ScrollView, TextInput, Button} from 'react-native';
import { API_id, API_key } from './APIKeyYLE';
import { AntDesign } from '@expo/vector-icons';


export default function YLETekstiTV() {
    const [imageUrl, setUrl] = useState<string>();
    const [inputPage, changeInputPage] = useState(100);
    var url = 'https://external.api.yle.fi/v1/teletext/images/' + inputPage + '/1.png?app_id=' + API_id + '&app_key=' + API_key ;

    useEffect(() => {
        fetch (url).then(function(response){
            var responseData = response.status
            if (responseData === 404) {
                setUrl('https://yle.fi/uutiset/assets/img/share_image_v1.png')
            }
            else{
                setUrl(url)
            }
        })
    })
      
  return (
      <View style={styles.mainContainer}>
          <ScrollView contentContainerStyle={styles.scrollViewPage}>
              <Text style={styles.title}>Ylen tekstitv:n pääsivu!!!</Text>
              <View style={styles.separatorLine} />
              <View style={styles.searchSection}>

                <AntDesign name="stepbackward" size={24} color="blue" onPress={() => changeInputPage(inputPage-1)} />
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', fontSize: 22, textAlign: 'center', margin: 2, width: 240 }}
                    onChangeText={(text) => changeInputPage(Number(text))}
                    value={inputPage.toString()}
                />
                <AntDesign name="stepforward" size={24} color="blue" onPress={() => changeInputPage(inputPage+1)} />
              </View>
              <View style={styles.imageSection}>
                <Image
                  style={styles.yleTextTV}
                  resizeMode={'contain'}
                  source={{ uri: imageUrl,
                    }}
                  />
              </View>
          </ScrollView>
      </View>
  );
}


//***********************************
//Tyylimäärittelyt
//***********************************
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, 
    },

    scrollViewPage: {
        justifyContent: 'center',
        paddingTop: 0,
    },

    searchSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageSection: {
        flex: 2,
    },

    yleTextTV: {
        width: '100%',
        height: Platform.OS === 'android' ? '100%' : 240,
        aspectRatio: 1.5,
        marginTop: 1,
    },

    title: {
        fontSize: 26,
        fontWeight: '300',
        letterSpacing: 7,
        textShadowOffset: { width: 1, height: 1 },
        textShadowColor: '#D1D1D1',
        textAlign: 'center',
        color: '#333',
    },

    separatorLine: {
        marginVertical: 5,
        height: 1,
        width: '100%',
        backgroundColor: '#eee',
    },

 });
