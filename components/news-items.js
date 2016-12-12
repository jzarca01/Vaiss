/* Required */
import React, { Component, PropTypes } from 'react';
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

import * as viewReducers from '../reducers/view';

 /* Components added */
 import Tabs from 'react-native-tabs';
 import Item from './Item.js';
 import Spinner from 'react-native-loading-spinner-overlay';


/* Stylesheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  bgImage: {
    position: 'absolute',
    flex: 1,
    resizeMode: "cover"
  },
  tabbar: {
    bottom: 0,
    position: 'absolute',
    backgroundColor:'white'
  }
});



function Header(title) {
    return (
      <Text style={styles.welcome}>{title}</Text>
    );
}


export default class NewsItems extends Component {

  static propTypes = {
    selectedTab : PropTypes.string.isRequired,
    json_feed : PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    loading:  PropTypes.bool.isRequired,
  }

  _renderContent() {
    return (
      <ScrollView style={{"flex": 1}}>
        {this.props.data.map(createNewsItem)}
      </ScrollView>
    );
  }

  _renderLoading() {
    return (
      <Spinner
        visible={this.props.loading}
        textContent={"Chargement des derniers articles..."}
        textStyle={{color: '#FFF'}} />
    );
  }

  render() {
    return (
        <View style={styles.container}>
          {Header(this.props.selectedTab)}
          <Image style={styles.bgImage} source={require('../img/l4hLRa7nHSvd4qgG4.gif')} />

          {this._renderLoading()}
          {this._renderContent()}

          <Tabs selected={this.props.json_feed} style={styles.tabbar}
                selectedStyle={{color:'red'}} onSelect={el=>this.setState({'loading': true, 'json_feed': el.props.value, 'selectedTab': el.props.name})}>
              <Text name="Vice" value="https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fwww.vice.com%2Ffr%2Frss">Vice</Text>
              <Text name="Munchies" value="https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmunchies.vice.com%2Ffr%2Ffeed">Munchies</Text>
              <Text name="Noisey" value="https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fnoisey.vice.com%2Ffr%2Frss">Noisey</Text>
              <Text name="The Creators Project" value="https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Fthecreatorsproject.vice.com%2Ffr%2Frss">The Creators Project</Text>
          </Tabs>

        </View>
      );
    }
}

let createNewsItem = (el, i) => <Item key={i} title={el.title} url={(el.thumbnail) ? el.thumbnail : el.enclosure.link} content={el.description} link={el.link}></Item>
