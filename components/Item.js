import React, { Component } from 'react';
import { Text } from 'react-native'
import { Card, ListItem, Button } from 'react-native-elements'
import { _pressHandler } from '../actions/actions';
import ProgressBar from 'react-native-progress/Bar';

export default class Item extends Component {

  constructor(props) {
      super(props);
    }

  render() {
    return (
      <Card
      title={this.props.title}
      image={{uri : this.props.url}} indicator={ProgressBar}>
        <Text style={{margin: 10}}>
          {this.props.content}
        </Text>
        <Button onPress={() => _pressHandler(this.props.link)}
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title="Lire l'article"/>
      </Card>
    );
  }
}
