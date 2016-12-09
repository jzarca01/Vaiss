/* Required */
import React, { Component, PropType } from 'react';
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


class NewsItems extends Component {

  static propTypes = {
    selectedTab : PropType.string.isRequired,
    json_feed : PropType.string.isRequired,
    data: PropType.array.isRequired,
    loading:  PropType.bool.isRequired,
  }

  _renderContent() {
    return (
      <ScrollView style={{"flex": 1}}>
        {this.state.view.data.map(createNewsItem)}
      </ScrollView>
    );
  }

  _renderLoading() {
    return (
      <Spinner
        visible={this.props.view.loading}
        textContent={"Chargement des derniers articles..."}
        textStyle={{color: '#FFF'}} />
    );
  }

  render() {
    return (
        <View style={styles.container}>
          {Header(this.props.view.selectedTab)}
          <Image style={styles.bgImage} source={require('../img/l4hLRa7nHSvd4qgG4.gif')} />

          {this._renderLoading()}
          {this._renderContent()}

          <Tabs selected={this.props.view.json_feed} style={styles.tabbar}
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
