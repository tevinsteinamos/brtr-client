
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import {
    Text, H2,
    Thumbnail,
    ListItem
} from 'native-base';

import styles from './styles.js'
import moment from 'moment'
class ProfileDetail extends Component {

    render() {
        const {navigator, items} = this.props
        return (
            <ListItem
                style={[styles.container, styles.noBottomBorder]} onPress={() => navigator.push({id: 'itemDetail', ItemId: items.id})}>
                <Thumbnail square size={70} source={{uri: items.photo}} />
                <H2 style={styles.text}>{items.name}</H2>
                <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
            </ListItem>

        );
    }
}

export default ProfileDetail
