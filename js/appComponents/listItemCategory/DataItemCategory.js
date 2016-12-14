
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
    View
} from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';
import styles from './styles';

import decode from 'jwt-decode'

class DataItemCategory extends Component {

    render() {
        const {navigator, items} = this.props
        return (
            <CardItem
                style={{borderBottomWidth: 0}}
                onPress={() => navigator.push({id: 'itemDetail', ItemId: items.id})}
            >
                <Image
                    style={{
                                    resizeMode: 'cover',
                                    width: null,
                                    opacity: 0.6
                                }}
                    source={{uri: items.photo}}>
                    <View style={{paddingLeft: 10}}>
                        <H1 style={{color: 'white'}}>{items.name}</H1>
                        <Text style={styles.textColor} note>by <Text style={{color: '#2EFFD0'}}>{(items.User) ? items.User.username : ''}</Text></Text>
                    </View>
                </Image>
            </CardItem>
        );
    }
}

export default DataItemCategory
