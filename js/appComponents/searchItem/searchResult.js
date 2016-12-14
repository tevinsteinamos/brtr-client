import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
    Container,
    Header,
    Title,
    Content,
    Text, H3, H2, H1,
    Button,
    Icon,
    Footer,
    FooterTab,
    Card,
    CardItem,
    List,
    ListItem,
    Thumbnail,
    View,
    Input,
    InputGroup
} from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';
import decode from 'jwt-decode'
import moment from 'moment'

class SearchResult extends Component {

  render() {
      const {items, navigator} = this.props
      console.log('searchit : ', items);
      return (
          <ListItem style={styles.container, styles.noBottomBorder} onPress={() => navigator.push({id: 'itemDetail', ItemId: items.id})}>
            <Thumbnail square size={90} source={{uri: items.photo}} />
            <H3 style={styles.text}>{items.name}</H3>
            <Text note style={styles.text}>By <Text style={styles.name}>{(items.User) ? items.User.username : ''}</Text></Text>
            <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
          </ListItem>

      );
  }
}


export default SearchResult
