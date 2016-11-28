/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

/* Required */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Navigator
} from 'react-native';

 /* Components added */
 import {
   Card,
   CardImage,
   CardTitle,
   CardContent,
   CardAction
 } from 'react-native-card-view';
/*    */

/* Stylesheet */
const styles = StyleSheet.create({
  title: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    marginTop: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  imgWelcome: {
    flex: 0.5,
    height: 100
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

/* Components */

function Header(title) {
    return (
      <Text style={styles.welcome}>{title}</Text>
    );
}

class PageItem extends Component {

  render() {
    return (
      <View style={styles.container}>
        {Header("Page Vaïss")}
      </View>
    );
  }
}

module.exports = PageItem;
