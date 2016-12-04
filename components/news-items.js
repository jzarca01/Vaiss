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
 import Tabs from 'react-native-tabs';
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
  bgImage: {
    position: 'absolute',
    flex: 1,
    resizeMode: "cover"
  }
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

  _pressHandler() {
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
           <Text2 style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{this.props.title}</Text2>
       </CardItem>

       <CardItem>
           <Image style={{ resizeMode: 'cover', width: null }} source={{uri : this.props.url}} />
       </CardItem>

       <CardItem>
         <Text2>{this.props.content}</Text2>
         <Button onPress={() => this._pressHandler()}>
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
      data : [],
      json_feed: 'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.vice.com%2Ffr%2Frss',
    };
  }

  getData() {
    fetch(this.state.json_feed)
      .then((response) => response.json())
      .then((responseData) => {
        console.log('a');
        this.setState({data: responseData.items});
      })
  }

  render() {
    return (
      <View style={styles.container}>
        {Header("Vaïss")}
        <Image style={styles.bgImage} source={require('../img/l4hLRa7nHSvd4qgG4.gif')} />
        <Tabs selected={this.state.json_feed} style={{top: 0, position: 'absolute', backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>this.setState({'json_feed': el.props.value})}>
            <Text value="https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.vice.com%2Ffr%2Frss">Vice</Text>
            <Text value="https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmunchies.vice.com%2Ffr%2Ffeed">Munchies</Text>
            <Text value="https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnoisey.vice.com%2Ffr%2Frss">Noisey</Text>
            <Text value="https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fthecreatorsproject.vice.com%2Ffr%2Frss">The Creators Project</Text>

        </Tabs>
        <ScrollView style={styles.container}>
          {this.state.data.map(createNewsItem)}
        </ScrollView>
      </View>
    );
  }

  componentWillMount() {
    this.getData();
  }

  shouldComponentUpdate(nextProps, nextState){
      // return a boolean value
      return true;
  }

  componentWillUpdate() {
    this.getData();
  }

}

let createNewsItem = (el, i) => <Item key={i} title={el.title} url={(el.thumbnail) ? el.thumbnail : el.enclosure.link} content={el.description} link={el.link}></Item>

module.exports = NewsItems;
