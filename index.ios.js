/* Required */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import NewsItems from './components/news-items';
import PageItem from './components/page-item';

const routes = {
  news_items: NewsItems,
  page_item: PageItem
}

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

class Vaiss extends Component {

  renderScene(route, navigator) {
   let Component = routes[route.name];
   return (
       <Component route={route} navigator={navigator} url={route.url} />
   );
 }

 render() {
   return (
     <Navigator
       style={styles.container}
       initialRoute={{name: 'news_items', url: ''}}
       renderScene={this.renderScene}
       configureScene={() => { return Navigator.SceneConfigs.FloatFromRight; }} />
   );

 }
}


/* Main */
AppRegistry.registerComponent('Vaiss', () => Vaiss);
