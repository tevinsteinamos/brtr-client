
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

class DataCategories extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),

    }

    render() {
        const {items} = this.props
        console.log("ini categories items:")
        console.log("ini categories items: ", items)
        return (
            <Item label="Other" value="key2" />
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

export default connect(mapStateToProps, bindAction)(DataCategories);
