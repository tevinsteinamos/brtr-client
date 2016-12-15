import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import {
    Text, H3,
    Thumbnail,
    ListItem,
} from 'native-base';

import styles from './styles';
import moment from 'moment'

class EachMessage extends Component {

    render() {
        const {items, title, itemMessageId, navigator, activeUser} = this.props
        if (activeUser.id == items.Item.User.id) {
            return (
                <ListItem style={styles.noBottomBorder} onPress={() => navigator.push({id: 'messageDetail', itemMessageId: itemMessageId, title: title})}>
                    <Thumbnail
                        square size={90}
                        source={(items.Item2.User.avatar) ? {uri: items.Item2.User.avatar} : require('../../../img/img-placeholder.png')} />
                    <H3 style={styles.text}>{items.title}</H3>
                    <Text note style={styles.text}>From <Text style={styles.name}>{items.Item2.User.username}</Text></Text>
                    <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
                </ListItem>
            );
        } else if (activeUser.id == items.Item2.User.id){
            return (
                <ListItem style={styles.noBottomBorder} onPress={() => navigator.push({id: 'messageDetail', itemMessageId: itemMessageId, title: title})}>
                    <Thumbnail
                        square size={90}
                        source={(items.Item.User.avatar) ? {uri: items.Item.User.avatar} : require('../../../img/img-placeholder.png')} />
                    <H3 style={styles.text}>{items.title}</H3>
                    <Text note style={styles.text}>To <Text style={styles.name}>{items.Item.User.username}</Text></Text>
                    <Text style={{color: '#fff'}}>{moment(items.createdAt).fromNow()}</Text>
                </ListItem>
            );
        } else {
            return (
                <ListItem style={styles.noBottomBorder} onPress={() => navigator.push({id: 'messageDetail', itemMessageId: itemMessageId, title: title})}>
                    <Thumbnail square size={90} source={{uri: items.Item.User.avatar}} />
                    <H3 style={styles.text}>DIZZY</H3>
                    <Text note style={styles.text}>
                        To
                        <Text style={styles.name}>{items.Item.User.username}</Text>
                    </Text>
                    <Text style={{color: '#fff'}}>
                        {moment(items.createdAt).fromNow()}
                    </Text>
                </ListItem>
            );
        }
    }
}

export default EachMessage
