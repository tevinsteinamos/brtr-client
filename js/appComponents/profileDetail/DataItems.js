
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

import decode from 'jwt-decode'

class ProfileDetail extends Component {

    render() {
        const {navigator, items} = this.props
        return (
            <CardItem onPress={() => navigator.push({id: 'itemDetail', ItemId: items.id})}>
                <Image
                    style={{
                        resizeMode: 'cover',
                        width: null
                    }}
                    source={{uri: items.photo}}>
                </Image>
            </CardItem>
        );
    }
}

export default ProfileDetail
