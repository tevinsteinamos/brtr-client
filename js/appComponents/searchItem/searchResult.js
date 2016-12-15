import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    View,
    Spinner,
    H3
} from 'native-base';

import styles from './styles';
import moment from 'moment'

class SearchResult extends Component {

  render() {
      const {items, navigator} = this.props
      return (


          <Grid>
            <Col>
                <CardItem
                    style={{borderBottomWidth: 0}}
                    onPress={() => navigator.push({id: 'itemDetail', ItemId: items.id})}>
                    <Image
                        style={{
                    resizeMode: 'cover',
                    width: null,
                    opacity: 0.6,
                }}
                        source={{uri: items.photo}}>
                        <View style={{paddingLeft: 15, paddingTop: 10}}>
                            <H3 style={styles.text}>{items.name}</H3>
                            <Text note style={styles.text}>By <Text style={styles.name}>{(items.User) ? items.User.username : ''}</Text></Text>
                            <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
                        </View>
                    </Image>
                </CardItem>
            </Col>
        </Grid>
      );
  }
}


export default SearchResult
