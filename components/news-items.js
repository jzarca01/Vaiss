/* Required */
import React, { Component, PropTypes } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  Alert,
} from 'react-native';

import { menuContent } from './menuContainer'
import * as viewReducers from '../reducers/viewReducer';

 /* Components added */
 import { Header, Title, Button, Icon } from "native-base";
 import Tabs from 'react-native-tabs';
 import Item from './Item.js';
 import Spinner from 'react-native-loading-spinner-overlay';



/* Stylesheet */
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  menuItem: {
    fontSize: 10
  }
});

/* Functions */
function createHeader(el) {
  return (
        <Header>

            <Title>{el.title}</Title>

            <Button transparent
              onPress={() => Alert.alert(
                    'Vaïss',
                    "Fait par Jérémie Zarca, avec beaucoup d'amour.",
                    [
                      {text: 'Merci Vaïss c\'est top !', onPress: () => console.log('OK Pressed!')},
                    ]
                  )}>
                <Icon name='ios-information-circle' />
            </Button>

        </Header>
  );
}

let createNewsItem = (el, i) => <Item key={i} title={el.title} url={(el.thumbnail) ? el.thumbnail : el.enclosure.link} content={el.description} link={el.link}></Item>
let createMenuItem = (el, i) => <Text style={styles.menuItem} key={i} name={el.name} value={el.value}>{el.name}</Text>


/* Classes */
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

  _renderMenu() {
    return (
      <Tabs selected={this.props.selectedTab} style={styles.tabbar}
            selectedStyle={{fontWeight:'bold'}} onSelect={el=>this._changeView(el)}>
            {menuContent.map(createMenuItem)}
      </Tabs>
    )
  }

  _renderContent() {
    return (
      <ScrollView style={{"marginTop": 10, "flex": 1}}>
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
          {createHeader({"title":this.props.selectedTab}) }

          {this._renderLoading()}
          {this._renderContent()}
          {this._renderMenu()}
        </View>
      );
    }
}
