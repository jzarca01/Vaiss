import React, { Component } from 'react';
import SafariView from 'react-native-safari-view';
import { Card, CardItem, Text, Button } from 'native-base';
import { _pressHandler } from '../containers/actions';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

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

       <CardItem style={{flex: 1}}>
           <Image style={{ resizeMode: 'cover', height: 240}} source={{uri : this.props.url}} indicator={ProgressBar} />
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
