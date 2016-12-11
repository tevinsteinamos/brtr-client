
import React, { Component } from 'react';
import { Image, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
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
import navigateTo from '../../actions/bottomNav';

import decode from 'jwt-decode'

class ProfileDetail extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),

    }

    navigateTo(route, data) {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ini kirim id: ", data)
        this.props.navigateTo(route, 'detailProfile', data);
    }

    render() {
        const {items} = this.props
        return (
            <CardItem onPress={() => this.navigateTo('itemDetail', items.id)}>
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

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute, data) => dispatch(navigateTo(route, homeRoute, data)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(ProfileDetail);
