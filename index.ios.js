/* Required */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator
} from 'react-native';

import NewsItemsContainer from './components/news-items-container';
import * as viewReducers from './reducers/view';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

let store = createStore(combineReducers(viewReducers), applyMiddleware(thunk));

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

class App extends Component {

 render() {
   return (
     <NewsItemsContainer />
   );

 }
}

class Vaiss extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
/* Main */
AppRegistry.registerComponent('Vaiss', () => Vaiss);
