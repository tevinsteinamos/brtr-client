
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
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
    Thumbnail,
    View,
    List,
    ListItem
} from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import styles from './styles.js'
import decode from 'jwt-decode'
import moment from 'moment'
class ProfileDetail extends Component {

    render() {
        const {navigator, items} = this.props
        return (
            <ListItem
                style={[styles.container, styles.noBottomBorder]} onPress={() => navigator.push({id: 'itemDetail', ItemId: items.id})}>
              <Thumbnail square size={90} source={{uri: items.photo}} />
              <H3 style={styles.text}>{items.name}</H3>
              <Text note style={styles.text}>By <Text style={styles.name}>{(items.User) ? items.User.username : ''}</Text></Text>
              <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
            </ListItem>

        );
    }
}

export default ProfileDetail
