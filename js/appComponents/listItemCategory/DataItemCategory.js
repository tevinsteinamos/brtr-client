
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {
    Text, H3,
    ListItem,
    Thumbnail,
} from 'native-base';
import styles from './styles';
import moment from 'moment'

class DataItemCategory extends Component {

    render() {
        const {navigator, items} = this.props
        return (
            <ListItem style={[styles.container, styles.noBottomBorder]} onPress={() => navigator.push({id: 'itemDetail', ItemId: items.id})}>
                <Thumbnail square size={90} source={{uri: items.photo}} />
                <H3 style={styles.text}>{items.name}</H3>
                <Text note style={styles.text}>By <Text style={styles.name}>{(items.User) ? items.User.username : ''}</Text></Text>
                <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
            </ListItem>

        );
    }
}

export default DataItemCategory
