
import React, { Component } from 'react';
import { BackAndroid, Image, AsyncStorage } from 'react-native';
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

import {getItemsByUserId} from '../../actions/items';

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


class ProfileDetail extends Component {

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
        BackAndroid.addEventListener('hardwareBackPress', () => {
            this.props.navigator.pop()
            return true
        });
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


    logoutUser = async() => {
        try {
            await AsyncStorage.removeItem("myKey");
            this.props.navigator({id: 'loginPage'})
        } catch (error) {
            console.log("err")
        }
    }


    render() {
        const {navigator, items} = this.props
        console.log("ini props di profile: ", this.props)
        console.log("ini item props di profile: ", items)


        let ItemNodes = items.map(function (item) {
            return(
                <DataItems navigator={navigator} key={item.id} items={item} />
            )
        })

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent onPress={() => navigator.pop()}>
                        Back
                    </Button>
                    <Button transparent onPress={() => navigator.push({id: 'editProfile', UserId: this.state.dataUser.id})}>
                        Edit
                    </Button>
                </Header>

                <Content>
                  <Icon barterColor name="ios-add-circle-outline" onPress={()=> alert('upload an image')}
                         style={{ fontSize: 150, alignSelf: 'center', color:'#2effd0' }}
                         />
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
                        bordered style={{
                          alignSelf: 'center',
                          marginTop: 40,
                          marginBottom: 20 ,
                          width: 220,
                          borderRadius: 0,
                          borderColor:'#2effd0',
                          height: 50
                    }}
                        onPress={this.logoutUser.bind(this)}><Text style={{color: '#FFFFFF'}}>LOGOUT</Text></Button>

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
                            active={this.state.tab1} onPress={() => navigator.replace({id: 'home'})}>
                            Feed
                        </Button>
                        <Button active={this.state.tab2} onPress={() => navigator.replace({id: 'addItem'})} >
                            Add Item
                        </Button>
                        <Button active={this.state.tab3} onPress={() => navigator.replace({id: 'profileDetail'})} >
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
        getItemsByUserId: (token) => dispatch(getItemsByUserId(token)),
    };
}

const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps, bindAction)(ProfileDetail);
