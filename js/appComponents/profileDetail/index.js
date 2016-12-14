
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
    View,
    List,
    ListItem
} from 'native-base';
import { Grid, Col } from 'react-native-easy-grid';

import {getItemsByUserId} from '../../actions/items';
import {getUserById} from '../../actions/getUserById';
import myTheme from '../../themes/base-theme';
import styles from './styles';

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
            // this.props.navigator.pop()
            return false
        });
        this._loadInitialState().done();
    }

    _loadInitialState = async () => {
        try {
            var value = await AsyncStorage.getItem("myKey");
            console.log("value: ", value)
            if (value !== null){
                this.props.getItemsByUserId(value)
                this.props.getUserById(value)
                this._appendMessage('Recovered selection from disk: ' + value);
            } else {
                console.log("else")
                this._appendMessage('Initialized with no selection on disk.');
            }
        } catch (error) {
            console.log("catch: ", error)
            this._appendMessage('AsyncStorage error: ' + error.message);
        }
    }

    _appendMessage = (message) => {
        this.setState({messages: this.state.messages.concat(message)});
    };


    logoutUser = async() => {
        try {
            await AsyncStorage.removeItem("myKey");
            this.props.navigator.replace({id: 'loginPage'})
        } catch (error) {
            console.log("err")
        }
    }


    render() {
        const {navigator, items, user} = this.props
        console.log("ini props di profile: ", this.props)
        console.log("ini item props di profile: ", items)
        console.log("ini props user di profile: ", user)


        let ItemNodes = items.map(function (item) {
            return(
                <DataItems navigator={navigator} key={item.id} items={item} />
            )
        })

        return (
            <Container theme={myTheme} style={styles.container}>
                <Header>
                    <Title style={{alignSelf: 'center'}}>BRTR</Title>
                    <Button transparent onPress={() => this.props.navigator.push({id: 'searchItem'})}>
                        <Icon name="ios-search" />
                    </Button>
                    <Button transparent onPress={() => this.props.navigator.push({id: 'editProfile'})}>
                        Edit
                    </Button>
                </Header>

                <Content>
                    <Card style={{ flex: 0, backgroundColor: '#2c2c2c', borderWidth: 0 }}>
                        <CardItem
                            style={{borderBottomWidth: 0}}
                        >
                            <Image
                                style={{resizeMode: 'cover',  alignSelf: 'center', width: 200, height: 200 }}
                                source={(user.avatar) ? {uri: user.avatar} : require('../../../img/img-placeholder.png')}
                            />
                        </CardItem>
                    </Card>
                    <Text
                        style={{
                            color: '#fff',
                            alignSelf: 'center',
                            fontSize: 20,
                            fontStyle: 'normal',
                            marginBottom: 20}}>
                        {user.username}
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

                      <List>
                        {ItemNodes}
                      </List>
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
        getUserById: (token) => dispatch(getUserById(token)),
    };
}

const mapStateToProps = state => ({
    items: state.items,
    user: state.getUserById
});

export default connect(mapStateToProps, bindAction)(ProfileDetail);
