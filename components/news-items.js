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
  Navigator,
  TouchableOpacity,
  WebView
} from 'react-native';

 /* Components added */
 import { Container, Content, Card, CardItem, Thumbnail, Text as Text2, Button, Icon } from 'native-base';
 import SafariView from 'react-native-safari-view'

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



function Header(title) {
    return (
      <Text style={styles.welcome}>{title}</Text>
    );
}

class Item extends Component {

  constructor(props) {
      super(props);
    }

  _pressHander() {
    console.log(this.props.link);
    SafariView.isAvailable()
      .then(SafariView.show({
        url: this.props.link,
        readerMode: true
      }))
      .catch(error => {
        // Fallback WebView code for iOS 8 and earlier
      });
    }

  render() {
    return (
   <Card style={{ flex: 0 }}>
       <CardItem>
           <Text2>{this.props.title}</Text2>
       </CardItem>

       <CardItem>
           <Image style={{ resizeMode: 'cover', width: null }} source={{uri : this.props.url}} />
       </CardItem>

       <CardItem>
         <Text2>{this.props.content}</Text2>
         <Button onPress={() => this._pressHandler}>
            Lire
         </Button>
       </CardItem>
  </Card>
    );
  }
}

class NewsItems extends Component {
  constructor() {
    super();
    this.state = {
      data : []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {Header("Vaïss")}
        <ScrollView style={[styles.container, {backgroundColor: 'black'}]}>
          {this.state.data.map(createNewsItem)}
        </ScrollView>
      </View>
    );
  }

  componentWillMount() {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.vice.com%2Ffr%2Frss")
      .then((response) => response.json())
      .then((responseData) => {
        console.log('a');
        this.setState({data: responseData.items});

      })
      .done();
  }
}

var createNewsItem = (el, i) => <Item key={i} title={el.title} url={el.thumbnail} content={el.description} link={el.link}></Item>

module.exports = NewsItems;
