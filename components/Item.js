import React, { Component } from 'react';
import { Image } from 'react-native';

import SafariView from 'react-native-safari-view'
import { Card, CardItem, Text, Button } from 'native-base';

import { _pressHandler } from '../containers/actions'

export default class Item extends Component {

  constructor(props) {
      super(props);
    }

  render() {
    return (
   <Card style={{ flex: 0 }}>
       <CardItem>
           <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>{this.props.title}</Text>
       </CardItem>

       <CardItem>
           <Image style={{ resizeMode: 'cover', width: null }} source={{uri : this.props.url}} />
       </CardItem>

       <CardItem>
         <Text>{this.props.content}</Text>
         <Button onPress={() => _pressHandler(this.props.link)}>
            Lire
         </Button>
       </CardItem>
  </Card>
    );
  }
}
