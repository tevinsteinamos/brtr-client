
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage, Alert } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import {
    Button,
    Icon,
    Footer,
    FooterTab,
} from 'native-base';

class FooterNav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tab1: this.props.tab1,
            tab2: this.props.tab2,
            tab3: this.props.tab3,
        };
    }

    render() {
        const {navigator} = this.props

        return (

            <FooterTab>
                <Button
                    active={this.state.tab1} onPress={() => navigator.resetTo({id: 'home'})}>
                    <Icon name='md-home' />
                </Button>
                <Button active={this.state.tab2} onPress={() => navigator.resetTo({id: 'addItem'})} >

                    <Icon name='md-add-circle' />
                </Button>
                <Button active={this.state.tab3} onPress={() => navigator.resetTo({id: 'profileDetail'})} >

                    <Icon name='ios-person' />
                </Button>
            </FooterTab>

        );
    }
}

export default FooterNav
