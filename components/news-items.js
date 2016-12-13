/* Required */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';

import * as viewReducers from '../reducers/viewReducer';

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



function Header(props) {
  return (
    <Text style={styles.welcome}>{props.title}</Text>
  );
}


export default class NewsItems extends Component {

  static propTypes = {
    selectedTab : PropTypes.string.isRequired,
    json_feed : PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    loading:  PropTypes.bool.isRequired,
    loadData: PropTypes.func.isRequired,
    changeView: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadData(this.props);
  }

  _changeView(el) {
    this.props.changeView({'loading': true, 'json_feed': el.props.value, 'selectedTab': el.props.name});
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.json_feed !== this.props.json_feed) {
        return this.props.loadData(this.props)
      }
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
          <Header title={this.props.selectedTab} />
          <Image style={styles.bgImage} source={require('../img/l4hLRa7nHSvd4qgG4.gif')} />

          {this._renderLoading()}
          {this._renderContent()}

          <Tabs selected={this.props.json_feed} style={styles.tabbar}
                selectedStyle={{color:'red'}} onSelect={el=>this._changeView(el)}>
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
