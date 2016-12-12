
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

import {getItemsByUserId} from '../../actions/items';
import navigateTo from '../../actions/bottomNav';

import styles from './styles';
import ArizTheme from '../../themes/prof-empty-theme.js'
const logo = require('../../../img/logo.png');
const cardImage = require('../../../img/drawer-cover.png');
const camera = require('../../../img/camera.png');
const swiper2 = require('../../../img/swiper-2.png');
const swiper3 = require('../../../img/swiper-3.png');
const swiper4 = require('../../../img/swiper-4.png');
import myTheme from '../../themes/base-theme';

import decode from 'jwt-decode'

import DataItems from './DataItems'

const {
    replaceAt,
} = actions;

class ProfileDetail extends Component {

    static propTypes = {
        openDrawer: React.PropTypes.func,
        navigateTo: React.PropTypes.func,
        replaceAt: React.PropTypes.func,
        navigation: React.PropTypes.shape({
            key: React.PropTypes.string,
        }),

    }

    constructor(props) {
        super(props);
        this.state = {
            tab1: false,
            tab2: false,
            tab3: true,
            dataUser: {},
            messages: []
        };
    }


    componentDidMount() {
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            console.log("value: ", value)
            if (value !== null){
                this.setState({dataUser: decode(value)});
                this.props.getItemsByUserId(value)
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                console.log("else")
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            console.log("catch")
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };

    navigateTo(route) {
        this.props.navigateTo(route, 'profileDetail');
    }

    logoutUser = async() => {
        try {
            await AsyncStorage.removeItem("myKey");
            this.navigateTo('loginPage')
        } catch (error) {
            console.log("err")
        }
    }


    render() {
        const {items} = this.props
        console.log("ini props di profile: ", this.props)
        console.log("ini item props di profile: ", items)


        let ItemNodes = items.map(function (item) {
            return(
                <DataItems key={item.id} items={item} />
            )
        })

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent onPress={() => this.navigateTo('home')}>
                        Back
                    </Button>
                    <Button transparent onPress={() => this.navigateTo('editProfile')}>
                        Edit
                    </Button>
                </Header>

                <Content>
                    <Image style={{ alignSelf: 'center'}} source={camera} />
                    <Text
                        style={{
                            color: '#fff',
                            alignSelf: 'center',
                            fontSize: 20,
                            fontStyle: 'normal',
                            marginBottom: 20}}>
                        {this.state.dataUser.username}
                    </Text>

                    <Button
                        onPress={this.logoutUser.bind(this)}
                        style={{alignSelf: 'center'}}
                        danger>
                        Logout
                    </Button>

                    <Text
                        style={{
                            color: '#fff',
                             alignSelf: 'center',
                             fontSize: 20,
                             fontStyle: 'normal',
                             marginTop: 20,
                             marginBottom: 20
                        }}>
                        Items up for BARTER :
                    </Text>

                    <Card style={{ flex: 0, borderWidth: 0 }}>
                        {ItemNodes}
                    </Card>

                </Content>

                <Footer>
                    <FooterTab>
                        <Button
                            active={this.state.tab1} onPress={() => this.navigateTo('home')} >
                            Feed
                        </Button>
                        <Button active={this.state.tab2} onPress={() => this.navigateTo('addItem')} >
                            Add Item
                        </Button>
                        <Button active={this.state.tab3} onPress={() => this.navigateTo('profileDetail')} >
                            Profile
                        </Button>
                    </FooterTab>
                </Footer>

            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
        getItemsByUserId: (token) => dispatch(getItemsByUserId(token)),
    };
}

const mapStateToProps = state => ({
    navigation: state.cardNavigation,
    items: state.items
});

export default connect(mapStateToProps, bindAction)(ProfileDetail);
