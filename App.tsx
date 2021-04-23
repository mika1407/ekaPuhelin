import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //Navigaatio -komponentin import
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5, Octicons } from '@expo/vector-icons'; //vector-icons tuodaan näin
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View } from 'react-native';

//Omat sovelukset alkaa tästä
import HelloWorld from './HelloWorld';
import HelloWorldInput from './HelloWorldInput';
import JsonList from './JsonList';
import JsonListPressable from './JsonListPressable';
import YLETekstiTV100 from './YLETekstiTV100';
import YLETekstiTv from './YLETekstiTv';

export default function App() {
      //Muuttujien esittely:
      const Tab = createMaterialTopTabNavigator(); //Swipe navi -muuttuja
      const iconSize = 22; //Määritellään ylänavin iconien koko
  
  return (
    <NavigationContainer>
        {/* SWIPE -NÄKYMÄ: https://reactnavigation.org/docs/material-top-tab-navigator/ */}
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: '#ffffff', //Aktiivisen 'linkin' väri
                inactiveTintColor: '#000000',//Inaktiivisen 'linkin' väri
                showLabel: false, //Näytetäänkö navigaatio vai ei
                labelStyle: { fontSize: 10 }, //stylemääritykset tähän
                showIcon: true, //Ikonin näyttö, jos sellainen määritelty
                //scrollEnabled: true, //Whether the tab column can be scrolled (when the total number of tabs exceeds one screen)
                indicatorStyle: { height: 50 }, //Indicator style height: 0 is not displayed
                style: { backgroundColor: '#31b3c0', paddingTop: 40, }, //Set the entire tabbar style (background color, etc.)
            }}
        >
            {/* Perustilanne ilman ikoneita */}
            {/* <Tab.Screen name="HelloWorld" component={HelloWorld} />
            <Tab.Screen name="HelloWorldInput" component={HelloWorldInput} />
            <Tab.Screen name="JsonList" component={JsonList} />
            <Tab.Screen name="JsonListPressable" component={JsonListPressable} />
            <Tab.Screen name="YLETekstiTV100" component={YLETekstiTV100} />
            <Tab.Screen name="YLETekstiTv" component={YLETekstiTv} /> */}

            <Tab.Screen name="HelloWorld" component={HelloWorld} options={{ tabBarIcon: () => <Octicons name="home" color="#333" size={iconSize} /> }} />
            <Tab.Screen name="HelloWorldInput" component={HelloWorldInput} options={{ tabBarIcon: () => <Octicons name="keyboard" color="#333" size={iconSize} /> }} />
            <Tab.Screen name="JsonList" component={JsonList} options={{ tabBarIcon: () => <Octicons name="database" color="#333" size={iconSize} /> }} />
            <Tab.Screen name="JsonListPressable" component={JsonListPressable} options={{ tabBarIcon: () => <Octicons name="desktop-download" color="#333" size={iconSize} /> }} />
            <Tab.Screen name="YLETekstiTV100" component={YLETekstiTV100} options={{ tabBarIcon: () => <Octicons name="broadcast" color="#333" size={iconSize} /> }} />
            <Tab.Screen name="YLETekstiTv" component={YLETekstiTv} options={{ tabBarIcon: () => <Octicons name="list-unordered" color="#333" size={iconSize} /> }} />

        </Tab.Navigator>
    </NavigationContainer>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'burlywood',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  upperx: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  centerx: {
    flex: 1,
    width: '100%',
    backgroundColor: 'orange',
    fontFamily: "Cochin",
    alignItems: 'center',
    justifyContent: 'center',
  },
  lowerx: {
    flex: 4,
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCareeria: {
    width: 230,
    height: 67,
    margin: 12,
    padding: 10,
  }
});
